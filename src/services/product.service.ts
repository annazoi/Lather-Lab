import { productRepository } from '@/repositories/product.repository';
import { Prisma, Product } from '@prisma/client';
import { ProductFilters, ProductSort } from '@/types/product';

export class ProductService {
  async fetchProducts(filters: ProductFilters): Promise<Product[]> {
    try {
      const queryOptions: Prisma.ProductFindManyArgs = {
        where: { isActive: true } // Default to only active products
      };
      
      const { category, sort } = filters;

      if (category) {
        queryOptions.where = {
          ...queryOptions.where,
          category: decodeURIComponent(category),
        };
      }

      // Special sorting handling for price (must include discount calculation)
      if (sort === 'name_asc') queryOptions.orderBy = { name: 'asc' };
      else if (sort === 'name_desc') queryOptions.orderBy = { name: 'desc' };
      else if (sort === 'latest') queryOptions.orderBy = { createdAt: 'desc' };
      else if (sort === 'oldest') queryOptions.orderBy = { createdAt: 'asc' };
      else if (sort !== 'price_asc' && sort !== 'price_desc') {
        queryOptions.orderBy = { createdAt: 'desc' }; // Default sort order
      }
      
      let products = await productRepository.getProducts(queryOptions);

      // In-memory sorting for effective price
      if (sort === 'price_asc' || sort === 'price_desc') {
        products.sort((a, b) => {
          const aPrice = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const bPrice = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return sort === 'price_asc' ? aPrice - bPrice : bPrice - aPrice;
        });
      }

      return products;
    } catch (error) {
      console.error('[PRODUCT_SERVICE_ERROR]: Fetch products failed', error);
      throw new Error('Could not fetch products');
    }
  }

  async getLatestProducts(limit: number = 3): Promise<Product[]> {
    return productRepository.getProducts({
      where: { isActive: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllProductsAdmin(): Promise<Product[]> {
    return productRepository.getProducts({
      orderBy: { createdAt: 'desc' }
    });
  }
  
  async getDiscountedProducts(): Promise<Product[]> {
    return productRepository.getProducts({
      where: {
        discount: {
          gt: 0
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return productRepository.createProduct(data);
  }

  async updateProduct(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return productRepository.updateProduct(id, data);
  }

  async deleteProduct(id: string): Promise<Product> {
    return productRepository.deleteProduct(id);
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      return await productRepository.getProductById(id);
    } catch (error) {
      console.error('[PRODUCT_SERVICE_ERROR]: Get product failed', error);
      throw new Error('Could not fetch product details');
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      return await productRepository.searchProducts(query);
    } catch (error) {
      console.error('[PRODUCT_SERVICE_ERROR]: Search products failed', error);
      throw new Error('Search failed');
    }
  }
}

export const productService = new ProductService();
