'use client';
import React from 'react';
import { motion } from 'framer-motion';
import soap1 from '@/assets/soap-1.png';
import soap2 from '@/assets/soap-2.png';
import soap3 from '@/assets/soap-3.png';
import Image from 'next/image';
import './style.css';

const products = [
	{
		id: 1,
		name: 'French Green Clay',
		price: 18.0,
		category: 'Purifying & Balancing',
		img: soap1,
		isBestSeller: false,
	},
	{
		id: 2,
		name: 'Activated Charcoal',
		price: 20.0,
		category: 'Deep Cleanse & Detox',
		img: soap2,
		isBestSeller: false,
	},
	{
		id: 3,
		name: 'Colloidal Oatmeal',
		price: 18.0,
		category: 'Soothing & Nourishing',
		img: soap3,
		isBestSeller: true,
	},
];

export const Collections = () => {
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
						<a
							href="#"
							className="pb-1 text-[10px] uppercase font-bold tracking-[0.2em] text-[#86967E] hover:text-[#F9F8F6] transition-colors"
						>
							View All Products
						</a>
					</div>
					{/* Divider */}
					<div className="w-full h-[1px] bg-[#363330]" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
					{products.map((product, idx) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: idx * 0.1 }}
							className="group cursor-pointer flex flex-col"
						>
							<div className="relative aspect-square overflow-hidden bg-[#2D2A28] mb-6 flex flex-col justify-end product-card">
								{product.isBestSeller && (
									<div className="absolute top-6 left-6 bg-[#DCE8D5] text-[#1C1917] text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
										Best Seller
									</div>
								)}
								<div className="absolute inset-0 p-10 flex items-center justify-center">
									<Image
										src={product.img}
										alt={product.name}
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
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
