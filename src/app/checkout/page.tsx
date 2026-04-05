'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { getProductImageUrl } from '@/utils/product-image.utils';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { StripeProvider } from '@/components/providers/StripeProvider';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

function CheckoutContent() {
	const { items, getTotalPrice, clearCart } = useCartStore();
	const { user, isAuthenticated } = useAuthStore();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
	const [formData, setFormData] = useState({
		shippingName: '',
		shippingAddress: '',
		shippingCity: '',
		shippingPhone: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [orderId, setOrderId] = useState<string | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const isSuccessPage = searchParams.get('success') === 'true';

		if (isSuccessPage) {
			setIsSuccess(true);
			clearCart();
		}

		// Only redirect if NOT on success page and NOT authenticated
		if (!isAuthenticated && !isSuccessPage) {
			router.push('/login?redirect=/checkout');
		}
	}, [isAuthenticated, router, searchParams, clearCart]);

	const totalPrice = useMemo(() => getTotalPrice(), [items, getTotalPrice]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCreateIntent = async (e: React.FormEvent) => {
		e.preventDefault();
		if (items.length === 0) return;

		try {
			setIsSubmitting(true);
			const response = await fetch('/api/checkout/create-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					items,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Initiating payment failed');
			}

			const data = await response.json();
			setClientSecret(data.clientSecret);
			setOrderId(data.orderId);
			setStep('payment');
		} catch (error: any) {
			console.error(error);
			alert(error.message || 'Ritual failure. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isMounted || !isAuthenticated) return null;

	if (isSuccess) {
		return (
			<main className="min-h-screen pt-40 pb-24 bg-[#F9F8F6] flex items-center justify-center">
				<div className="max-w-md w-full px-6 text-center space-y-8 animate-in fade-in zoom-in duration-700">
					<div className="w-24 h-24 rounded-full bg-[#86967E]/10 flex items-center justify-center border border-[#86967E]/20 mx-auto">
						<Check size={48} className="text-[#86967E]" />
					</div>
					<div className="space-y-4">
						<h1 className="text-4xl font-serif text-[#1C1917]">Your order is on its way</h1>
						<p className="text-stone-500 text-sm leading-relaxed tracking-wide uppercase">
							Thank you for supporting artisanal craftsmanship. <br /> A confirmation has been sent to{' '}
							{user?.email}.
						</p>
					</div>
					<Link
						href="/"
						className="inline-block px-12 py-5 bg-[#1C1917] text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#86967E] transition-all duration-500 rounded-sm"
					>
						Return to Home
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#F9F8F6]">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				<Link
					href="/"
					className="inline-flex items-center space-x-3 text-stone-400 hover:text-[#1C1917] transition-all text-[10px] uppercase font-bold tracking-[0.2em] mb-12"
				>
					<ArrowLeft size={14} />
					<span>Continue Exploration</span>
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
					{/* Left: Form */}
					<div className="lg:col-span-7 space-y-12">
						{step === 'shipping' ? (
							<section className="space-y-8 animate-in fade-in duration-500">
								<div className="border-b border-stone-200 pb-6">
									<h1 className="text-4xl font-serif text-[#1C1917]">Shipping Ritual</h1>
									<p className="text-stone-400 text-xs uppercase tracking-widest mt-2">
										Where shall we send your botanicals?
									</p>
								</div>

								<form onSubmit={handleCreateIntent} className="space-y-6">
									<div className="grid grid-cols-1 gap-6">
										<div className="space-y-2">
											<label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 ml-1">
												Recipient Name
											</label>
											<input
												required
												type="text"
												name="shippingName"
												value={formData.shippingName}
												onChange={handleInputChange}
												placeholder="Enter full name"
												className="w-full bg-white border border-stone-200 px-6 py-4 text-sm focus:outline-none focus:border-[#86967E] transition-colors rounded-sm placeholder:text-stone-300"
											/>
										</div>

										<div className="space-y-2">
											<label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 ml-1">
												Delivery Address
											</label>
											<input
												required
												type="text"
												name="shippingAddress"
												value={formData.shippingAddress}
												onChange={handleInputChange}
												placeholder="Street, number, apartment"
												className="w-full bg-white border border-stone-200 px-6 py-4 text-sm focus:outline-none focus:border-[#86967E] transition-colors rounded-sm placeholder:text-stone-300"
											/>
										</div>

										<div className="grid grid-cols-2 gap-6">
											<div className="space-y-2">
												<label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 ml-1">
													City
												</label>
												<input
													required
													type="text"
													name="shippingCity"
													value={formData.shippingCity}
													onChange={handleInputChange}
													placeholder="City"
													className="w-full bg-white border border-stone-200 px-6 py-4 text-sm focus:outline-none focus:border-[#86967E] transition-colors rounded-sm placeholder:text-stone-300"
												/>
											</div>
											<div className="space-y-2">
												<label className="text-[10px] uppercase font-bold tracking-widest text-stone-500 ml-1">
													Contact Phone
												</label>
												<input
													required
													type="tel"
													name="shippingPhone"
													value={formData.shippingPhone}
													onChange={handleInputChange}
													placeholder="+00 (00) 000-0000"
													className="w-full bg-white border border-stone-200 px-6 py-4 text-sm focus:outline-none focus:border-[#86967E] transition-colors rounded-sm placeholder:text-stone-300"
												/>
											</div>
										</div>
									</div>

									<div className="pt-8">
										<button
											disabled={isSubmitting || items.length === 0}
											className="w-full bg-[#1C1917] text-white py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#86967E] transition-all duration-500 rounded-sm flex items-center justify-center space-x-4 disabled:opacity-50"
										>
											{isSubmitting ? (
												<>
													<Loader2 className="animate-spin" size={16} />
													<span>Crafting Order...</span>
												</>
											) : (
												<>
													<CreditCard size={16} />
													<span>Confirm Ritual & Proceed</span>
												</>
											)}
										</button>
									</div>
								</form>
							</section>
						) : (
							clientSecret &&
							orderId && (
								<StripeProvider clientSecret={clientSecret}>
									<CheckoutForm orderId={orderId} total={totalPrice} onCancel={() => router.push('/')} />
								</StripeProvider>
							)
						)}

						<section className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-stone-100">
							{[
								{ icon: Truck, title: 'Studio Shipping', sub: 'Eco-conscious courier' },
								{ icon: ShieldCheck, title: 'Small Batch Care', sub: 'Individually wrapped' },
								{ icon: CreditCard, title: 'Secure Alchemy', sub: 'Encrypted processing' },
							].map((prop, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2"
								>
									<prop.icon size={20} className="text-[#86967E] mb-1" />
									<p className="text-[10px] font-bold uppercase tracking-widest text-[#1C1917]">
										{prop.title}
									</p>
									<p className="text-[9px] uppercase tracking-widest text-stone-400 leading-normal">
										{prop.sub}
									</p>
								</div>
							))}
						</section>
					</div>

					{/* Right: Summary */}
					<div className="lg:col-span-5">
						<div className="bg-white border border-stone-200 rounded-sm p-8 lg:p-10 sticky top-32">
							<h2 className="text-[12px] uppercase font-bold tracking-[0.3em] text-[#1C1917] border-b border-stone-100 pb-6 mb-8">
								Your Selection
							</h2>

							<div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
								{items.map((item) => (
									<div key={item.id} className="flex space-x-6">
										<div className="relative w-20 h-24 bg-stone-50 border border-stone-100 rounded-sm overflow-hidden flex-shrink-0">
											<Image
												src={getProductImageUrl(item.image)}
												alt={item.name}
												fill
												className="object-cover grayscale-[0.2]"
											/>
										</div>
										<div className="flex-1 flex flex-col justify-between py-1">
											<div>
												<h4 className="text-[14px] font-serif italic text-[#1C1917]">{item.name}</h4>
												<p className="text-[9px] uppercase tracking-widest text-stone-400 mt-1">
													{item.category}
												</p>
											</div>
											<div className="flex justify-between items-end">
												<span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">
													Qty: {item.quantity}
												</span>
												<span className="text-[13px] font-bold text-[#1C1917]">
													${(
														(item.discount 
															? Number(item.price) * (1 - item.discount / 100) 
															: Number(item.price)) * item.quantity
													).toFixed(2)}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="space-y-4 border-t border-stone-100 pt-8">
								<div className="flex justify-between items-center text-stone-400">
									<span className="text-[10px] uppercase font-bold tracking-widest">Subtotal</span>
									<span className="text-[14px] font-sans font-bold">${totalPrice.toFixed(2)}</span>
								</div>
								<div className="flex justify-between items-center text-stone-400">
									<span className="text-[10px] uppercase font-bold tracking-widest">Shipping</span>
									<span className="text-[10px] uppercase font-bold tracking-widest">Complimentary</span>
								</div>
								<div className="flex justify-between items-center pt-4 border-t border-stone-100">
									<span className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#1C1917]">
										Total Ritual
									</span>
									<span className="text-2xl font-serif italic font-bold text-[#1C1917]">
										${totalPrice.toFixed(2)}
									</span>
								</div>
							</div>

							<p className="bg-[#86967E]/5 text-[#86967E] text-[9px] uppercase tracking-[0.2em] p-4 text-center mt-8 font-bold rounded-sm border border-[#86967E]/10 leading-relaxed">
								By confirming, you agree to our <br /> artisanal small-batch terms of service.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

import { CheckoutSkeleton } from '@/components/CheckoutSkeleton';

export default function CheckoutPage() {
	return (
		<Suspense fallback={<CheckoutSkeleton />}>
			<CheckoutContent />
		</Suspense>
	);
}
