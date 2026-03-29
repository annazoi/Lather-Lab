'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';
import { productSchema } from '@/validators/admin.schema';

export default function NewProductPage() {
	const [formData, setFormData] = useState({
		name: '',
		price: 0,
		category: '',
		image: '',
		isActive: true,
		isBestSeller: false,
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await productSchema.validate(formData);

			const response = await fetch('/api/admin/products', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error('Failed to create product');

			router.push('/dashboard/products');
			router.refresh();
		} catch (err: any) {
			alert(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl">
			<header className="mb-12">
				<h1 className="text-4xl font-serif mb-2 text-[#F9F8F6]">Add New Product</h1>
				<p className="text-[11px] uppercase tracking-[0.2em] text-[#86967E] font-bold">Catalogue Expansion</p>
			</header>

			<div className="bg-[#1C1917] border border-[#363330] rounded-xl p-12">
				<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
					<div className="space-y-8">
						<div className="space-y-2">
							<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
								Product Name
							</label>
							<input
								type="text"
								required
								className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							/>
						</div>

						<div className="grid grid-cols-2 gap-8">
							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Price ($)
								</label>
								<input
									type="number"
									step="0.01"
									required
									className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
									onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
								/>
							</div>
							<div className="space-y-2">
								<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
									Category
								</label>
								<select
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

						<div className="flex items-center space-x-6 pt-4">
							<label className="flex items-center space-x-3 cursor-pointer group">
								<input
									type="checkbox"
									checked={formData.isActive}
									onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
									className="w-4 h-4 rounded border-[#363330] bg-transparent text-[#86967E] focus:ring-offset-0 focus:ring-0 cursor-pointer"
								/>
								<span className="text-[11px] uppercase font-bold tracking-widest text-[#8A8886] group-hover:text-white transition-colors">
									Active Status
								</span>
							</label>
						</div>
					</div>

					<div className="space-y-8">
						<div className="space-y-2">
							<label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">
								Product Visual
							</label>
							<ImageUpload
								onUploadSuccess={(url) => setFormData({ ...formData, image: url })}
								onUploadError={(err) => alert(err)}
							/>
						</div>

						<div className="pt-10">
							<button
								type="submit"
								disabled={loading}
								className="w-full bg-[#86967E] text-white py-5 font-bold uppercase tracking-[0.25em] text-[11px] hover:bg-white hover:text-[#1C1917] transition-all disabled:opacity-50"
							>
								{loading ? 'Transmitting Data...' : 'Save Product'}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
