'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';
import { productSchema, ProductInput } from '@/validators/admin.schema';
import { ValidationError } from 'yup';

const CATEGORIES = [
	'Purifying & Balancing',
	'Deep Cleanse & Detox',
	'Soothing & Nourishing',
	'Sensitive Skin Care',
] as const;

export default function NewProductPage() {
	const router = useRouter();
	const [formData, setFormData] = useState<ProductInput>({
		name: '',
		price: 0,
		category: '',
		image: '',
		isBestSeller: false,
		isActive: true,
		quantity: 0,
		discount: 0,
		description: '',
	});

	const [errors, setErrors] = useState<Partial<Record<keyof ProductInput, string>>>({});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const finalValue = type === 'number' ? parseFloat(value) || 0 : value;

		setFormData((prev) => ({
			...prev,
			[name]: finalValue,
		}));

		// Clear error when user types
		if (errors[name as keyof ProductInput]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleToggle = (name: keyof ProductInput) => {
		setFormData((prev) => ({
			...prev,
			[name]: !prev[name],
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		try {
			// Validate with Yup
			await productSchema.validate(formData, { abortEarly: false });

			// API call (simulated or real)
			const response = await fetch('/api/admin/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error('Failed to create product');

			alert('Product created successfully!');
			router.push('/dashboard/products');
		} catch (error) {
			if (error instanceof ValidationError) {
				const newErrors: any = {};
				error.inner.forEach((err) => {
					if (err.path) newErrors[err.path] = err.message;
				});
				setErrors(newErrors);
			} else {
				console.error('Save error:', error);
				alert('An unexpected error occurred.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-[#23211F] p-6 lg:p-12 text-stone-50 selection:bg-[#86967E]/30">
			<div className="max-w-[1200px] mx-auto">
				{/* Sticky Header */}
				<header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 sticky top-0 bg-[#23211F]/80 backdrop-blur-md z-30 py-4 border-b border-[#363330]/50">
					<div className="space-y-1">
						<h1 className="text-3xl lg:text-4xl font-serif tracking-tight text-[#F9F8F6]">
							New Botanical Masterpiece
						</h1>
						<p className="text-[#8A8886] text-[12px] uppercase tracking-widest font-bold">
							Curating the next sensory experience
						</p>
					</div>
					<div className="flex gap-4 w-full md:w-auto">
						<button
							onClick={() => router.back()}
							className="flex-1 md:flex-none px-8 py-3.5 border border-[#363330] text-[11px] font-bold uppercase tracking-widest hover:bg-[#363330] transition-all rounded-lg"
						>
							Cancel
						</button>
						<button
							form="product-form"
							type="submit"
							disabled={loading}
							className="flex-1 md:flex-none px-12 py-3.5 bg-[#86967E] text-[#1C1917] text-[11px] font-bold uppercase tracking-widest hover:bg-[#F9F8F6] transition-all disabled:opacity-50 rounded-lg shadow-xl shadow-[#86967E]/10"
						>
							{loading ? 'Manifesting...' : 'Create Product'}
						</button>
					</div>
				</header>

				<form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Left Column - Main Details */}
					<div className="lg:col-span-2 space-y-12">
						{/* Essentials Section */}
						<section className="bg-[#1C1917] p-8 lg:p-10 rounded-2xl border border-[#363330] space-y-8">
							<div className="flex items-center gap-4 mb-2">
								<div className="w-1.5 h-1.5 bg-[#86967E] rounded-full"></div>
								<h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#86967E]">
									Product Essentials
								</h2>
							</div>

							<div className="space-y-8">
								<div className="space-y-3">
									<label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886]">
										Botanical Name
									</label>
									<input
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="e.g., Lavender & Himalayan Salt"
										className={`w-full bg-[#23211F] border ${errors.name ? 'border-red-500/50' : 'border-[#363330]'} rounded-xl px-5 py-4 focus:border-[#86967E] outline-none transition-all placeholder:text-[#363330] text-sm`}
									/>
									{errors.name && (
										<p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
											{errors.name}
										</p>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-3">
										<label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886]">
											Category
										</label>
										<select
											name="category"
											value={formData.category}
											onChange={handleChange}
											className={`w-full bg-[#23211F] border ${errors.category ? 'border-red-500/50' : 'border-[#363330]'} rounded-xl px-5 py-4 focus:border-[#86967E] outline-none appearance-none transition-all text-sm`}
										>
											<option value="">Select a Collection</option>
											{CATEGORIES.map((cat) => (
												<option key={cat} value={cat}>
													{cat}
												</option>
											))}
										</select>
										{errors.category && (
											<p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
												{errors.category}
											</p>
										)}
									</div>
								</div>

								<div className="space-y-3">
									<label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886]">
										Detailed Ritual (Description)
									</label>
									<textarea
										name="description"
										rows={6}
										value={formData.description}
										onChange={handleChange}
										placeholder="Describe the sensory experience, skin benefits, and artisanal process..."
										className={`w-full bg-[#23211F] border ${errors.description ? 'border-red-500/50' : 'border-[#363330]'} rounded-xl px-5 py-4 focus:border-[#86967E] outline-none resize-none transition-all placeholder:text-[#363330] text-sm leading-relaxed`}
									/>
									{errors.description && (
										<p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
											{errors.description}
										</p>
									)}
								</div>
							</div>
						</section>

						{/* Inventory Section */}
						<section className="bg-[#1C1917] p-8 lg:p-10 rounded-2xl border border-[#363330] space-y-8">
							<div className="flex items-center gap-4 mb-2">
								<div className="w-1.5 h-1.5 bg-[#86967E] rounded-full"></div>
								<h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#86967E]">
									Inventory & Pricing
								</h2>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<div className="space-y-3">
									<label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886]">
										Base Price ($)
									</label>
									<input
										type="number"
										name="price"
										step="0.01"
										value={formData.price}
										onChange={handleChange}
										className={`w-full bg-[#23211F] border ${errors.price ? 'border-red-500/50' : 'border-[#363330]'} rounded-xl px-5 py-4 focus:border-[#86967E] outline-none transition-all text-sm`}
									/>
									{errors.price && (
										<p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
											{errors.price}
										</p>
									)}
								</div>

								<div className="space-y-3">
									<label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886]">
										Discount (%)
									</label>
									<input
										type="number"
										name="discount"
										value={formData.discount ?? 0}
										onChange={handleChange}
										className="w-full bg-[#23211F] border border-[#363330] rounded-xl px-5 py-4 focus:border-[#86967E] outline-none transition-all text-sm"
									/>
								</div>

								<div className="space-y-3">
									<label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886]">
										Stock Quantity
									</label>
									<input
										type="number"
										name="quantity"
										value={formData.quantity}
										onChange={handleChange}
										className={`w-full bg-[#23211F] border ${errors.quantity ? 'border-red-500/50' : 'border-[#363330]'} rounded-xl px-5 py-4 focus:border-[#86967E] outline-none transition-all text-sm`}
									/>
									{errors.quantity && (
										<p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
											{errors.quantity}
										</p>
									)}
								</div>
							</div>
						</section>
					</div>

					{/* Right Column - Sidebar Style */}
					<div className="space-y-12">
						{/* Media Section */}
						<section className="bg-[#1C1917] p-8 lg:p-10 rounded-2xl border border-[#363330] space-y-8">
							<div className="flex items-center gap-4 mb-2">
								<div className="w-1.5 h-1.5 bg-[#86967E] rounded-full"></div>
								<h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#86967E]">
									Botanical Visuals
								</h2>
							</div>

							<div className="space-y-4">
								<ImageUpload
									onUploadSuccess={(url) => {
										setFormData({ ...formData, image: url });
										if (errors.image) setErrors((prev) => ({ ...prev, image: undefined }));
									}}
									onUploadError={(err) => alert(err)}
									defaultValue={formData.image}
								/>
								{errors.image && (
									<p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.image}</p>
								)}
							</div>
						</section>

						{/* Configuration Section */}
						<section className="bg-[#1C1917] p-8 lg:p-10 rounded-2xl border border-[#363330] space-y-8">
							<div className="flex items-center gap-4 mb-2">
								<div className="w-1.5 h-1.5 bg-[#86967E] rounded-full"></div>
								<h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#86967E]">Visibility</h2>
							</div>

							<div className="space-y-6">
								<div
									onClick={() => handleToggle('isBestSeller')}
									className="flex items-center justify-between p-4 bg-[#23211F] rounded-xl border border-[#363330] cursor-pointer group hover:border-[#86967E] transition-all"
								>
									<div className="space-y-1">
										<p className="text-[11px] font-bold uppercase tracking-widest text-[#F9F8F6]">
											Best Seller
										</p>
										<p className="text-[9px] text-[#8A8886] uppercase tracking-tighter">
											Feature on homepage spotlight
										</p>
									</div>
									<div
										className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${formData.isBestSeller ? 'bg-[#86967E]' : 'bg-[#363330]'}`}
									>
										<div
											className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${formData.isBestSeller ? 'left-6' : 'left-1'}`}
										></div>
									</div>
								</div>

								<div
									onClick={() => handleToggle('isActive')}
									className="flex items-center justify-between p-4 bg-[#23211F] rounded-xl border border-[#363330] cursor-pointer group hover:border-[#86967E] transition-all"
								>
									<div className="space-y-1">
										<p className="text-[11px] font-bold uppercase tracking-widest text-[#F9F8F6]">
											Store Active
										</p>
										<p className="text-[9px] text-[#8A8886] uppercase tracking-tighter">
											Make product visible to clients
										</p>
									</div>
									<div
										className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${formData.isActive ? 'bg-[#86967E]' : 'bg-[#363330]'}`}
									>
										<div
											className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${formData.isActive ? 'left-6' : 'left-1'}`}
										></div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</form>
			</div>
		</main>
	);
}
