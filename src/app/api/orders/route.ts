import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { orderService } from '@/services/order.service';

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

    const { items, total, shippingName, shippingAddress, shippingCity, shippingPhone } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const order = await orderService.create({
      userId: payload.userId,
      total,
      shippingName,
      shippingAddress,
      shippingCity,
      shippingPhone,
      items: items.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error: any) {
    console.error('[ORDERS_API_ERROR]:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
