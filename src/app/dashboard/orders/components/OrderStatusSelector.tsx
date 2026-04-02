'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronDown } from 'lucide-react';
import { OrderStatus } from '@prisma/client';

interface StatusSelectorProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'PENDING', label: 'Pending', color: 'text-amber-500 border-amber-500/20 bg-amber-500/5' },
  { value: 'CONFIRMED', label: 'Confirmed', color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' },
  { value: 'PREPARATION', label: 'Preparation', color: 'text-sky-500 border-sky-500/20 bg-sky-500/5' },
  { value: 'SHIPPED', label: 'In Transit', color: 'text-indigo-500 border-indigo-500/20 bg-indigo-500/5' },
  { value: 'DELIVERED', label: 'Delivered', color: 'text-green-500 border-green-500/20 bg-green-500/5' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'text-rose-500 border-rose-500/20 bg-rose-500/5' },
];

export default function OrderStatusSelector({ orderId, currentStatus }: StatusSelectorProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (newStatus === currentStatus) return;
    
    setLoading(true);
    setIsOpen(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  const activeStatus = statusOptions.find(s => s.value === currentStatus) || statusOptions[0];

  return (
    <div className={`relative inline-block text-left min-w-[140px] ${isOpen ? 'z-50' : 'z-auto'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`px-4 py-1.5 rounded-full border text-[9px] uppercase font-[900] tracking-widest leading-none flex items-center justify-between w-full transition-all hover:bg-white/[0.05] disabled:opacity-50 ${activeStatus.color}`}
      >
        <span className="flex items-center">
          {loading && <Loader2 size={10} className="animate-spin mr-2" />}
          {activeStatus.label}
        </span>
        <ChevronDown size={10} className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full origin-top-right rounded-lg bg-[#23211F] border border-[#363330] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="py-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={`block w-full text-left px-4 py-2.5 text-[9px] uppercase font-[900] tracking-widest leading-none hover:bg-white/[0.05] transition-colors ${
                  currentStatus === option.value ? 'bg-white/[0.03] text-[#F9F8F6]' : 'text-stone-500'
                }`}
              >
                <span className={currentStatus === option.value ? activeStatus.color.split(' ')[0] : ''}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
