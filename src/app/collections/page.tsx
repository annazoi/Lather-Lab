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
					{products.map((product) => (
						<div key={product.id} className="group cursor-pointer flex flex-col">
							<div className="relative aspect-square overflow-hidden bg-[#2D2A28] mb-6 flex flex-col justify-end product-card">
								{product.isBestSeller && (
									<div className="absolute top-6 left-6 bg-[#DCE8D5] text-[#1C1917] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
										Best Seller
									</div>
								)}
								<div className="absolute inset-0 p-10 flex items-center justify-center">
									<Image
										src={getProductImageUrl(product.image)}
										alt={product.name}
										width={500}
										height={500}
										priority={true}
										className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-all duration-700"
									/>
								</div>

								<div className="relative z-20 px-6 pb-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
									<button className="w-full bg-white text-[#1C1917] py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#86967E] hover:text-white transition-colors">
										Add To Cart
									</button>
								</div>
							</div>

							<div className="space-y-1 px-1">
								<div className="flex justify-between items-start mb-1.5">
									<h3
										className={`font-serif text-[20px] ${product.isBestSeller ? 'text-[#86967E]' : 'text-[#F9F8F6]'} tracking-wide`}
									>
										{product.name}
									</h3>
									<span className="font-sans text-[15px] text-[#F9F8F6] font-[800] tracking-wider">
										${product.price.toFixed(2)}
									</span>
								</div>
								<p className="text-[12px] font-sans text-[#8A8886]">{product.category}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
