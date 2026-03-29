import { prisma } from '@/lib/prisma';
import { Prisma, Product } from '@prisma/client';

export class ProductRepository {
	async getProducts(options: Prisma.ProductFindManyArgs): Promise<Product[]> {
		return prisma.product.findMany(options);
	}

  async getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return prisma.product.update({ 
      where: { id },
      data 
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return prisma.product.delete({ where: { id } });
  }

  async countProducts(where?: Prisma.ProductWhereInput): Promise<number> {
    return prisma.product.count({ where });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        isActive: true,
      },
    });
  }
}

export const productRepository = new ProductRepository();
