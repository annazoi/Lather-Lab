import { productRepository } from '@/repositories/product.repository';
import { Prisma, Product } from '@prisma/client';
import { ProductFilters, ProductSort } from '@/types/product';

export class ProductService {
  async fetchProducts(filters: ProductFilters): Promise<Product[]> {
    try {
      const queryOptions: Prisma.ProductFindManyArgs = {};
      const { category, sort } = filters;

      // Handle Category Filter
      if (category) {
        queryOptions.where = {
          category: decodeURIComponent(category),
        };
      }

      // Handle Sorting Logic
      if (sort === 'price_asc') {
        queryOptions.orderBy = { price: 'asc' };
      } else if (sort === 'price_desc') {
        queryOptions.orderBy = { price: 'desc' };
      } else if (sort === 'name_asc') {
        queryOptions.orderBy = { name: 'asc' };
      }

      const products = await productRepository.getProducts(queryOptions);
      return products;
    } catch (error) {
      console.error('[PRODUCT_SERVICE_ERROR]: Fetch products failed', error);
      throw new Error('Could not fetch products');
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      return await productRepository.getProductById(id);
    } catch (error) {
      console.error('[PRODUCT_SERVICE_ERROR]: Get product failed', error);
      throw new Error('Could not fetch product details');
    }
  }
}

export const productService = new ProductService();
