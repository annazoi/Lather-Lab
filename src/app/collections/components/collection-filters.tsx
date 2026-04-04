'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCT_SORT_LABELS, PRODUCT_SORT_OPTIONS, ProductSortType } from '@/config/product-sort.config';

interface CollectionFiltersProps {
	currentSort: ProductSortType;
	currentCategory?: string;
	productsCount: number;
	categories: string[];
	searchParams: Record<string, string | string[] | undefined>;
}

export function CollectionFilters({
	currentSort,
	currentCategory,
	productsCount,
	categories,
	searchParams
}: CollectionFiltersProps) {
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const sortRef = useRef<HTMLDivElement>(null);
	const categoryRef = useRef<HTMLDivElement>(null);

	// Close dropdowns when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
				setIsSortOpen(false);
			}
			if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
				setIsCategoryOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const getQueryLink = (params: Record<string, string | undefined>) => {
		const newParams = new URLSearchParams();
		
		if (searchParams) {
			Object.entries(searchParams).forEach(([key, value]) => {
				if (value && typeof value === 'string') {
					newParams.set(key, value);
				}
			});
		}

		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				newParams.set(key, value);
			} else {
				newParams.delete(key);
			}
		});

		const queryString = newParams.toString();
		return queryString ? `?${queryString}` : '/collections';
	};

	return (
		<div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-8 border-b border-[#363330]/50 sticky top-[80px] bg-[#23211F]/80 backdrop-blur-md z-40 gap-8 md:gap-0">
			<div className="flex items-center gap-8">
				<span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#86967E] min-w-[100px]">
					{productsCount} Products
				</span>
				
				{/* Category Pills (Desktop) */}
				<div className="hidden lg:flex items-center gap-4 overflow-x-auto no-scrollbar">
					<Link 
						href="/collections"
						className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-full border ${!currentCategory ? 'bg-[#86967E] border-[#86967E] text-[#1C1917]' : 'border-[#363330] text-[#8A8886] hover:border-[#86967E] hover:text-[#F9F8F6]'}`}
					>
						All Products
					</Link>
					{categories.map((cat) => (
						<Link
							key={cat}
							href={getQueryLink({ category: cat })}
							className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-300 rounded-full border ${currentCategory === cat ? 'bg-[#86967E] border-[#86967E] text-[#1C1917]' : 'border-[#363330] text-[#8A8886] hover:border-[#86967E] hover:text-[#F9F8F6]'}`}
						>
							{cat.split(' & ')[0]}
						</Link>
					))}
				</div>
			</div>

			<div className="flex items-center space-x-10 text-[10px] uppercase font-bold tracking-[0.2em]">
				{/* Sort Dropdown */}
				<div className="relative" ref={sortRef}>
					<button 
						onClick={() => setIsSortOpen(!isSortOpen)}
						className="flex items-center gap-3 py-2 hover:text-[#F9F8F6] transition-all"
					>
						<span className="text-[#86967E]">Sort By:</span>
						<span className="text-[#F9F8F6] flex items-center gap-2">
							{PRODUCT_SORT_LABELS[currentSort]}
							<svg viewBox="0 0 24 24" className={`w-3 h-3 transition-transform duration-500 ${isSortOpen ? 'rotate-180' : ''} fill-current`} xmlns="http://www.w3.org/2000/svg">
								<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
							</svg>
						</span>
					</button>
					<div className={`absolute top-[calc(100%+8px)] right-0 bg-[#1C1917] border border-[#363330] shadow-2xl p-1 transition-all duration-300 min-w-[220px] z-50 rounded-lg overflow-hidden backdrop-blur-sm ${isSortOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
						{Object.entries(PRODUCT_SORT_LABELS).map(([value, label]) => (
							<Link
								key={value}
								href={getQueryLink({ sort: value })}
								onClick={() => setIsSortOpen(false)}
								className={`group/item flex items-center justify-between px-5 py-4 transition-all duration-300 hover:bg-[#86967E]/10 ${currentSort === value ? 'text-[#86967E] bg-[#86967E]/5' : 'text-[#8A8886]'}`}
							>
								<span className={`tracking-widest ${currentSort === value ? 'font-black' : 'group-hover/item:text-[#F9F8F6]'}`}>
									{label}
								</span>
								{currentSort === value && (
									<div className="w-1 h-1 bg-[#86967E] rounded-full"></div>
								)}
							</Link>
						))}
					</div>
				</div>

				{/* Mobile Filter Toggle */}
				<div className="relative lg:hidden" ref={categoryRef}>
					<button 
						onClick={() => setIsCategoryOpen(!isCategoryOpen)}
						className="hover:text-[#F9F8F6] transition-colors border-b border-[#363330] pb-1"
					>
						Filter Categories
					</button>
					<div className={`absolute top-full right-0 mt-2 bg-[#1C1917] border border-[#363330] p-1 shadow-2xl transition-all duration-300 min-w-[200px] z-50 rounded-lg backdrop-blur-sm ${isCategoryOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
						<Link 
							href="/collections" 
							onClick={() => setIsCategoryOpen(false)}
							className={`block px-5 py-4 hover:bg-[#86967E]/10 transition-colors ${!currentCategory ? 'text-[#86967E]' : 'text-[#8A8886]'}`}
						>
							All Categories
						</Link>
						{categories.map(cat => (
							<Link
								key={cat}
								href={getQueryLink({ category: cat })}
								onClick={() => setIsCategoryOpen(false)}
								className={`block px-5 py-4 hover:bg-[#86967E]/10 transition-colors ${currentCategory === cat ? 'text-[#86967E]' : 'text-[#8A8886]'}`}
							>
								{cat}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
