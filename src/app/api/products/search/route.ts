import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/product.service';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const query = searchParams.get('q');

		if (!query || query.length < 3) {
			return NextResponse.json({ products: [] });
		}

		const products = await productService.searchProducts(query);
		return NextResponse.json({ products });
	} catch (error) {
		console.error('[SEARCH_ERROR]:', error);
		return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
	}
}
