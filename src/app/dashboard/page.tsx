'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated or not an admin, redirect
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'ADMIN') {
      router.push('/collections');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[#23211F] flex items-center justify-center">
        <div className="text-[#86967E] text-[10px] uppercase font-bold tracking-widest animate-pulse">
          Validating access...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-40 pb-24 bg-[#23211F] text-[#F9F8F6]">
      <div className="max-w-[1200px] mx-auto px-12">
        <header className="flex justify-between items-center mb-20 border-b border-[#363330] pb-10">
          <div>
            <h1 className="text-4xl font-serif mb-2">Admin Dashboard</h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#86967E] font-bold">
              Welcome back, {user?.email}
            </p>
          </div>
          <button 
            onClick={() => { logout(); router.push('/login'); }}
            className="px-8 py-3 bg-red-900/20 border border-red-900/30 text-red-500 text-[10px] uppercase font-bold tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-[#1C1917] border border-[#363330] rounded-lg">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#86967E] mb-4 block">Products</span>
            <div className="text-3xl font-serif">12</div>
          </div>
          <div className="p-8 bg-[#1C1917] border border-[#363330] rounded-lg">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#86967E] mb-4 block">Customers</span>
            <div className="text-3xl font-serif">154</div>
          </div>
          <div className="p-8 bg-[#1C1917] border border-[#363330] rounded-lg">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#86967E] mb-4 block">Total Orders</span>
            <div className="text-3xl font-serif">$2,450.00</div>
          </div>
        </div>
      </div>
    </main>
  );
}
