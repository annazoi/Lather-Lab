'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';
import { productSchema } from '@/validators/admin.schema';
import Image from 'next/image';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
	const { id } = useParams();
	// ... (rest of state)
	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		category: '',
		image: '',
		isActive: true,
		isBestSeller: false,
		quantity: 0,
		discount: 0,
		description: '',
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// ... (fetch logic remains same)
		async function fetchProduct() {
			try {
				const res = await fetch(`/api/admin/products/${id}`);
				if (!res.ok) throw new Error('Product not found');
				const data = await res.json();
				setFormData({
					name: data.name,
					price: data.price,
					category: data.category,
					image: data.image,
					isActive: data.isActive,
					isBestSeller: data.isBestSeller,
					quantity: data.quantity || 0,
					discount: data.discount || 0,
					description: data.description || '',
				});
			} catch (err) {
				alert('Could not load product details');
				router.push('/dashboard/products');
			} finally {
				setLoading(false);
			}
		}
		fetchProduct();
	}, [id, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		// ... (same submit logic)
		e.preventDefault();
		setSaving(true);

		try {
			// Convert discount to number or null correctly
			const dataToValidate = {
				...formData,
				discount: formData.discount === 0 ? null : formData.discount,
			};
			await productSchema.validate(dataToValidate);

			const response = await fetch(`/api/admin/products/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToValidate),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to update product');
			}

			router.push('/dashboard/products');
			router.refresh();
		} catch (err: any) {
			alert(err.message);
		} finally {
			setSaving(false);
		}
	};

	if (loading)
		return (
			<div className="text-[#86967E] text-[10px] uppercase font-bold tracking-widest animate-pulse">
				Retrieving Product Data...
			</div>
		);

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
			<header className="mb-12 flex items-center justify-between">
				<div>
					<Link
						href="/dashboard/products"
						className="flex items-center space-x-2 text-[#86967E] hover:text-white transition-colors mb-6 text-[10px] uppercase font-bold tracking-widest"
					>
						<ArrowLeft size={14} />
						<span>Return to Catalogue</span>
					</Link>
					<h1 className="text-4xl font-serif mb-2 text-[#F9F8F6]">Edit Product: {formData.name}</h1>
					<p className="text-[11px] uppercase tracking-[0.2em] text-[#86967E] font-bold">
						Modifying Catalogue Entity
					</p>
				</div>
			</header>

			<div className="bg-[#1C1917] border border-[#363330] rounded-xl p-12 shadow-2xl">
				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
					<div className="space-y-8">
						<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Product Name
								</label>
								<input
									type="text"
									value={formData.name}
									required
									className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Category
								</label>
								<select
									value={formData.category}
									className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors appearance-none cursor-pointer"
									onChange={(e) => setFormData({ ...formData, category: e.target.value })}
								>
									<option value="">Select Category</option>
									<option value="Purifying & Balancing">Purifying</option>
									<option value="Deep Cleanse & Detox">Detox</option>
									<option value="Soothing & Nourishing">Nourishing</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Price ($)
								</label>
								<input
									type="number"
									step="0.01"
									value={formData.price}
									required
									className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
									onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
								/>
							</div>
							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Stock Quantity
								</label>
								<input
									type="number"
									value={formData.quantity}
									required
									min="0"
									className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
									onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Discount (%)
								</label>
								<input
									type="number"
									min="0"
									max="100"
									value={formData.discount}
									className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
									onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })}
								/>
							</div>
						</div>

						<div className="space-y-2 col-span-2">
							<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
								Description & Benefits
							</label>
							<textarea
								value={formData.description}
								required
								placeholder="Artisanal blend of... Benefits: Calming, Silky, etc."
								rows={4}
								className="w-full bg-transparent border border-[#363330] p-4 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors rounded-lg resize-none"
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							/>
						</div>

						<div className="flex flex-col space-y-4 pt-4">
							<label className="flex items-center space-x-3 cursor-pointer group">
								<input
									type="checkbox"
									checked={formData.isActive}
									onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
									className="w-4 h-4 rounded border-[#363330] bg-transparent text-[#86967E] focus:ring-offset-0 focus:ring-0 cursor-pointer"
								/>
								<span className="text-[11px] uppercase font-bold tracking-widest text-[#8A8886] group-hover:text-white transition-colors">
									Active Status (Visible to customers)
								</span>
							</label>
							<label className="flex items-center space-x-3 cursor-pointer group">
								<input
									type="checkbox"
									checked={formData.isBestSeller}
									onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
									className="w-4 h-4 rounded border-[#363330] bg-transparent text-[#86967E] focus:ring-offset-0 focus:ring-0 cursor-pointer"
								/>
								<span className="text-[11px] uppercase font-bold tracking-widest text-[#8A8886] group-hover:text-white transition-colors">
									Best Seller Highlight
								</span>
							</label>
						</div>
					</div>

					<div className="space-y-8">
						<div className="space-y-4">
							<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
								Current Image
							</label>
							<div className="relative w-full h-48 rounded bg-[#2D2A28] overflow-hidden group">
								<Image
									src={formData.image || '/images/placeholder.png'}
									alt="Preview"
									fill
									className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
								/>
							</div>
							<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E] mt-6 block">
								Replace Image
							</label>
							<ImageUpload
								onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
								onUploadError={(err) => alert(err)}
							/>
						</div>

						<div className="pt-10">
							<button
								type="submit"
								disabled={saving}
								className="w-full bg-[#86967E] text-white py-5 font-bold uppercase tracking-[0.25em] text-[11px] hover:bg-white hover:text-[#1C1917] transition-all disabled:opacity-50"
							>
								{saving ? 'Updating Repository...' : 'Update Product'}
							</button>
						</div>
					</div>
				</form>
			</div>

			{/* Live Preview Section */}
			<div className="mt-24 space-y-12 animate-in fade-in duration-1000 delay-300">
				<header className="border-b border-[#363330] pb-6">
					<h2 className="text-2xl font-serif text-[#F9F8F6]">Customer Experience Preview</h2>
					<p className="text-[10px] uppercase tracking-[0.2em] text-[#86967E] font-bold mt-2">
						Simulated Storefront Overview
					</p>
				</header>

				<div className="bg-[#1C1917] border border-[#363330] rounded-2xl overflow-hidden shadow-2xl">
					<div className="grid grid-cols-1 lg:grid-cols-2">
						<div className="relative aspect-square lg:aspect-auto bg-[#2D2A28] overflow-hidden grayscale-[0.2]">
							<Image
								src={formData.image || '/images/placeholder.png'}
								alt="Preview"
								fill
								className="object-cover"
							/>
							{formData.isBestSeller && (
								<div className="absolute top-6 left-6 bg-[#DCE8D5] text-[#1C1917] text-[9px] font-bold px-4 py-2 uppercase tracking-widest z-10 shadow-2xl">
									Best Seller
								</div>
							)}
							{formData.discount > 0 && (
								<div className="absolute top-6 right-6 bg-[#86967E] text-white text-[9px] font-bold px-4 py-2 uppercase tracking-widest z-10 shadow-2xl">
									{formData.discount}% Off
								</div>
							)}
						</div>

						<div className="p-8 md:p-16 space-y-10">
							<section className="space-y-6">
								<div>
									<span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#86967E] mb-4 block">
										{formData.category || 'Category Unselected'}
									</span>
									<h3 className="text-4xl font-serif text-[#F9F8F6] tracking-tight leading-tight">
										{formData.name || 'Unnamed Craft'}
									</h3>
								</div>

								<div className="flex items-baseline space-x-6">
									{formData.discount > 0 ? (
										<>
											<span className="text-2xl font-sans font-bold text-[#F9F8F6]">
												${(formData.price * (1 - formData.discount / 100)).toFixed(2)}
											</span>
											<span className="text-lg font-sans text-stone-500 line-through opacity-50">
												${formData.price.toFixed(2)}
											</span>
										</>
									) : (
										<span className="text-2xl font-sans font-bold text-[#F9F8F6]">
											${formData.price.toFixed(2)}
										</span>
									)}
								</div>

								<p className="text-stone-400 text-[15px] font-serif italic leading-relaxed max-w-md">
									{formData.description.split('Benefits:')[0]?.trim() || 'No description provided yet.'}
								</p>
							</section>

							{formData.description.includes('Benefits:') && (
								<section className="space-y-6 border-t border-[#363330] pt-10">
									<h4 className="text-[9px] uppercase font-bold tracking-[0.3em] text-stone-500">
										Artisanal Benefits
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{formData.description
											.split('Benefits:')[1]
											?.split(',')
											.map((benefit, idx) => (
												<div key={idx} className="flex items-center space-x-3 text-stone-300">
													<div className="w-4 h-4 rounded-full bg-[#86967E]/10 flex items-center justify-center border border-[#86967E]/20">
														<Check size={8} className="text-[#86967E]" />
													</div>
													<span className="text-[11px] font-sans">{benefit.trim()}</span>
												</div>
											))}
									</div>
								</section>
							)}

							<div className="flex gap-4 pt-4">
								<div className="flex-1 flex items-center justify-center space-x-4 px-8 py-4 bg-[#86967E] text-[#F9F8F6] text-[10px] uppercase font-bold tracking-[0.25em] opacity-80 cursor-not-allowed">
									<ShoppingBag size={16} />
									<span>Add to Collection</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
