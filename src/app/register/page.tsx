import React from 'react';
import { RegisterForm } from '@/components/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-[#23211F] px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <RegisterForm />
        <div className="mt-8 text-center text-[#8A8886] font-sans text-[13px]">
          <p>
            Already a member?{' '}
            <Link href="/login" className="text-[#86967E] hover:text-white underline underline-offset-4 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
