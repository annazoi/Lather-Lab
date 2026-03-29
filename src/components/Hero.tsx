'use client';
import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '@/assets/hero.jpg';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
	return (
		<section className="relative min-h-[100vh] flex flex-col lg:flex-row overflow-hidden bg-white mt-20 lg:mt-0">
			{/* Right Background Block (Desktop Half background) */}
			<div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[#E5ECE3]" />

			{/* Left Content (Text) */}
			<div className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-6 lg:px-16 py-16 lg:py-0">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className="w-full max-w-[500px] lg:mr-10 xl:mr-20 space-y-8 mt-12 lg:mt-24"
				>
					<span className="text-[11px] uppercase tracking-[0.25em] text-[#7A9877] font-bold">
						HANDCRAFTED RITUALS
					</span>
					<h1 className="text-6xl lg:text-7xl xl:text-[80px] font-serif text-[#1C1917] leading-[1.05]">
						Elevate Your <br /> Daily Routine
					</h1>

					<p className="text-[15px] text-stone-500 leading-relaxed font-sans max-w-[420px]">
						Pure, botanical ingredients transformed into artisanal cleansing bars. A return to nature for skin
						that breathes.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<Link
							href="/collections"
							className="px-8 py-4 bg-[#1C1917] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#7A9877] transition-all duration-300"
						>
							Explore Collection
						</Link>
						<Link
							href="/philosophy"
							className="px-8 py-4 border border-stone-300 bg-white text-[#1C1917] text-[11px] font-bold uppercase tracking-widest hover:border-[#1C1917] transition-all duration-300"
						>
							Our Philosophy
						</Link>
					</div>
				</motion.div>
			</div>

			{/* Right Content (Visual) */}
			<div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-12 lg:py-0 bg-[#E5ECE3] lg:bg-transparent min-h-[600px] lg:min-h-screen">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
					className="relative w-full max-w-[500px] xl:max-w-[550px]"
				>
					{/* Main Visual Image */}
					<div className="relative aspect-[4/5] sm:aspect-square w-full shadow-2xl z-10">
						<Image src={heroImg} alt="Glowing botanical skincare" className="object-cover w-full h-full" />
					</div>

					{/* Floating Card */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
						className="absolute -bottom-8 -left-4 sm:-left-12 bg-white p-6 sm:p-8 shadow-2xl max-w-[280px] z-20"
					>
						<h3 className="font-serif text-[20px] text-stone-900 mb-2 font-bold leading-none">Cleanse</h3>
						<p className="font-sans text-[12px] text-stone-500 leading-relaxed max-w-[220px]">
							Begin with our gentle botanical bars to remove impurities without stripping natural oils.
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};
