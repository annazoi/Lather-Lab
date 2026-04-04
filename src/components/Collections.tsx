'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@prisma/client';
import { CollectionFilters } from '@/app/collections/components/collection-filters';
import { ProductSortType } from '@/config/product-sort.config';
import { ProductCard } from './ProductCard';

interface CollectionsProps {
	products: Product[];
	currentSort?: ProductSortType;
	currentCategory?: string;
	searchParams?: Record<string, string | string[] | undefined>;
}

export const Collections = ({ products, currentSort, currentCategory, searchParams }: CollectionsProps) => {
	const categories = ['Purifying & Balancing', 'Deep Cleanse & Detox', 'Soothing & Nourishing', 'Sensitive Skin Care'];

	return (
		<section className="py-24 bg-[#23211F] text-stone-50 selection:bg-[#86967E]/30" id="collections">
			<div className="max-w-[1400px] mx-auto px-6 lg:px-12">
				<div className="mb-16">
					{/* Header row */}
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
						<div className="space-y-4">
							<span className="text-[10px] uppercase tracking-[0.4em] text-[#86967E] font-bold block">
								The Collections
							</span>
							<h2 className="text-5xl lg:text-[54px] font-serif text-[#F9F8F6] tracking-tight leading-tight">
								Curated Essentials <br className="hidden md:block" /> For Your Daily Ritual
							</h2>
						</div>
						<Link
							href="/collections"
							className="group flex items-center gap-3 pb-1 text-[11px] uppercase font-bold tracking-[0.2em] text-[#86967E] hover:text-[#F9F8F6] transition-all"
						>
							View All Products
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="transition-transform group-hover:translate-x-1"
							>
								<path
									d="M5 12H19"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 5L19 12L12 19"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
					{products.map((product, idx) => (
						<ProductCard key={product.id} product={product} index={idx} />
					))}
				</div>
			</div>
		</section>
	);
};
