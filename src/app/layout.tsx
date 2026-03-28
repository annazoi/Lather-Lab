import type { Metadata } from 'next';
// import { Inter, DM_Serif_Display } from "next-kit/google";
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';

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
	title: 'TERRA & LATHER | Artisanal Soap E-Shop',
	description:
		'Experience the purity of 100% botanical, cold-processed soaps. Earth conscious skincare for the modern home.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
			<body className="font-sans antialiased text-stone-900 bg-stone-50">{children}</body>
		</html>
	);
}
