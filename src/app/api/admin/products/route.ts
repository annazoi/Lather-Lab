import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/product.service';
import { productSchema } from '@/validators/admin.schema';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

// Helper to check for Admin role on every request
async function isAdmin() {
    const token = cookies().get('token')?.value;
    const decoded = token ? verifyToken(token) : null;
    return decoded?.role === 'ADMIN';
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const products = await productService.getAllProductsAdmin();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validatedData = await productSchema.validate(body);
    
    // Convert validated data to Prisma input (remove/re-alias as needed)
    const product = await productService.createProduct(validatedData as any);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
