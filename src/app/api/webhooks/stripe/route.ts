import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '@/services/stripe.service';
import { orderService } from '@/services/order.service';
import { OrderStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  try {
    const event = await stripeService.verifyWebhook(body, signature);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      const orderId = paymentIntent.metadata.orderId;

      if (orderId) {
        console.log(`[STRIPE_WEBHOOK]: Payment succeeded for order ${orderId}`);
        await orderService.updatePaymentStatus(orderId, 'paid', OrderStatus.CONFIRMED);
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
       const paymentIntent = event.data.object as any;
       const orderId = paymentIntent.metadata.orderId;

       if (orderId) {
          console.log(`[STRIPE_WEBHOOK]: Payment failed for order ${orderId}`);
          await orderService.updatePaymentStatus(orderId, 'failed', OrderStatus.CANCELLED);
          // Note: OrderRepository.updateStatus(CANCELLED) will restore inventory automatically.
       }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('[STRIPE_WEBHOOK_ERROR]:', error.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}
