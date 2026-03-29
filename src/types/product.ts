export type ProductSort = 'price_asc' | 'price_desc' | 'name_asc';

export interface ProductFilters {
  category?: string;
  sort?: ProductSort | string;
}
