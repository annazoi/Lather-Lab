import React from 'react';
import Image from 'next/image';
import { productService } from '@/services/product.service';
import { getProductImageUrl } from '@/utils/product-image.utils';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, Shield, RefreshCw, Truck } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import ProductActionButtons from '@/components/ProductActionButtons';
import { notFound } from 'next/navigation';

interface ProductPageProps {
	params: {
		id: string;
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const product = await productService.getProduct(params.id);

	if (!product) {
		notFound();
	}

	const isOutOfStock = product.quantity === 0;
	const salePrice = product.discount ? product.price * (1 - product.discount / 100) : null;

	// Split description and benefits for better UI
	const parts = (product.description || '').split('Benefits:');
	const mainDescription = parts[0]?.trim();
	const benefitsString = parts[1]?.trim();
	const benefitsList = benefitsString ? benefitsString.split(',').map((b) => b.trim()) : [];

	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#23211F] text-[#F9F8F6]">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				{/* Back Button */}
				<Link
					href="/collections"
					className="inline-flex items-center space-x-3 text-stone-500 hover:text-white transition-all text-[11px] uppercase font-bold tracking-[0.2em] group mb-12"
				>
					<ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
					<span>Back to Collections</span>
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
					{/* Left: Image Gallery */}
					<div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
						<div className="relative aspect-[4/5] overflow-hidden bg-[#1C1917] border border-[#363330] rounded-2xl group">
							{product.isBestSeller && (
								<div className="absolute top-8 left-8 bg-[#DCE8D5] text-[#1C1917] text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] z-10 shadow-2xl">
									Best Seller
								</div>
							)}

							{product.discount && (
								<div className="absolute top-8 right-8 bg-[#86967E] text-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] z-10 shadow-2xl">
									Special Offer -{product.discount}%
								</div>
							)}

							<Image
								src={getProductImageUrl(product.image)}
								alt={product.name}
								fill
								priority
								className="object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 via-transparent to-transparent pointer-events-none" />
						</div>

						{/* Secondary Images (if any) */}
						{product.images.length > 0 && (
							<div className="grid grid-cols-4 gap-4">
								{product.images.map((img, idx) => (
									<div
										key={idx}
										className="relative aspect-square rounded-lg overflow-hidden border border-[#363330] hover:border-[#86967E] transition-all cursor-pointer group"
									>
										<Image
											src={getProductImageUrl(img)}
											alt={`${product.name} view ${idx + 1}`}
											fill
											className="object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Right: Product Details */}
					<div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000 delay-150">
						<section className="space-y-6">
							<div>
								<span className="text-[11px] uppercase font-bold tracking-[0.3em] text-[#86967E] mb-4 block">
									{product.category}
								</span>
								<h1 className="text-5xl lg:text-6xl font-serif text-[#F9F8F6] tracking-tight leading-tight">
									{product.name}
								</h1>
							</div>

							<div className="flex items-baseline space-x-6">
								{salePrice ? (
									<>
										<span className="text-3xl font-sans font-bold text-[#F9F8F6]">
											${salePrice.toFixed(2)}
										</span>
										<span className="text-xl font-sans text-stone-500 line-through opacity-50">
											${product.price.toFixed(2)}
										</span>
									</>
								) : (
									<span className="text-3xl font-sans font-bold text-[#F9F8F6]">
										${product.price.toFixed(2)}
									</span>
								)}
							</div>

							<p className="text-stone-400 text-lg font-serif italic leading-relaxed max-w-xl">
								{mainDescription}
							</p>
						</section>

						{/* Benefits List */}
						{benefitsList.length > 0 && (
							<section className="space-y-6">
								<h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-stone-500 border-b border-[#363330] pb-4">
									Benefits of Use
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
									{benefitsList.map((benefit, idx) => (
										<div key={idx} className="flex items-center space-x-3 group text-stone-300">
											<div className="w-5 h-5 rounded-full bg-[#86967E]/10 flex items-center justify-center border border-[#86967E]/20 group-hover:bg-[#86967E]/20 transition-all">
												<Check size={10} className="text-[#86967E]" />
											</div>
											<span className="text-[13px] font-sans group-hover:text-white transition-colors">
												{benefit}
											</span>
										</div>
									))}
								</div>
							</section>
						)}

						{/* Action Buttons */}
						<section className="space-y-6 pt-4">
							<ProductActionButtons product={product} />

							{isOutOfStock ? (
								<p className="text-red-400/80 text-[11px] font-bold uppercase tracking-widest text-center sm:text-left">
									This artisanal batch is currently sold out.
								</p>
							) : (
								<p className="text-[#86967E] text-[11px] font-bold uppercase tracking-widest text-center sm:text-left">
									Only {product.quantity} bars left in this harvest.
								</p>
							)}
						</section>

						{/* Value Props */}
						<section className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-[#363330]">
							{[
								{ icon: Truck, text: 'Studio Pickup Available', sub: 'Ready in 2-4 hours' },
								{ icon: Shield, text: 'Sustainable Sourcing', sub: 'Wild-harvested botanicals' },
								{ icon: RefreshCw, text: 'Small Batch Quality', sub: 'Aged for 6 weeks' },
							].map((item, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2"
								>
									<item.icon size={18} className="text-[#86967E] mb-2" />
									<p className="text-[10px] font-bold uppercase tracking-widest text-[#F9F8F6]">{item.text}</p>
									<p className="text-[9px] uppercase tracking-widest text-stone-500 leading-normal">
										{item.sub}
									</p>
								</div>
							))}
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}
