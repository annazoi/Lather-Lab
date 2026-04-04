export const PRODUCT_SORT_OPTIONS = {
  LATEST: 'latest',
  OLDEST: 'oldest',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const;

export type ProductSortType = (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS];

export const PRODUCT_SORT_LABELS: Record<ProductSortType, string> = {
  [PRODUCT_SORT_OPTIONS.LATEST]: 'Newest Arrivals',
  [PRODUCT_SORT_OPTIONS.OLDEST]: 'Oldest First',
  [PRODUCT_SORT_OPTIONS.PRICE_ASC]: 'Price: Low to High',
  [PRODUCT_SORT_OPTIONS.PRICE_DESC]: 'Price: High to Low',
  [PRODUCT_SORT_OPTIONS.NAME_ASC]: 'Name: A-Z',
  [PRODUCT_SORT_OPTIONS.NAME_DESC]: 'Name: Z-A',
};
