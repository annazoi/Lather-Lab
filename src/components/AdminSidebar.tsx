'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, ListOrdered, Tag, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	return (
		<>
			{/* Mobile Header Row */}
			<div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1C1917] border-b border-[#363330] z-[110] flex items-center px-6 justify-between">
				<a href="/">
					<h2 className="text-[#F9F8F6] font-serif text-lg tracking-wide uppercase">Lather lab</h2>
				</a>
				<button onClick={() => setIsOpen(!isOpen)} className="text-[#86967E] p-2">
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Sidebar Container */}
			<aside
				className={`fixed lg:sticky top-0 lg:left-0 right-0 w-64 h-screen bg-[#1C1917] border-r border-[#363330] flex flex-col z-[100] transition-transform duration-300 ease-in-out
				${isOpen ? 'translate-x-0 ' : 'translate-x-full  lg:translate-x-0 -translate-x-full'}`}
			>
				<div className="p-10 hidden lg:block">
					<a href="/">
						<h2 className="text-[#F9F8F6] font-serif text-2xl tracking-wide">Lather lab</h2>
					</a>
					<span className="text-[10px] text-[#86967E] uppercase font-bold tracking-[0.2em] block mt-1">
						Admin Panel
					</span>
				</div>

				<nav className="flex-1 px-6 space-y-2 mt-20 lg:mt-4">
					{menuItems.map((item) => {
						const isActive = pathname === item.href;
						const Icon = item.icon;

						return (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setIsOpen(false)}
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

			{/* Backdrop for mobile */}
			{isOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-[90]" onClick={() => setIsOpen(false)} />}
		</>
	);
}
