import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getOrders } from '@/api/orders';
import useAuthStore from '@/store/authStore';

export default function Orders() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    getOrders()
      .then((res) => setOrders(res.data.data))
      .catch(() => setError('주문 내역을 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, navigate]);

  const openModal = (orderId, itemId, productName) => setModal({ orderId, itemId, productName });
  const closeModal = () => setModal(null);

  const confirmReturn = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === modal.orderId
          ? {
              ...order,
              items: order.items.map((item) =>
                item.itemId === modal.itemId ? { ...item, returned: true } : item
              ),
            }
          : order
      )
    );
    closeModal();
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">주문 내역이 없습니다</p>
        <Link
          to="/"
          className="text-sm text-gray-900 border border-gray-900 px-6 py-2.5 rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-xl font-light text-gray-900 mb-8">주문 내역</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-5 py-3">
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="px-5 py-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.itemId} className="flex items-center gap-3">
                  <div className="shrink-0 w-14 h-14 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{item.productName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.price.toLocaleString()}원 · {item.quantity}개
                    </p>
                  </div>

                  {item.returned ? (
                    <span className="shrink-0 text-xs text-gray-300">반품완료</span>
                  ) : (
                    <button
                      onClick={() => openModal(order.orderId, item.itemId, item.productName)}
                      className="shrink-0 text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      반품 신청
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-end gap-3 text-sm">
              {order.discountAmount > 0 && (
                <span className="text-xs text-gray-400">
                  할인 -{order.discountAmount.toLocaleString()}원
                </span>
              )}
              <span className="text-gray-500">합계</span>
              <span className="font-medium text-gray-900">
                {order.totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4 p-6">
            <h2 className="text-base font-medium text-gray-900 mb-2">반품 신청</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              <span className="text-gray-900">{modal.productName}</span>을(를)
              <br />
              반품 신청하시겠습니까?
            </p>
            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmReturn}
                className="flex-1 py-2.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
              >
                신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
