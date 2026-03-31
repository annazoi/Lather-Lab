import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().min(0, 'Price must be non-negative').required('Price is required'),
  category: yup.string().required('Category is required'),
  image: yup.string().required('Image path or URL is required'),
  isActive: yup.boolean().default(true),
  isBestSeller: yup.boolean().default(false),
  quantity: yup.number().min(0, 'Quantity must be non-negative').default(0),
  discount: yup.number().min(0).max(100).nullable().default(0),
  description: yup.string().required('Description is required'),
});

export const discountSchema = yup.object().shape({
  productId: yup.string().required('Product ID is required'),
  percentage: yup.number().min(0).max(100).required('Discount percentage is required'),
});

export type ProductInput = yup.InferType<typeof productSchema>;
export type DiscountInput = yup.InferType<typeof discountSchema>;
