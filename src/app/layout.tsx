import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartModal } from '@/components/CartModal';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans',
});

const dmSerif = DM_Serif_Display({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-serif',
});

export const metadata: Metadata = {
	title: 'Lather Lab | Artisanal Soap E-Shop',
	description:
		'Experience the purity of 100% botanical, cold-processed soaps. Earth conscious skincare for the modern home.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
			<body className="font-sans antialiased text-stone-900 bg-stone-50 overflow-x-hidden min-h-screen flex flex-col">
				<CartModal />
				<Navbar />
				<div className="flex-1">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
