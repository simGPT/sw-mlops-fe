import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createViewLog, getProductById } from '@/api/products';
import useAuthStore from '@/store/authStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data.data))
      .catch(() => setError('상품 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false));

    if (isLoggedIn) {
      createViewLog(id).catch(() => {});
    }
  }, [id, isLoggedIn]);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(product.stock, q + 1));

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

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <svg
              className="w-20 h-20 text-gray-200"
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
          )}
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-light text-gray-900 pt-3">{product.name}</h1>

          <div className="border-t border-b border-gray-100 py-9">
            <p className="text-2xl font-medium text-gray-900">{product.price.toLocaleString()}원</p>
            <p className="text-xs text-gray-400 mt-1.5">
              {product.stock <= 10
                ? `재고 ${product.stock}개`
                : '배송비 3,000원 · 50,000원 이상 무료'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 w-16">수량</span>
            <div className="flex items-center border border-gray-200 rounded">
              <button
                onClick={decrease}
                className="px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span className="px-4 py-2 text-sm text-gray-900 min-w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={increase}
                className="px-3 py-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">총 금액</span>
              <span className="text-lg font-semibold text-gray-900">
                {(product.price * quantity).toLocaleString()}원
              </span>
            </div>
          </div>

          <button
            onClick={() => setModal(true)}
            className="w-full bg-gray-900 text-white py-3.5 text-sm font-medium rounded hover:bg-gray-700 transition-colors"
          >
            장바구니 담기
          </button>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4 p-6">
            {isLoggedIn ? (
              <>
                <h2 className="text-base font-medium text-gray-900 mb-2">장바구니 담기</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-1">
                  <span className="text-gray-900">{product.name}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {quantity}개 · {(product.price * quantity).toLocaleString()}원을 장바구니에
                  담으시겠습니까?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(false)}
                    className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setModal(false)}
                    className="flex-1 py-2.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    담기
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-base font-medium text-gray-900 mb-2">로그인이 필요합니다</h2>
                <p className="text-sm text-gray-500 mb-6">
                  장바구니 이용을 위해 로그인 후 이용 바랍니다.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal(false)}
                    className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex-1 py-2.5 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    로그인
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
