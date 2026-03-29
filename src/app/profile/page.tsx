'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { ShoppingBag, User, Package, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
	const { user, isAuthenticated, logout } = useAuthStore();
	const [orders, setOrders] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/login');
			return;
		}

		async function fetchOrders() {
			try {
				const res = await fetch('/api/profile/orders');
				if (res.ok) {
					const data = await res.json();
					setOrders(data);
				}
			} catch (err) {
				console.error('Failed to fetch orders');
			} finally {
				setLoading(false);
			}
		}

		fetchOrders();
	}, [isAuthenticated, router]);

	const handleLogout = () => {
		logout();
		router.push('/login');
	};

	if (!isAuthenticated) return null;

	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#23211F] text-[#F9F8F6]">
			<div className="max-w-[1200px] mx-auto px-10">
				{/* Header Region */}
				<header className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#363330] pb-12 mb-16 gap-8 animate-in fade-in duration-1000">
					<div>
						<h1 className="text-5xl font-serif mb-4 tracking-tight">Your Profile</h1>
						<p className="text-[11px] uppercase tracking-[0.3em] text-[#86967E] font-bold">
							Customer Portal • Studio Member
						</p>
					</div>
					<button
						onClick={handleLogout}
						className="flex items-center space-x-3 text-stone-500 hover:text-white transition-all text-[11px] uppercase font-bold tracking-[0.2em] border border-[#363330] px-6 py-3"
					>
						<LogOut size={16} />
						<span>Logout</span>
					</button>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					{/* Personal Info Column */}
					<div className="lg:col-span-1 space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
						<div className="bg-[#1C1917] border border-[#363330] p-10 rounded-xl group hover:border-[#86967E] transition-all">
							<div className="bg-[#86967E] w-14 h-14 rounded-full flex items-center justify-center mb-8 shadow-2xl">
								<User size={24} className="text-[#1C1917]" />
							</div>
							<h3 className="text-xl font-serif mb-6 text-[#F9F8F6]">Identity Details</h3>
							<div className="space-y-6">
								<div className="space-y-1">
									<span className="text-[9px] uppercase font-bold tracking-widest text-stone-500 block">
										Electronic Mail
									</span>
									<span className="text-[13px] font-sans text-stone-200">{user?.email}</span>
								</div>
								<div className="space-y-1">
									<span className="text-[9px] uppercase font-bold tracking-widest text-stone-500 block">
										Member Role
									</span>
									<span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#86967E]">
										{user?.role}
									</span>
								</div>
							</div>
						</div>

						<div className="p-8 bg-white/[0.02] border border-[#363330]/50 rounded-xl">
							<p className="text-[13px] font-serif italic text-stone-400 text-center leading-relaxed">
								"Crafting high-end artisanal products is a commitment to timeless quality and sensory
								excellence."
							</p>
						</div>
					</div>

					{/* Activity/Orders Column */}
					<div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
						<div className="bg-[#1C1917] border border-[#363330] p-10 rounded-xl overflow-hidden min-h-[400px]">
							<header className="flex items-center justify-between mb-10 border-b border-[#363330] pb-6">
								<div className="flex items-center space-x-3">
									<Package size={18} className="text-[#86967E]" />
									<h3 className="text-xl font-serif text-[#F9F8F6]">Catalogue Acquisitions</h3>
								</div>
								<span className="text-[10px] uppercase font-bold tracking-widest text-[#8A8886]">
									{orders.length} History Items
								</span>
							</header>

							{loading ? (
								<div className="flex items-center justify-center h-40">
									<span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 animate-pulse">
										Retrieving history...
									</span>
								</div>
							) : orders.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-60 text-center">
									<ShoppingBag size={40} className="text-stone-700 mb-6 opacity-30" />
									<p className="text-stone-400 font-serif mb-6">You haven't made any acquisitions yet.</p>
									<Link
										href="/collections"
										className="bg-[#86967E] text-white px-10 py-3.5 text-[11px] uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all"
									>
										Explore Collections
									</Link>
								</div>
							) : (
								<div className="space-y-4">
									{orders.map((order) => (
										<div
											key={order.id}
											className="group flex items-center justify-between p-6 bg-white/[0.02] border border-[#363330] rounded-lg hover:border-[#86967E] transition-all"
										>
											<div className="flex items-center space-x-6">
												<div className="w-10 h-10 rounded-full border border-[#363330] flex items-center justify-center group-hover:bg-[#86967E] group-hover:border-[#86967E] transition-all">
													<Package
														size={16}
														className="text-stone-500 group-hover:text-white transition-colors"
													/>
												</div>
												<div>
													<p className="text-[12px] font-sans font-bold text-[#F9F8F6] uppercase tracking-widest">
														Order ID: #{order.id.slice(-6)}
													</p>
													<span className="text-[10px] text-stone-500 block uppercase tracking-widest mt-1">
														{new Date(order.createdAt).toLocaleDateString()} • {order.status}
													</span>
												</div>
											</div>
											<div className="flex items-center space-x-8">
												<span className="text-[14px] font-serif text-[#F9F8F6]">
													${order.total.toFixed(2)}
												</span>
												<ChevronRight
													size={16}
													className="text-stone-600 group-hover:translate-x-1 transition-all"
												/>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
