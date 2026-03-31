import { prisma } from '@/lib/prisma';
import { Favorite, Prisma } from '@prisma/client';

export class FavoriteRepository {
	async getFavorites(userId: string): Promise<any[]> {
		return prisma.favorite.findMany({
			where: { userId },
			include: {
				product: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	async getFavorite(userId: string, productId: string): Promise<Favorite | null> {
		return prisma.favorite.findUnique({
			where: {
				userId_productId: {
					userId,
					productId,
				},
			},
		});
	}

	async addFavorite(userId: string, productId: string): Promise<Favorite> {
		return prisma.favorite.create({
			data: {
				userId,
				productId,
			},
		});
	}

	async removeFavorite(userId: string, productId: string): Promise<Favorite> {
		return prisma.favorite.delete({
			where: {
				userId_productId: {
					userId,
					productId,
				},
			},
		});
	}
}

export const favoriteRepository = new FavoriteRepository();
