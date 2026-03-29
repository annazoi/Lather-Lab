import { NextRequest, NextResponse } from 'next/server';
import { discountService } from '@/services/discount.service';
import { discountSchema } from '@/validators/admin.schema';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

async function isAdmin() {
    const token = cookies().get('token')?.value;
    const decoded = token ? verifyToken(token) : null;
    return decoded?.role === 'ADMIN';
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { productId, percentage } = await discountSchema.validate(body);
    const updated = await discountService.applyDiscount(productId, percentage);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const productId = req.nextUrl.searchParams.get('productId');
    if (!productId) throw new Error('Product ID required');
    const updated = await discountService.removeDiscount(productId);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
