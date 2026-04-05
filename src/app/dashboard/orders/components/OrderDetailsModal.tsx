'use client';

import React, { useState } from 'react';
import { X, Package, MapPin, Phone, User, Calendar, CreditCard, ChevronRight, TrendingUp, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface OrderDetailsProps {
	order: any;
}

export default function OrderDetailsButton({ order }: OrderDetailsProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="text-stone-500 hover:text-[#86967E] transition-all inline-flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.25em] relative group"
			>
				<span>Details</span>
				<ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 overflow-hidden">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
							className="absolute inset-0 bg-[#1C1917]/95 backdrop-blur-md"
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							className="relative w-full max-w-[1000px] h-full max-h-[85vh] bg-[#23211F] rounded-3xl border border-[#363330] shadow-3xl overflow-hidden flex flex-col"
						>
							{/* Header */}
							<header className="px-10 pt-10 pb-6 flex justify-between items-start border-b border-[#363330]/50 sticky top-0 bg-[#23211F] z-10">
								<div className="space-y-4">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-[#86967E]/10 rounded-xl">
											<Package className="text-[#86967E]" size={20} />
										</div>
										<div>
											<h2 className="text-2xl font-serif text-[#F9F8F6] text-left">
												Ritual Record #{order.id.slice(-6)}
											</h2>
											<p className="text-[10px] uppercase tracking-[0.4em] font-[900] text-[#86967E]">
												Order Authentication Details
											</p>
										</div>
									</div>
								</div>
								<button
									onClick={() => setIsOpen(false)}
									className="p-3 bg-[#1C1917] border border-[#363330] rounded-xl hover:text-rose-500 transition-all"
								>
									<X size={20} />
								</button>
							</header>

							<div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-16">
								{/* Information Grid */}
								<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
									<div className="space-y-4">
										<div className="flex items-center gap-2 text-[#86967E]">
											<User size={14} />
											<span className="text-[9px] uppercase font-[900] tracking-widest">Customer</span>
										</div>
										<p className="text-[13px] font-bold text-[#F9F8F6] text-left">{order.shippingName}</p>
									</div>

									<div className="space-y-4">
										<div className="flex items-center gap-2 text-[#86967E]">
											<Calendar size={14} />
											<span className="text-[9px] uppercase font-[900] tracking-widest">Date Published</span>
										</div>
										<p className="text-[13px] font-bold text-[#F9F8F6] text-left">
											{new Date(order.createdAt).toLocaleString()}
										</p>
									</div>

									<div className="space-y-4">
										<div className="flex items-center gap-2 text-[#86967E]">
											<MapPin size={14} />
											<span className="text-[9px] uppercase font-[900] tracking-widest">Destination</span>
										</div>
										<p className="text-[13px] font-bold text-[#F9F8F6] text-left leading-relaxed">
											{order.shippingAddress}, <br /> {order.shippingCity}
										</p>
									</div>

									<div className="space-y-4">
										<div className="flex items-center gap-2 text-[#86967E]">
											<Phone size={14} />
											<span className="text-[9px] uppercase font-[900] tracking-widest">
												Contact Identity
											</span>
										</div>
										<p className="text-[13px] font-bold text-[#F9F8F6] text-left">{order.shippingPhone}</p>
									</div>
								</div>

								{/* Items Table */}
								<div className="space-y-5 mt-4">
									<div className="flex items-center justify-between border-b border-[#363330] pb-6">
										<div className="flex items-center gap-3">
											<TrendingUp size={16} className="text-[#86967E]" />
											<h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#F9F8F6]">
												Curated Items
											</h3>
										</div>
										<span className="text-[9px] uppercase font-[900] tracking-widest text-stone-500">
											{order.items?.length} Rituals
										</span>
									</div>

									<div className="space-y-12">
										{order.items?.map((item: any) => (
											<div key={item.id} className="flex flex-col md:flex-row gap-10 items-start group">
												<div className="relative w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-[#1C1917] border border-[#363330] group-hover:border-[#86967E] transition-all">
													{item.product?.image && (
														<Image
															src={item.product.image}
															alt={item.product.name}
															fill
															className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
														/>
													)}
												</div>

												<div className="flex-1 space-y-6 pt-2">
													<div className="flex justify-between items-start">
														<div className="space-y-2">
															{item.product?.category && (
																<span className="text-[8px] uppercase tracking-[0.3em] text-[#86967E] block text-left">
																	{item.product.category}
																</span>
															)}
															<h4 className="text-xl font-serif text-[#F9F8F6] tracking-tight text-left">
																{item.product?.name || 'Unnamed product'}
															</h4>
														</div>
														<div className="text-left">
															<p className="text-[13px] font-[900] tracking-widest text-[#F9F8F6] font-sans">
																${item.price.toFixed(2)}
															</p>
															<p className="text-[9px] uppercase tracking-widest text-stone-600 font-[800] mt-1">
																Single Unit
															</p>
														</div>
													</div>

													<div className="flex flex-wrap gap-10">
														<div className="space-y-2">
															<span className="text-[8px] uppercase tracking-widest text-stone-600 font-bold block">
																Assigned Qty
															</span>
															<p className="text-[13px] font-sans font-bold text-[#F9F8F6] text-left">
																{item.quantity} Units
															</p>
														</div>
														<div className="space-y-2">
															<span className="text-[8px] uppercase tracking-widest text-stone-600 font-bold block">
																Item Total
															</span>
															<p className="text-[13px] font-sans font-extrabold text-[#86967E] tracking-wider text-left">
																${(item.price * item.quantity).toFixed(2)}
															</p>
														</div>
														<div className="space-y-2">
															<span className="text-[8px] uppercase tracking-widest text-stone-600 font-bold block text-left">
																Available Stock
															</span>
															<p
																className={`text-[13px] font-sans font-bold ${item.product?.quantity === 0 ? 'text-rose-500' : 'text-stone-400'}`}
															>
																{item.product?.quantity || 0} left in repository
															</p>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Summary Section */}
								<div className="bg-[#1C1917]/50 p-6 rounded-3xl border border-[#363330] space-y-2 mt-2">
									<div className="flex items-center gap-3">
										<CreditCard size={16} className="text-[#86967E]" />
										<h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-[#F9F8F6]">
											Financial Summary
										</h3>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
										<div className="space-y-2 text-left">
											<span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold block">
												Total Ritual Value
											</span>
											<p className="text-3xl font-serif text-[#F9F8F6]">${order.total.toFixed(2)}</p>
										</div>

										<div className="space-y-2 text-left">
											<span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold block">
												Payment Verification
											</span>
											<div className="flex items-center gap-3 mt-2">
												<div className="w-2 h-2 rounded-full bg-emerald-500" />
												<span className="text-[11px] uppercase tracking-[0.1em] text-emerald-500 font-black">
													Authorized
												</span>
											</div>
										</div>

										<div className="space-y-2 text-left">
											<span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold block">
												Taxation (Inclusive)
											</span>
											<p className="text-[13px] font-sans text-stone-500">$0.00</p>
										</div>

										<div className="space-y-2 text-left">
											<span className="text-[9px] uppercase tracking-widest text-stone-600 font-bold block">
												Order Signature
											</span>
											<p className="text-[11px] font-sans text-stone-700 select-all tracking-tighter truncate">
												{order.id}
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Status Banner Footer */}
							<footer className="px-10 py-6 border-t border-[#363330]/50 flex justify-between items-center bg-[#1C1917]">
								<div className="flex items-center gap-2">
									<Tag size={12} className="text-[#86967E]" />
									<span className="text-[8px] uppercase tracking-[0.3em] font-black text-[#86967E]">
										Catalogue Protocol
									</span>
								</div>
								<div className="p-1 px-4 bg-[#86967E]/10 border border-[#86967E]/20 rounded-full">
									<span className="text-[9px] uppercase font-black text-[#86967E] tracking-widest flex">
										{order.status}
									</span>
								</div>
							</footer>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
