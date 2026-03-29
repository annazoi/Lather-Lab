'use client';
import React from 'react';
import { Instagram, Facebook, Ticket } from 'lucide-react';

export const Footer = () => {
	const startYear = 2026;
	const currentYear = new Date().getFullYear();
	const yearDisplay = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;

	return (
		<footer className="bg-[#23211F] text-[#F9F8F6] pt-24 pb-12 w-full">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
					{/* Brand Col */}
					<div className="lg:col-span-4 space-y-6 lg:pr-10">
						<h3 className="text-[20px] font-serif tracking-[0.1em] flex items-center text-white mb-2">
							LATHER <span className="font-serif italic font-normal px-1.5">&</span> LAB
						</h3>
						<p className="text-[12px] text-[#A5A29F] leading-relaxed max-w-[280px]">
							Artisanal skincare crafted with botanical intelligence. Pure, potent, and gentle on the earth.
						</p>
						<div className="flex space-x-5 pt-3">
							<Instagram
								size={16}
								className="text-[#A5A29F] hover:text-white cursor-pointer transition-colors"
							/>
							<Ticket size={16} className="text-[#A5A29F] hover:text-white cursor-pointer transition-colors" />{' '}
							{/* Placeholder for Pinterest */}
							<Facebook size={16} className="text-[#A5A29F] hover:text-white cursor-pointer transition-colors" />
						</div>
					</div>

					{/* Shop Col */}
					<div className="lg:col-span-2 space-y-6 lg:pl-10">
						<h4 className="text-[12px] font-[800] uppercase tracking-[0.2em] text-[#F9F8F6]">Shop</h4>
						<ul className="space-y-4 text-[12px] text-[#A5A29F]">
							{['All Products', 'Facial Bars', 'Body Bars', 'Accessories', 'Gift Sets'].map((link) => (
								<li key={link}>
									<a href="#" className="hover:text-white transition-colors">
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* About Col */}
					<div className="lg:col-span-2 space-y-6 lg:pl-4">
						<h4 className="text-[12px] font-[800] uppercase tracking-[0.2em] text-[#F9F8F6]">About</h4>
						<ul className="space-y-4 text-[12px] text-[#A5A29F]">
							{['Our Story', 'Ingredients', 'Sustainability', 'Journal', 'Contact'].map((link) => (
								<li key={link}>
									<a href="#" className="hover:text-white transition-colors">
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter Col */}
					<div className="lg:col-span-4 space-y-6 lg:pl-10">
						<h4 className="text-[12px] font-[800] uppercase tracking-[0.2em] text-[#F9F8F6]">Newsletter</h4>
						<p className="text-[12px] text-[#A5A29F] leading-relaxed max-w-[280px]">
							Subscribe to receive updates, access to exclusive deals, and more.
						</p>
						<form className="flex flex-col space-y-4 pt-1 w-full max-w-[320px]">
							<input
								type="email"
								placeholder="Enter your email address"
								className="bg-[#2D2A28] border border-[#3A3836] text-[12px] px-4 py-3.5 w-full text-white placeholder:text-[#6C6967] focus:outline-none focus:border-[#86967E] transition-colors"
							/>
							<button
								type="submit"
								className="bg-white text-[#1C1917] text-[10px] font-bold uppercase tracking-[0.2em] py-4 w-full hover:bg-[#86967E] hover:text-white transition-colors"
							>
								SUBSCRIBE
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-[#3A3836] pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-[#716E6B]">
					<p>© {yearDisplay} Lather Lab. All rights reserved.</p>
					<div className="flex space-x-8">
						<a href="#" className="hover:text-[#A5A29F] transition-colors">
							Privacy Policy
						</a>
						<a href="#" className="hover:text-[#A5A29F] transition-colors">
							Terms of Service
						</a>
						<a href="#" className="hover:text-[#A5A29F] transition-colors">
							Shipping & Returns
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
