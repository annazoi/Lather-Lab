import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/services/order.service';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

async function isAdmin() {
    const token = cookies().get('token')?.value;
    const decoded = token ? verifyToken(token) : null;
    return decoded?.role === 'ADMIN';
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const orders = await orderService.getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
