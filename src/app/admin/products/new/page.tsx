'use client';

import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    image: '',
    isBestSeller: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    try {
      // Example of saving to DB via an API route (not implemented here)
      // await fetch('/api/products', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // });
      console.log('Would save this product to DB:', formData);
      alert('Product created (simulated)! Check console.');
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-12 bg-[#23211F] min-h-screen text-stone-50">
      <h1 className="text-3xl font-serif mb-12">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#86967E]">
            Product Name
          </label>
          <input 
            type="text" 
            required
            className="w-full bg-transparent border-b border-[#363330] py-2 focus:border-[#86967E] outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <ImageUpload 
          onUploadSuccess={(url) => setFormData({...formData, image: url})} 
          onUploadError={(err) => alert(err)}
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#86967E] text-white py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
