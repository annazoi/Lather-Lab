import React from 'react';
import { LoginForm } from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-[#23211F] px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <LoginForm />
        <div className="mt-8 text-center text-[#8A8886] font-sans text-[13px]">
          <p>
            Don't have an account?{' '}
            <Link href="/register" className="text-[#86967E] hover:text-white underline underline-offset-4 transition-colors">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
