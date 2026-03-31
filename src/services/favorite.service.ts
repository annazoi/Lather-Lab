import { favoriteRepository } from '@/repositories/favorite.repository';

export class FavoriteService {
	async getFavorites(userId: string) {
		const favorites = await favoriteRepository.getFavorites(userId);
		// Compute salePrice for discounted products
		return favorites.map((f) => {
			const product = f.product;
			const salePrice = product.discount ? product.price * (1 - product.discount / 100) : null;
			return { ...product, salePrice };
		});
	}

	async toggleFavorite(userId: string, productId: string) {
		const exists = await favoriteRepository.getFavorite(userId, productId);

		if (exists) {
			await favoriteRepository.removeFavorite(userId, productId);
			return { isFavorite: false };
		} else {
			await favoriteRepository.addFavorite(userId, productId);
			return { isFavorite: true };
		}
	}

	async isFavorite(userId: string, productId: string) {
		const exists = await favoriteRepository.getFavorite(userId, productId);
		return !!exists;
	}
}

export const favoriteService = new FavoriteService();
