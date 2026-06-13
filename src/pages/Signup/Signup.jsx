import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '@/api/auth';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.username || !form.password || !form.confirmPassword) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      await signup({
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-light tracking-[0.25em] text-gray-900">
            COSMETIC
          </Link>
          <p className="text-sm text-gray-400 mt-2">새 계정을 만들어보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs text-gray-500 mb-1.5">
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="홍길동"
              className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

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
            <label htmlFor="username" className="block text-xs text-gray-500 mb-1.5">
              아이디 <span className="text-gray-300">(4-20자)</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="사용할 아이디를 입력하세요"
              className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-gray-500 mb-1.5">
              비밀번호 <span className="text-gray-300">(영문·숫자·특수문자 포함, 8-20자)</span>
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

          <div>
            <label htmlFor="confirmPassword" className="block text-xs text-gray-500 mb-1.5">
              비밀번호 확인
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3.5 text-sm font-medium rounded hover:bg-gray-700 transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-gray-900 underline underline-offset-2">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
