import { productRepository } from '@/repositories/product.repository';
import { Product } from '@prisma/client';

export class DiscountService {
  async applyDiscount(productId: string, percentage: number): Promise<Product> {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }

    return productRepository.updateProduct(productId, {
      discount: percentage
    });
  }

  async removeDiscount(productId: string): Promise<Product> {
    return productRepository.updateProduct(productId, {
      discount: null
    });
  }
}

export const discountService = new DiscountService();
