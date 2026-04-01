'use client';
import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';
import { Product } from '@prisma/client';
import { useCartStore } from '@/store/cart.store';

interface Props {
  product: Product;
}

export default function ProductActionButtons({ product }: Props) {
  const { addItem, onOpen } = useCartStore();
  const [isAdding, setIsAdding] = React.useState(false);
  
  const isOutOfStock = product.quantity === 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    
    // Smooth transition
    setTimeout(() => {
      setIsAdding(false);
      onOpen();
    }, 600);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdding}
        className={`flex-1 flex items-center justify-center space-x-4 px-10 py-5 text-[11px] uppercase font-bold tracking-[0.25em] transition-all duration-500 rounded-sm relative overflow-hidden group
          ${
            isOutOfStock
              ? 'bg-stone-800 text-stone-500 cursor-not-allowed opacity-50'
              : 'bg-[#86967E] text-[#F9F8F6] hover:bg-[#F9F8F6] hover:text-[#1C1917]'
          }`}
      >
        <div className={`flex items-center space-x-4 transition-transform duration-500 ${isAdding ? '-translate-y-12' : 'translate-y-0'}`}>
          <ShoppingBag size={18} />
          <span>{isOutOfStock ? 'Currently Unavailable' : 'Add to Collection'}</span>
        </div>
        
        <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-transform duration-500 ${isAdding ? 'translate-y-0' : 'translate-y-12'}`}>
          <Check size={18} className="text-[#1C1917]" />
          <span className="text-[#1C1917]">Added to Bath</span>
        </div>
      </button>
      <FavoriteButton productId={product.id} />
    </div>
  );
}
