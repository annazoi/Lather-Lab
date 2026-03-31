'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (query.trim().length >= 3) {
				handleSearch(query.trim());
			} else {
				setResults([]);
				setHasSearched(false);
			}
		}, 400);

		return () => clearTimeout(delayDebounceFn);
	}, [query]);

	const handleSearch = async (searchQuery: string) => {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
			if (!res.ok) throw new Error('Search failed');
			const data = await res.json();
			setResults(data.products || []);
			setHasSearched(true);
		} catch (error) {
			console.error('[SEARCH_ERROR]', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#F9F8F6]">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				{/* Search Header */}
				<div className="max-w-2xl mx-auto mb-20 text-center">
					<span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#86967E] mb-6 block">
						Product Finder
					</span>
					<h1 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-10 tracking-tight">
						What are you looking for?
					</h1>
					
					<div className="relative group">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search by name (e.g. Cedar, Salt, Clay)..."
							className="w-full bg-white border-b-2 border-stone-200 px-2 py-6 text-2xl font-serif text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-[#86967E] transition-all duration-500"
							autoFocus
						/>
						<div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 flex items-center space-x-4">
							{isLoading ? (
								<motion.div
									animate={{ rotate: 360 }}
									transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
									className="text-[#86967E]"
								>
									<SearchIcon size={24} />
								</motion.div>
							) : query.length > 0 ? (
								<button 
									onClick={() => setQuery('')} 
									className="hover:text-stone-600 transition-colors p-2"
								>
									<X size={20} />
								</button>
							) : (
								<SearchIcon size={24} />
							)}
						</div>
					</div>
					
					{/* Instruction Message */}
					<div className="h-6 mt-4">
						<AnimatePresence>
							{query.length > 0 && query.length < 3 && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#86967E]"
								>
									Please enter at least 3 characters to search
								</motion.p>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Results Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
					<AnimatePresence mode="popLayout">
						{results.map((product, idx) => (
							<motion.div
								key={product.id}
								layout
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.5, delay: idx * 0.05 }}
								className="group cursor-pointer flex flex-col"
							>
								<div className="relative aspect-[4/5] overflow-hidden bg-[#E2E1DF] mb-6 flex flex-col justify-end">
									{product.isBestSeller && (
										<div className="absolute top-6 left-6 bg-[#DCE8D5] text-[#1C1917] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
											Best Seller
										</div>
									)}
									<div className="absolute inset-0">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/0 transition-colors duration-500" />
									</div>

									<div className="relative z-20 px-6 pb-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
										<button className="w-full bg-[#1C1917] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#86967E] transition-colors shadow-2xl">
											Quick Add
										</button>
									</div>
								</div>

								<div className="space-y-1 px-1">
									<div className="flex justify-between items-baseline mb-1">
										<h3 className="font-serif text-[22px] text-stone-900 tracking-wide group-hover:text-[#86967E] transition-colors">
											{product.name}
										</h3>
										<div className="flex flex-col items-end">
											{product.discount ? (
												<>
													<span className="font-sans text-[15px] text-[#86967E] font-extrabold tracking-wider">
														${(product.price * (1 - product.discount / 100)).toFixed(2)}
													</span>
													<span className="font-sans text-[11px] text-stone-400 line-through opacity-80">
														${product.price.toFixed(2)}
													</span>
												</>
											) : (
												<span className="font-sans text-[15px] text-stone-900 font-extrabold tracking-wider">
													${product.price.toFixed(2)}
												</span>
											)}
										</div>
									</div>
									<div className="flex justify-between items-center">
										<p className="text-[12px] font-sans text-stone-400 uppercase tracking-[0.2em] font-medium">
											{product.category}
										</p>
										{product.discount && (
											<span className="text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded font-bold uppercase tracking-tighter">
												-{product.discount}%
											</span>
										)}
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* Empty State */}
				{hasSearched && results.length === 0 && !isLoading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-center py-32 border-t border-stone-200 mt-10"
					>
						<p className="font-serif text-3xl text-stone-300 mb-6 italic">
							No products matched your search for "{query}"
						</p>
						<button 
							onClick={() => setQuery('')}
							className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#86967E] border-b border-[#86967E] pb-1 hover:text-stone-900 hover:border-stone-900 transition-all"
						>
							View All Collections
						</button>
					</motion.div>
				)}

				{!hasSearched && !isLoading && query.length === 0 && (
					<div className="text-center py-20">
						<div className="flex justify-center space-x-8">
							{['Cedar', 'Lavender', 'Oatmeal', 'Citrus'].map((tag) => (
								<button 
									key={tag}
									onClick={() => setQuery(tag)}
									className="text-[11px] font-bold uppercase tracking-widest text-stone-400 hover:text-[#86967E] transition-colors"
								>
									# {tag}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
