import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/services/order.service';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { OrderStatus } from '@prisma/client';

async function isAdmin() {
    const token = cookies().get('token')?.value;
    const decoded = token ? verifyToken(token) : null;
    return decoded?.role === 'ADMIN';
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { status } = body;

    if (!Object.values(OrderStatus).includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = await orderService.updateStatus(params.id, status as OrderStatus);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('[ADMIN_ORDER_PATCH_ERROR]:', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
