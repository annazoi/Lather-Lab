import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@prisma/client';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      addItem: (product: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          return set({
            items: currentItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        }

        set({ items: [...currentItems, { ...product, quantity: 1 }] });
      },
      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          return get().removeItem(productId);
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = Number(item.price);
          const effectivePrice = item.discount ? price * (1 - item.discount / 100) : price;
          return total + effectivePrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
