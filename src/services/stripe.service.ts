import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any, // Using a stable version or as per user rules
});

export class StripeService {
  async createPaymentIntent(amount: number, metadata: Record<string, string>) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amount in cents
        currency: 'usd',
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      };
    } catch (error: any) {
      console.error('[STRIPE_SERVICE_ERROR]: Create PaymentIntent failed', error);
      throw new Error(error.message || 'Could not initialize payment');
    }
  }

  async verifyWebhook(body: string, signature: string) {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET is missing');
    }

    try {
      return stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error: any) {
      console.error('[STRIPE_WEBHOOK_ERROR]: Signature verification failed', error.message);
      throw new Error(`Webhook Error: ${error.message}`);
    }
  }
}

export const stripeService = new StripeService();
