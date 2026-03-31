'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './style.css';
import Link from 'next/link';
import { Product } from '@prisma/client';

interface CollectionsProps {
	products: Product[];
}

export const Collections = ({ products }: CollectionsProps) => {
	return (
		<section className="py-24 bg-[#23211F] text-stone-50">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				<div className="mb-16">
					{/* Header row */}
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
						<div className="space-y-4">
							<span className="text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold block">
								The Collections
							</span>
							<h2 className="text-4xl lg:text-[44px] font-serif text-[#F9F8F6] tracking-wide">
								Curated Essentials
							</h2>
						</div>
						<Link
							href="/collections"
							className="pb-1 text-[10px] uppercase font-bold tracking-[0.2em] text-[#86967E] hover:text-[#F9F8F6] transition-colors"
						>
							View All Products
						</Link>
					</div>
					{/* Divider */}
					<div className="w-full h-[1px] bg-[#363330]" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
					{products.map((product, idx) => {
						const isOutOfStock = product.quantity === 0;

						return (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: idx * 0.1 }}
								className={`group flex flex-col ${isOutOfStock ? 'cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer'}`}
							>
								<div className="relative aspect-square overflow-hidden bg-[#2D2A28] mb-6 flex flex-col justify-end product-card">
									{product.isBestSeller && !isOutOfStock && (
										<div className="absolute top-6 left-6 bg-[#DCE8D5] text-[#1C1917] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
											Best Seller
										</div>
									)}

									{isOutOfStock && (
										<div className="absolute inset-0 bg-black/40 z-30 flex items-center justify-center">
											<span className="text-white text-[12px] font-bold uppercase tracking-[0.3em] border border-white/30 px-6 py-3 bg-[#1C1917]/80 backdrop-blur-sm">
												Out of Stock
											</span>
										</div>
									)}

									<div className="absolute inset-0 p-10 flex items-center justify-center">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className={`w-full h-full object-cover mix-blend-overlay opacity-80 ${!isOutOfStock && 'group-hover:scale-105'} transition-all duration-700`}
										/>
									</div>

									{!isOutOfStock && (
										<div className="relative z-20 px-6 pb-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
											<button className="w-full bg-white text-[#1C1917] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#86967E] hover:text-white transition-colors">
												Add To Cart
											</button>
										</div>
									)}
								</div>

								<div className="space-y-1 px-1">
									<div className="flex justify-between items-start mb-1.5">
										<h3
											className={`font-serif text-[20px] ${product.isBestSeller && !isOutOfStock ? 'text-[#86967E]' : 'text-[#F9F8F6]'} tracking-wide`}
										>
											{product.name}
										</h3>
										<div className="flex flex-col items-end">
											{product.discount ? (
												<>
													<span className="font-sans text-[15px] text-[#86967E] font-[800] tracking-wider">
														${(product.price * (1 - product.discount / 100)).toFixed(2)}
													</span>
													<span className="font-sans text-[11px] text-[#8A8886] line-through opacity-60">
														${product.price.toFixed(2)}
													</span>
												</>
											) : (
												<span className="font-sans text-[15px] text-[#F9F8F6] font-[800] tracking-wider">
													${product.price.toFixed(2)}
												</span>
											)}
										</div>
									</div>
									<div className="flex justify-between items-center">
										<p className="text-[12px] font-sans text-[#8A8886]">{product.category}</p>
										<div className="flex items-center space-x-3">
											{product.discount && !isOutOfStock && (
												<span className="text-[9px] bg-red-900/20 text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">
													-{product.discount}%
												</span>
											)}
											<span className={`text-[10px] font-bold uppercase tracking-widest ${isOutOfStock ? 'text-red-500' : 'text-[#86967E]'}`}>
												{product.quantity} in stock
											</span>
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
