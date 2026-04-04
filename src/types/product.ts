import { ProductSortType } from '@/config/product-sort.config';

export type ProductSort = ProductSortType;

export interface ProductFilters {
  category?: string;
  sort?: ProductSort | string;
}
