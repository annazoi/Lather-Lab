'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import olive from '@/assets/olive.jpg';
import drops from '@/assets/drops.jpg';

export const Ingredients = () => {
	return (
		<section className="py-24 lg:py-32 bg-[#f4f7f2] overflow-hidden">
			<div className="max-w-[1100px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 1, ease: 'easeOut' }}
					className="flex gap-4 h-[500px] lg:h-[550px] w-full flex items-center justify-center lg:justify-start lg:ml-[-20px]"
				>
					<div className="w-[50%] h-[85%] shadow-md z-10 mt-10">
						<Image src={olive} alt="Botanical leaves" className="object-cover w-full h-full" />
					</div>
					<div className="w-[50%] h-[85%] shadow-2xl z-20 mb-10">
						<Image src={drops} alt="Golden oil pouring" className="object-cover w-full h-full" />
					</div>
				</motion.div>

				{/* Right Content */}
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
					className="space-y-8 lg:pl-8"
				>
					<div className="space-y-5">
						<h2 className="text-4xl lg:text-[44px] font-serif text-[#1C1917] leading-[1.1] tracking-tight">
							Completely Nourished <br className="hidden lg:block" /> Skin Care
						</h2>
						<p className="text-[#848581] leading-relaxed text-[14.5px] font-sans max-w-[440px]">
							We believe that what goes on your body goes in your body. That's why every Lather Lab bar is
							crafted from unrefined plant butters, cold-pressed oils, and pure essential oils.
						</p>
					</div>

					<div className="space-y-0 relative max-w-[440px]">
						{/* Accordion Lines */}
						<div className="w-full h-[1px] bg-[#E3E4DF]" />
						{['Shea & Cocoa Butters', 'Botanical Clays', 'Pure Essential Oils'].map((item, idx) => (
							<div key={idx} className="group cursor-pointer">
								<div className="flex justify-between items-center py-5">
									<h4 className="font-serif text-[17px] text-[#2F2D2A] group-hover:text-[#7A9877] transition-colors">
										{item}
									</h4>
									<span className="text-[#A2A19F] font-light text-lg group-hover:text-[#7A9877] transition-colors">
										+
									</span>
								</div>
								<div className="w-full h-[1px] bg-[#E3E4DF]" />
							</div>
						))}
					</div>

					<button className="flex items-center space-x-2 text-[#1C1917] font-bold uppercase tracking-[0.15em] text-[10px] pt-4 hover:text-[#7A9877] transition-colors group">
						<span>READ OUR INGREDIENT INDEX</span>
						<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
					</button>
				</motion.div>
			</div>
		</section>
	);
};
