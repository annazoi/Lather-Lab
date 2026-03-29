'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/validators/auth.schema';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { setAuth, loading, setLoading, error, setError } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setError(null);
    setLoading(true);

    try {
      // Frontend validation with Yup
      await loginSchema.validate({ email, password }, { abortEarly: false });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuth(data.user, data.token);
      
      // Redirect based on role
      if (data.user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/collections');
      }
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-10 bg-[#1C1917] border border-[#363330] rounded-xl shadow-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif text-[#F9F8F6] mb-3">Welcome Back</h2>
        <p className="text-[12px] uppercase tracking-[0.2em] text-[#86967E] font-bold">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86967E] block">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-[#363330]'} py-2.5 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors`}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86967E] block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full bg-transparent border-b ${errors.password ? 'border-red-500' : 'border-[#363330]'} py-2.5 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest mt-1">{errors.password}</p>}
        </div>

        {error && (
          <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-md">
            <p className="text-red-500 text-[11px] font-sans text-center">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#86967E] text-white py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#1C1917] transition-all disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
