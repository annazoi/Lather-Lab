import React from 'react';
import Image from 'next/image';
import '@/components/style.css';

import { productService } from '@/services/product.service';
import { ProductSort } from '@/types/product';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { getProductImageUrl } from '@/utils/product-image.utils';

export const dynamic = 'force-dynamic';

interface CollectionsPageProps {
	searchParams: {
		sort?: string;
		category?: string;
	};
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
	const sort = searchParams?.sort as ProductSort;
	const category = searchParams?.category;

	let products: Product[] = [];
	try {
		products = await productService.fetchProducts({ sort, category });
	} catch (error) {
		console.error('Collections page error:', error);
		// In a real app, maybe show an error UI or empty state
	}

	return (
		<main className="min-h-screen pt-32 pb-24 bg-[#23211F] text-stone-50">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				{/* Page Header */}
				<div className="mb-16 text-center mt-10">
					<span className="text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold block mb-4">
						Our E-Shop
					</span>
					<h1 className="text-4xl lg:text-[44px] font-serif text-[#F9F8F6] tracking-wide mb-6">All Collections</h1>
					<p className="text-[#8A8886] font-sans max-w-xl mx-auto text-[13px] leading-relaxed">
						Discover our entire range of artisanal, cold-processed soaps. Every bar is crafted with raw botanical
						ingredients to naturally nourish your skin and elevate your daily ritual.
					</p>
				</div>

				{/* Filters / Sort Bar */}
				<div className="flex justify-between items-center mb-10 pb-4 border-b border-[#363330] text-[10px] uppercase font-bold tracking-[0.2em] text-[#86967E]">
					<span>{products.length} Products</span>
					<div className="flex space-x-6">
						<div className="group relative">
							<button className="hover:text-[#F9F8F6] transition-colors">Sort By ↓</button>
							<div className="absolute top-full right-0 mt-2 bg-[#1C1917] border border-[#363330] p-4 hidden group-hover:flex flex-col gap-3 min-w-[120px] z-50">
								<Link href="?sort=price_asc" className="hover:text-white transition-colors">
									Price: Low to High
								</Link>
								<Link href="?sort=price_desc" className="hover:text-white transition-colors">
									Price: High to Low
								</Link>
								<Link href="?sort=name_asc" className="hover:text-white transition-colors">
									Name: A-Z
								</Link>
							</div>
						</div>
						<div className="group relative">
							<button className="hover:text-[#F9F8F6] transition-colors">Filter</button>
							<div className="absolute top-full right-0 mt-2 bg-[#1C1917] border border-[#363330] p-4 hidden group-hover:flex flex-col gap-3 min-w-[160px] z-50">
								<Link href="/collections" className="hover:text-white transition-colors">
									All Categories
								</Link>
								<Link
									href="?category=Purifying%20%26%20Balancing"
									className="hover:text-white transition-colors"
								>
									Purifying
								</Link>
								<Link
									href="?category=Deep%20Cleanse%20%26%20Detox"
									className="hover:text-white transition-colors"
								>
									Detox
								</Link>
								<Link
									href="?category=Soothing%20%26%20Nourishing"
									className="hover:text-white transition-colors"
								>
									Nourishing
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
					{products.map((product) => {
						const isOutOfStock = product.quantity === 0;

						return (
							<Link
								key={product.id}
								href={`/products/${product.id}`}
								className={`group flex flex-col ${isOutOfStock ? 'cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer'}`}
							>
								{/* Image and Stock Status */}
								<div className="relative aspect-square overflow-hidden bg-[#2D2A28] mb-6 flex flex-col justify-end product-card rounded-xl border border-[#363330] hover:border-[#86967E]/50 transition-all">
									{product.isBestSeller && !isOutOfStock && (
										<div className="absolute top-6 left-6 bg-[#DCE8D5] text-[#1C1917] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10 shadow-lg">
											Best Seller
										</div>
									)}

									{isOutOfStock && (
										<div className="absolute inset-0 bg-black/40 z-30 flex items-center justify-center">
											<span className="text-white text-[12px] font-bold uppercase tracking-[0.3em] border border-white/30 px-6 py-3 bg-[#1C1917]/80 backdrop-blur-sm">
												Sold Out
											</span>
										</div>
									)}

									<div className="absolute inset-0 p-10 flex items-center justify-center pointer-events-none">
										<Image
											src={getProductImageUrl(product.image)}
											alt={product.name}
											width={500}
											height={500}
											priority={true}
											className={`w-full h-full object-cover mix-blend-overlay opacity-80 ${!isOutOfStock && 'group-hover:scale-105'} transition-all duration-700`}
										/>
									</div>

									{!isOutOfStock && (
										<div className="relative z-20 px-6 pb-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block">
											<div className="w-full bg-white text-[#1C1917] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#86967E] hover:text-white transition-colors text-center">
												View Collection
											</div>
										</div>
									)}
								</div>

								<div className="space-y-1 px-1">
									<div className="flex justify-between items-start mb-1.5">
										<h3
											className={`font-serif text-[20px] ${product.isBestSeller && !isOutOfStock ? 'text-[#86967E]' : 'text-[#F9F8F6]'} tracking-wide group-hover:text-[#86967E] transition-colors`}
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
										<p className="text-[12px] font-sans text-[#8A8886] uppercase tracking-widest">
											{product.category}
										</p>
										<div className="flex items-center space-x-3">
											{product.discount && !isOutOfStock && (
												<span className="text-[9px] bg-red-900/20 text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">
													-{product.discount}%
												</span>
											)}
											<span
												className={`text-[10px] font-bold uppercase tracking-widest ${isOutOfStock ? 'text-red-500' : 'text-[#86967E]'}`}
											>
												{isOutOfStock ? 'Sold Out' : `${product.quantity} in stock`}
											</span>
										</div>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</main>
	);
}
