'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ImageUpload } from '@/components/ImageUpload';
import { productSchema } from '@/validators/admin.schema';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
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
    discount: 0
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
          discount: data.discount || 0
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
        discount: formData.discount === 0 ? null : formData.discount
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

  if (loading) return <div className="text-[#86967E] text-[10px] uppercase font-bold tracking-widest animate-pulse">Retrieving Product Data...</div>;

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <Link href="/dashboard/products" className="flex items-center space-x-2 text-[#86967E] hover:text-white transition-colors mb-6 text-[10px] uppercase font-bold tracking-widest">
            <ArrowLeft size={14} />
            <span>Return to Catalogue</span>
          </Link>
          <h1 className="text-4xl font-serif mb-2 text-[#F9F8F6]">Edit Product: {formData.name}</h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#86967E] font-bold">Modifying Catalogue Entity</p>
        </div>
      </header>

      <div className="bg-[#1C1917] border border-[#363330] rounded-xl p-12 shadow-2xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">Product Name</label>
              <input 
                type="text" 
                value={formData.name}
                required
                className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.price}
                  required
                  className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">Stock Quantity</label>
                <input 
                  type="number" 
                  value={formData.quantity}
                  required
                  min="0"
                  className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">Category</label>
                <select 
                  value={formData.category}
                  className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors appearance-none cursor-pointer"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Purifying & Balancing">Purifying</option>
                  <option value="Deep Cleanse & Detox">Detox</option>
                  <option value="Soothing & Nourishing">Nourishing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">Discount (%)</label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={formData.discount}
                  className="w-full bg-transparent border-b border-[#363330] py-3 text-[#F9F8F6] font-sans focus:border-[#86967E] outline-none transition-colors"
                  onChange={(e) => setFormData({...formData, discount: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4 pt-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 rounded border-[#363330] bg-transparent text-[#86967E] focus:ring-offset-0 focus:ring-0 cursor-pointer"
                />
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#8A8886] group-hover:text-white transition-colors">Active Status (Visible to customers)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({...formData, isBestSeller: e.target.checked})}
                  className="w-4 h-4 rounded border-[#363330] bg-transparent text-[#86967E] focus:ring-offset-0 focus:ring-0 cursor-pointer"
                />
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#8A8886] group-hover:text-white transition-colors">Best Seller Highlight</span>
              </label>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E]">Current Image</label>
              <div className="relative w-full h-48 rounded bg-[#2D2A28] overflow-hidden group">
                <Image 
                  src={formData.image || '/images/placeholder.png'} 
                  alt="Preview" 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#86967E] mt-6 block">Replace Image</label>
              <ImageUpload 
                onUploadSuccess={(url) => setFormData({...formData, image: url})}
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
    </div>
  );
}
