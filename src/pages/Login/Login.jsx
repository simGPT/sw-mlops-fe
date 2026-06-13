import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-light tracking-[0.25em] text-gray-900">
            COSMETIC
          </Link>
          <p className="text-sm text-gray-400 mt-2">로그인하여 쇼핑을 계속하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-gray-500 mb-1.5">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-gray-500 mb-1.5">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3.5 text-sm font-medium rounded hover:bg-gray-700 transition-colors mt-2"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          아직 계정이 없으신가요?{' '}
          <Link to="/signup" className="text-gray-900 underline underline-offset-2">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
