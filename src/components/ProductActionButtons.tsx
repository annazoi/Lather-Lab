'use client';
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';

interface Props {
  productId: string;
  isOutOfStock: boolean;
}

export default function ProductActionButtons({ productId, isOutOfStock }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        disabled={isOutOfStock}
        className={`flex-1 flex items-center justify-center space-x-4 px-10 py-5 text-[11px] uppercase font-bold tracking-[0.25em] transition-all duration-500 ${
          isOutOfStock
            ? 'bg-stone-800 text-stone-500 cursor-not-allowed opacity-50'
            : 'bg-[#86967E] text-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#1C1917]'
        }`}
      >
        <ShoppingBag size={18} />
        <span>{isOutOfStock ? 'Currently Unavailable' : 'Add to Collection'}</span>
      </button>
      <FavoriteButton productId={productId} />
    </div>
  );
}
