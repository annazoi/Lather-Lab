'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductTableProps {
  products: any[];
}

export function ProductTable({ products: initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) throw new Error('Failed to update quantity');

      const updatedProduct = await res.json();
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
    } catch (err) {
      alert('Failed to update quantity');
    } finally {
      setUpdatingId(null);
    }
  };

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
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left border-collapse lg:min-w-full">
          <thead>
            <tr className="border-b border-[#363330] bg-[#23211F]/50">
              <th className="px-6 md:px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold whitespace-nowrap">Catalogue Item</th>
              <th className="px-6 md:px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold whitespace-nowrap">Classification</th>
              <th className="px-6 md:px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold whitespace-nowrap">Valuation</th>
              <th className="px-6 md:px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold whitespace-nowrap text-center">Inventory</th>
              <th className="px-6 md:px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold whitespace-nowrap">Visibility</th>
              <th className="px-6 md:px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#86967E] font-bold text-right whitespace-nowrap">Modifiers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#363330]">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.03] transition-all group">
                <td className="px-6 md:px-10 py-7">
                  <div className="flex items-center space-x-5">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded bg-[#2D2A28] overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image 
                        src={product.image || '/images/placeholder.png'} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-serif text-[#F9F8F6] text-base md:text-lg block">{product.name}</span>
                      <span className="text-[9px] md:text-[10px] text-stone-500 font-sans tracking-widest uppercase">ID: {product.id.slice(-6)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 md:px-10 py-7">
                  <span className="text-[10px] md:text-[11px] font-sans text-stone-400 uppercase tracking-widest">{product.category}</span>
                </td>
                <td className="px-6 md:px-10 py-7">
                  <div className="flex flex-col">
                    <span className="text-[#F9F8F6] font-[800] tracking-wider font-sans text-sm md:text-base">${product.price.toFixed(2)}</span>
                    {product.discount && (
                      <span className="text-[9px] md:text-[10px] text-red-400 font-bold tracking-widest uppercase mt-1">-{product.discount}% OFF</span>
                    )}
                  </div>
                </td>
                <td className="px-6 md:px-10 py-7">
                  <div className="flex items-center justify-center space-x-3 bg-[#23211F] rounded-full px-4 py-2 border border-[#363330] w-fit mx-auto">
                    <button
                      onClick={() => handleUpdateQuantity(product.id, (product.quantity || 0) - 1)}
                      disabled={updatingId === product.id || (product.quantity || 0) <= 0}
                      className="text-[#86967E] hover:text-red-400 transition-colors disabled:opacity-30"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <div className="min-w-[40px] text-center">
                      {updatingId === product.id ? (
                        <Loader2 size={16} className="animate-spin text-[#86967E] mx-auto" />
                      ) : (
                        <span className={`font-mono text-sm font-bold ${product.quantity === 0 ? 'text-red-500' : 'text-[#F9F8F6]'}`}>
                          {product.quantity || 0}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleUpdateQuantity(product.id, (product.quantity || 0) + 1)}
                      disabled={updatingId === product.id}
                      className="text-[#86967E] hover:text-[#DCE8D5] transition-colors disabled:opacity-30"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {product.quantity === 0 && (
                    <span className="block mt-2 text-[8px] text-center uppercase tracking-[0.2em] text-red-500/70 font-bold">Out of stock</span>
                  )}
                </td>
                <td className="px-6 md:px-10 py-7">
                  <span className={`px-4 py-1.5 text-[8px] md:text-[9px] uppercase font-bold tracking-widest rounded-full border ${product.isActive ? 'border-green-900/30 bg-green-900/10 text-green-400' : 'border-red-900/30 bg-red-900/10 text-red-500'}`}>
                    {product.isActive ? 'Public' : 'Archived'}
                  </span>
                  {product.isBestSeller && (
                    <span className="block mt-2 text-[8px] uppercase tracking-[0.2em] text-[#86967E] font-bold">★ Best Seller</span>
                  )}
                </td>
                <td className="px-6 md:px-10 py-7 text-right">
                  <div className="flex justify-end space-x-3 md:space-x-6">
                    <Link 
                      href={`/dashboard/products/${product.id}`} 
                      className="p-2 md:p-3 text-stone-500 hover:text-white hover:bg-[#2D2A28] rounded-full transition-all"
                      title="Edit Entity"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 md:p-3 text-stone-500 hover:text-red-500 hover:bg-red-900/10 rounded-full transition-all"
                      title="Delete Entity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col divide-y divide-[#363330]">
        {products.map((product) => (
          <div key={product.id} className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded bg-[#2D2A28] overflow-hidden flex-shrink-0">
                <Image 
                  src={product.image || '/images/placeholder.png'} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-serif text-[#F9F8F6] text-lg">{product.name}</h3>
                  <span className="text-[#F9F8F6] font-bold tracking-wider font-sans">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-stone-500 font-sans tracking-widest uppercase">{product.category}</p>
              </div>
            </div>

            <div className="flex justify-between items-center bg-[#23211F]/30 p-4 rounded-lg">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-[8px] uppercase font-bold tracking-widest rounded-full border ${product.isActive ? 'border-green-900/30 bg-green-900/10 text-green-400' : 'border-red-900/30 bg-red-900/10 text-red-500'}`}>
                    {product.isActive ? 'Public' : 'Archived'}
                  </span>
                  {product.isBestSeller && (
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#86967E] font-bold">★ Best Seller</span>
                  )}
                </div>
                
                {/* Quantity Controls Mobile */}
                <div className="flex items-center space-x-4 bg-[#1C1917] rounded-full px-3 py-1.5 border border-[#363330] w-fit">
                    <button
                      onClick={() => handleUpdateQuantity(product.id, (product.quantity || 0) - 1)}
                      disabled={updatingId === product.id || (product.quantity || 0) <= 0}
                      className="text-[#86967E] disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>
                    
                    <div className="min-w-[24px] text-center">
                      {updatingId === product.id ? (
                        <Loader2 size={12} className="animate-spin text-[#86967E]" />
                      ) : (
                        <span className={`text-xs font-bold ${product.quantity === 0 ? 'text-red-500' : 'text-[#F9F8F6]'}`}>
                          {product.quantity || 0}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleUpdateQuantity(product.id, (product.quantity || 0) + 1)}
                      disabled={updatingId === product.id}
                      className="text-[#86967E] disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Link 
                  href={`/dashboard/products/${product.id}`} 
                  className="p-2 text-stone-500 hover:text-white"
                >
                  <Edit2 size={16} />
                </Link>
                <button 
                  onClick={() => handleDelete(product.id, product.name)}
                  className="p-2 text-stone-500 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="p-20 text-center text-stone-500">
          <p className="font-serif text-xl italic mb-2">The catalogue is currently vacant.</p>
          <p className="text-[10px] uppercase tracking-widest">Add items to begin management</p>
        </div>
      )}
    </div>
  );
}
