import { NextRequest, NextResponse } from 'next/server';
import { favoriteService } from '@/services/favorite.service';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function GET() {
	const token = cookies().get('token')?.value;
	const decoded = token ? (verifyToken(token) as { userId: string }) : null;

	if (!decoded) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const favorites = await favoriteService.getFavorites(decoded.userId);
		return NextResponse.json(favorites);
	} catch (error) {
		return NextResponse.json({ error: 'Failed' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const token = cookies().get('token')?.value;
	const decoded = token ? (verifyToken(token) as { userId: string }) : null;

	if (!decoded) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { productId } = await req.json();

		if (!productId) {
			return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
		}

		const result = await favoriteService.toggleFavorite(decoded.userId, productId);
		return NextResponse.json(result);
	} catch (error) {
		return NextResponse.json({ error: 'Failed' }, { status: 500 });
	}
}
