import { prisma } from '@/lib/prisma';
import { Prisma, Product } from '@prisma/client';

export class ProductRepository {
	async getProducts(options: Prisma.ProductFindManyArgs): Promise<Product[]> {
		return prisma.product.findMany(options);
	}

	async getProductById(id: string): Promise<Product | null> {
		return prisma.product.findUnique({
			where: { id },
		});
	}

	async countProducts(where?: Prisma.ProductWhereInput): Promise<number> {
		return prisma.product.count({ where });
	}
}

export const productRepository = new ProductRepository();
