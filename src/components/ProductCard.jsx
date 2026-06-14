import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          {product.imageUrl && !imgError ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-200"
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
          )}
        </div>
        <div className="p-3">
          <p className="text-sm text-gray-900 truncate mb-2">{product.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              {product.price.toLocaleString()}원
            </p>
            {product.stock <= 10 && (
              <span className="text-[10px] text-rose-400">재고 {product.stock}개</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
