import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getCart } from '@/api/cart';
import useAuthStore from '@/store/authStore';

const DELIVERY_FEE = 3000;
const FREE_DELIVERY_THRESHOLD = 50000;

export default function Cart() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    getCart()
      .then((res) => setItems(res.data.data.items))
      .catch(() => setError('장바구니를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));
  }, [isLoggedIn, navigate]);

  const updateQuantity = (itemId, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

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

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <svg
          className="w-16 h-16 text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <p className="text-gray-400 text-sm">장바구니가 비어있습니다</p>
        <Link
          to="/"
          className="mt-2 text-sm text-gray-900 border border-gray-900 px-6 py-2.5 rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-xl font-light text-gray-900 mb-10">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.itemId} className="flex gap-6 pt-2 pb-6 border-b border-gray-100">
              <Link to={`/products/${item.productId}`} className="shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-200"
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
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${item.productId}`}
                  className="text-sm text-gray-900 hover:underline line-clamp-1"
                >
                  {item.productName}
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{item.price.toLocaleString()}원</p>

                <div className="flex items-center mt-3">
                  <div className="flex items-center border border-gray-200 rounded">
                    <button
                      onClick={() => updateQuantity(item.itemId, -1)}
                      className="px-2.5 py-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="px-3 py-1.5 text-sm text-gray-900 min-w-10 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.itemId, 1)}
                      className="px-2.5 py-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-end justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
                <button
                  onClick={() => removeItem(item.itemId)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-sm font-medium text-gray-900 mb-5">주문 요약</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>상품 금액</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-gray-500 pb-40">
                <span>배송비</span>
                <span>{deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}</span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-gray-400">
                  {(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()}원 더 담으면 무료 배송
                </p>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-gray-900">
                <span>합계</span>
                <span>{total.toLocaleString()}원</span>
              </div>
            </div>
            <button className="w-full mt-5 bg-gray-900 text-white py-3.5 text-sm font-medium rounded hover:bg-gray-700 transition-colors">
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
