'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, ListOrdered, Tag, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Products', icon: ShoppingBag, href: '/dashboard/products' },
  { label: 'Orders', icon: ListOrdered, href: '/dashboard/orders' },
  { label: 'Discounts', icon: Tag, href: '/dashboard/discounts' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 h-screen bg-[#1C1917] border-r border-[#363330] flex flex-col fixed left-0 top-0 z-[100]">
      <div className="p-10">
        <h2 className="text-[#F9F8F6] font-serif text-2xl tracking-wide">Lather lab</h2>
        <span className="text-[10px] text-[#86967E] uppercase font-bold tracking-[0.2em] block mt-1">Admin Panel</span>
      </div>

      <nav className="flex-1 px-6 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-6 py-4 rounded-md text-[11px] uppercase font-bold tracking-[0.2em] transition-all
                ${isActive ? 'bg-[#23211F] text-[#F9F8F6] border-l-2 border-[#86967E]' : 'text-stone-500 hover:text-white hover:bg-[#23211F]'}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-[#363330]">
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 text-stone-500 hover:text-red-400 transition-colors px-6 py-4 w-full text-[11px] uppercase font-bold tracking-[0.2em]"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
