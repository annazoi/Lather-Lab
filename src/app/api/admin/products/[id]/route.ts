import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/product.service';
import { productSchema } from '@/validators/admin.schema';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

async function isAdmin() {
    const token = cookies().get('token')?.value;
    const decoded = token ? verifyToken(token) : null;
    return decoded?.role === 'ADMIN';
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const product = await productService.getProduct(params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validatedData = await productSchema.validate(body);
    const updated = await productService.updateProduct(params.id, validatedData as any);
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const deleted = await productService.deleteProduct(params.id);
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
