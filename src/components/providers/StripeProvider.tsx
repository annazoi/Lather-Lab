'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export function StripeProvider({ 
  children, 
  clientSecret 
}: { 
  children: React.ReactNode; 
  clientSecret: string;
}) {
  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
             colorPrimary: '#1C1917',
             colorBackground: '#ffffff',
             colorText: '#1C1917',
             colorDanger: '#df1b41',
             fontFamily: 'Inter, system-ui, sans-serif',
             spacingUnit: '4px',
             borderRadius: '2px',
          },
        } 
      }}
    >
      {children}
    </Elements>
  );
}
