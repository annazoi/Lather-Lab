import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { stripeService } from '@/services/stripe.service';
import { orderService } from '@/services/order.service';
import { productService } from '@/services/product.service';
import { productRepository } from '@/repositories/product.repository';

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get('token')?.value;
		if (!token) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const payload = verifyToken(token);
		if (!payload) {
			return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
		}

		const { items, shippingName, shippingAddress, shippingCity, shippingPhone } = await req.json();

		if (!items || items.length === 0) {
			return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
		}

		// 1. Validate prices and stock server-side
		const productIds = items.map((item: any) => item.id);
		const dbProducts = await productRepository.getProductsByIds(productIds);

		let serverTotal = 0;
		const orderItems = [];

		for (const item of items) {
			const product = dbProducts.find((p) => p.id === item.id);
			if (!product || !product.isActive) {
				return NextResponse.json({ error: `Product ${item.name} is no longer available` }, { status: 400 });
			}

			if (product.quantity < item.quantity) {
				return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 });
			}

			const effectivePrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

			serverTotal += effectivePrice * item.quantity;
			orderItems.push({
				productId: product.id,
				quantity: item.quantity,
				price: effectivePrice,
			});
		}

		// 2. Create a PENDING order in the database
		const order = await orderService.create({
			userId: payload.userId,
			total: serverTotal,
			shippingName,
			shippingAddress,
			shippingCity,
			shippingPhone,
			items: orderItems,
		});

		// 3. Create Stripe PaymentIntent
		const { clientSecret, id: paymentIntentId } = await stripeService.createPaymentIntent(serverTotal, {
			orderId: order.id,
			userId: payload.userId,
		});

		// 4. Update order with PaymentIntent ID
		await orderService.updatePaymentIntent(order.id, paymentIntentId);

		return NextResponse.json(
			{
				success: true,
				clientSecret,
				orderId: order.id,
			},
			{ status: 201 },
		);
	} catch (error: any) {
		console.error('[CREATE_INTENT_ERROR]:', error);
		return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
		// return NextResponse.json({ error: error.message || 'Payment initialization failed' }, { status: 500 });
	}
}
