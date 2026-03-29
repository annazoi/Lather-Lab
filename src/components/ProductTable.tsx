'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductTableProps {
  products: any[];
}

export function ProductTable({ products: initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to proceed with deleting "${name}"? This action cannot be reversed.`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete product');

      // Update local state for immediate feedback
      setProducts(products.filter(p => p.id !== id));
      router.refresh();
    } catch (err) {
      alert('Deletion failed. Please ensure the product is not linked to existing orders.');
    }
  };

  return (
    <div className="bg-[#1C1917] border border-[#363330] rounded-xl overflow-hidden shadow-2xl animate-in fade-in duration-1000">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#363330] bg-[#23211F]/50">
            <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold">Catalogue Item</th>
            <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold">Classification</th>
            <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold">Valuation</th>
            <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold">Visibility</th>
            <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold text-right">Modifiers</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#363330]">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-white/[0.03] transition-all group">
              <td className="px-10 py-7">
                <div className="flex items-center space-x-5">
                  <div className="relative w-14 h-14 rounded bg-[#2D2A28] overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image 
                      src={product.image || '/images/placeholder.png'} 
                      alt={product.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-[#F9F8F6] text-lg block">{product.name}</span>
                    <span className="text-[10px] text-stone-500 font-sans tracking-widest uppercase">ID: {product.id.slice(-6)}</span>
                  </div>
                </div>
              </td>
              <td className="px-10 py-7">
                <span className="text-[11px] font-sans text-stone-400 uppercase tracking-widest">{product.category}</span>
              </td>
              <td className="px-10 py-7">
                <div className="flex flex-col">
                  <span className="text-[#F9F8F6] font-[800] tracking-wider font-sans">${product.price.toFixed(2)}</span>
                  {product.discount && (
                    <span className="text-[10px] text-red-400 font-bold tracking-widest uppercase mt-1">-{product.discount}% OFF</span>
                  )}
                </div>
              </td>
              <td className="px-10 py-7">
                <span className={`px-4 py-1.5 text-[9px] uppercase font-bold tracking-widest rounded-full border ${product.isActive ? 'border-green-900/30 bg-green-900/10 text-green-400' : 'border-red-900/30 bg-red-900/10 text-red-500'}`}>
                  {product.isActive ? 'Public' : 'Archived'}
                </span>
                {product.isBestSeller && (
                  <span className="block mt-2 text-[8px] uppercase tracking-[0.2em] text-[#86967E] font-bold">★ Best Seller</span>
                )}
              </td>
              <td className="px-10 py-7 text-right">
                <div className="flex justify-end space-x-6">
                  <Link 
                    href={`/dashboard/products/${product.id}`} 
                    className="p-3 text-stone-500 hover:text-white hover:bg-[#2D2A28] rounded-full transition-all"
                    title="Edit Entity"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-3 text-stone-500 hover:text-red-500 hover:bg-red-900/10 rounded-full transition-all"
                    title="Delete Entity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-10 py-20 text-center text-stone-500">
                <p className="font-serif text-xl italic mb-2">The catalogue is currently vacant.</p>
                <p className="text-[10px] uppercase tracking-widest">Add items to begin management</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
