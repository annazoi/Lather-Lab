'use client';
import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/70 backdrop-blur-md shadow-sm border-b-transparent'
					: 'bg-white border-b border-[#E6EDE4]'
			}`}
		>
			<div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
				{/* Mobile Menu */}
				<button className="lg:hidden p-2 text-stone-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* Brand Logo */}
				<div className="flex-1 lg:flex-none flex items-center lg:justify-start justify-center">
					<a
						href="/"
						className="text-xl md:text-2xl font-serif text-stone-900 font-bold tracking-widest flex items-center space-x-1"
					>
						<span>LATHER LAB</span>
					</a>
				</div>

				{/* Desktop Nav Links */}
				<div className="hidden lg:flex flex-1 justify-center space-x-12">
					{[
						{ name: 'HOME', href: '/' },
						{ name: 'PHILOSOPHY', href: '/philosophy' },
						{ name: 'COLLECTIONS', href: '/collections' },
						{ name: 'INGREDIENTS', href: '/ingredients' },
						{ name: 'CONTACT', href: '/contact' },
					].map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="text-[11px] font-sans font-semibold tracking-[0.2em] text-stone-500 hover:text-stone-900 transition-colors duration-300"
						>
							{link.name}
						</Link>
					))}
				</div>

				{/* Utility Icons */}
				<div className="flex space-x-5 items-center justify-end flex-1 lg:flex-none">
					<Link href="/search" className="text-stone-600 hover:text-stone-900 transition-colors">
						<Search size={18} />
					</Link>
					<Link
						href={isAuthenticated ? '/dashboard' : '/login'}
						className="hidden sm:block text-stone-600 hover:text-stone-900 transition-colors"
					>
						<User size={18} />
					</Link>
					<button className="text-stone-600 hover:text-stone-900 transition-colors relative">
						<ShoppingBag size={18} />
						<span className="absolute -top-2 -right-2 bg-[#A8C0A0] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
							0
						</span>
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-stone-100 shadow-lg px-6 py-6">
					<div className="flex flex-col space-y-6">
						{[
							{ name: 'HOME', href: '/' },
							{ name: 'PHILOSOPHY', href: '/philosophy' },
							{ name: 'COLLECTIONS', href: '/collections' },
							{ name: 'CONTACT', href: '/contact' },
						].map((link) => (
							<Link
								key={link.name}
								href={link.href}
								onClick={() => setIsMenuOpen(false)}
								className="text-xs font-sans font-semibold tracking-[0.2em] text-stone-500 hover:text-stone-900"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};
