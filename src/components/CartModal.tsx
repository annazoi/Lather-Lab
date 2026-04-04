'use client';
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';
import { getProductImageUrl } from '@/utils/product-image.utils';
import Image from 'next/image';
import Link from 'next/link';

export const CartModal = () => {
	const { items, isOpen, onClose, removeItem, updateQuantity, getTotalPrice } = useCartStore();
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	const totalPrice = useMemo(() => getTotalPrice(), [items, getTotalPrice]);

	if (!isOpen || !isMounted) return null;

	return (
		<AnimatePresence>
			<div className="fixed inset-0 z-[100] flex items-center justify-end">
				{/* Backdrop */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				/>

				{/* Modal/Drawer */}
				<motion.div
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					transition={{ type: 'spring', damping: 25, stiffness: 200 }}
					className="relative w-full max-w-md h-full bg-[#1C1917] border-l border-[#363330] shadow-2xl flex flex-col"
				>
					{/* Header */}
					<div className="px-8 py-6 border-b border-[#363330] flex justify-between items-center bg-[#1C1917]/80 backdrop-blur-md sticky top-0 z-10">
						<div className="flex items-center space-x-3">
							<ShoppingBag className="text-[#86967E]" size={20} />
							<h2 className="text-[14px] uppercase font-bold tracking-[0.3em] text-[#F9F8F6]">
								Your Collection
							</h2>
							<span className="bg-[#363330] text-[#86967E] text-[10px] px-2 py-0.5 rounded-full font-bold">
								{items.length}
							</span>
						</div>
						<button
							onClick={onClose}
							className="p-2 text-stone-500 hover:text-white transition-colors hover:rotate-90 duration-300"
						>
							<X size={20} />
						</button>
					</div>

					{/* Cart Items */}
					<div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scrollbar-hide">
						{items.length === 0 ? (
							<div className="h-full flex flex-col items-center justify-center text-center space-y-6">
								<div className="w-20 h-20 rounded-full bg-[#363330]/30 flex items-center justify-center border border-[#363330]">
									<ShoppingBag className="text-stone-600" size={32} />
								</div>
								<div className="space-y-2">
									<p className="text-[#F9F8F6] font-serif italic text-lg">Your basket is resting</p>
									<p className="text-stone-500 text-[11px] uppercase tracking-widest leading-relaxed">
										Begin your ritual by adding <br /> our artisanal products.
									</p>
								</div>
								<Link
									href="/collections"
									onClick={onClose}
									className="px-8 py-3 bg-[#363330] text-white text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-[#86967E] transition-all duration-500"
								>
									Explore Collections
								</Link>
							</div>
						) : (
							items.map((item) => (
								<motion.div
									layout
									key={item.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, x: -20 }}
									className="group relative flex space-x-6"
								>
									{/* Product Image */}
									<div className="relative w-24 h-32 rounded-xl overflow-hidden bg-[#23211F] border border-[#363330] flex-shrink-0 group-hover:border-[#86967E]/50 transition-colors">
										<Image
											src={getProductImageUrl(item.image)}
											alt={item.name}
											fill
											className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
										/>
									</div>

									{/* Details */}
									<div className="flex-1 flex flex-col justify-between py-1">
										<div className="space-y-1">
											<div className="flex justify-between items-start">
												<h3 className="text-[#F9F8F6] font-serif text-[15px] italic group-hover:text-[#86967E] transition-colors">
													{item.name}
												</h3>
												<button
													onClick={() => removeItem(item.id)}
													className="text-stone-600 hover:text-red-400 p-1 transition-colors"
												>
													<Trash2 size={14} />
												</button>
											</div>
											<p className="text-[10px] uppercase tracking-widest text-stone-500">{item.category}</p>
										</div>

										<div className="flex justify-between items-end">
											<div className="flex items-center space-x-4 bg-[#23211F] border border-[#363330] rounded-lg px-2 py-1">
												<button
													onClick={() => updateQuantity(item.id, item.quantity - 1)}
													className="text-stone-500 hover:text-white transition-colors"
												>
													<Minus size={12} />
												</button>
												<span className="text-[12px] font-bold text-[#F9F8F6] w-4 text-center">
													{item.quantity}
												</span>
												<button
													onClick={() => updateQuantity(item.id, item.quantity + 1)}
													className="text-stone-500 hover:text-white transition-colors"
												>
													<Plus size={12} />
												</button>
											</div>
											<p className="text-[13px] font-bold text-[#F9F8F6]">
												${(Number(item.price) * item.quantity).toFixed(2)}
											</p>
										</div>
									</div>
								</motion.div>
							))
						)}
					</div>

					{/* Footer */}
					{items.length > 0 && (
						<div className="p-8 border-t border-[#363330] bg-[#1C1917] space-y-6">
							<div className="flex justify-between items-center">
								<span className="text-stone-500 text-[11px] uppercase font-bold tracking-[0.2em]">
									Subtotal
								</span>
								<span className="text-[#F9F8F6] text-xl font-bold font-serif italic">
									${totalPrice.toFixed(2)}
								</span>
							</div>
							<p className="text-[9px] uppercase tracking-widest text-stone-600 italic">
								Taxes and shipping calculated at checkout.
							</p>
							<Link
								href="/checkout"
								onClick={onClose}
								className="w-full group bg-[#86967E] hover:bg-[#F9F8F6] text-[#F9F8F6] hover:text-[#1C1917] flex items-center justify-center space-x-3 py-5 rounded-sm transition-all duration-500 uppercase text-[11px] font-bold tracking-[0.3em] overflow-hidden relative"
							>
								<span className="relative z-10">Checkout</span>
								<ArrowRight
									size={16}
									className="relative z-10 group-hover:translate-x-2 transition-transform duration-500"
								/>
							</Link>
						</div>
					)}
				</motion.div>
			</div>
		</AnimatePresence>
	);
};
