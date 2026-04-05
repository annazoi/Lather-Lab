'use client';

import React, { useState } from 'react';
import { 
  useElements, 
  useStripe, 
  PaymentElement 
} from '@stripe/react-stripe-js';
import { Loader2, ShieldCheck, CreditCard } from 'lucide-react';

export function CheckoutForm({ 
  orderId,
  total,
  onCancel 
}: { 
  orderId: string;
  total: number;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout?success=true&order_id=${orderId}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Payment ritual failed');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in duration-500">
      <div className="border-b border-stone-200 pb-6">
        <h1 className="text-4xl font-serif text-[#1C1917]">Payment Ritual</h1>
        <p className="text-stone-400 text-xs uppercase tracking-widest mt-2">
          Secure Alchemy for Order #{orderId.slice(-6)}
        </p>
      </div>

      <div className="space-y-8">
         <PaymentElement options={{ 
           layout: 'tabs',
         }} />
         
         {errorMessage && (
           <div className="p-4 bg-red-50 border border-red-100 text-red-500 text-[10px] uppercase font-bold tracking-widest rounded-sm">
             {errorMessage}
           </div>
         )}

         <div className="flex items-center space-x-3 text-[#86967E] bg-[#86967E]/5 p-4 rounded-sm border border-[#86967E]/10">
            <ShieldCheck size={16} />
            <span className="text-[10px] uppercase font-bold tracking-widest">
              Encrypted transaction secured by Stripe
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-4">
        <button
          disabled={isProcessing || !stripe}
          className="w-full bg-[#1C1917] text-white py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#86967E] transition-all duration-500 rounded-sm flex items-center justify-center space-x-4 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>Transmuting Funds...</span>
            </>
          ) : (
            <>
              <CreditCard size={16} />
              <span>Complete Ritual • ${total.toFixed(2)}</span>
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="w-full py-4 text-[10px] uppercase font-bold tracking-widest text-stone-400 hover:text-[#1C1917] transition-all"
        >
          Cancel & Return Home
        </button>
      </div>
    </form>
  );
}
