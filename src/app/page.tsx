import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Collections } from '@/components/Collections';
import { Ingredients } from '@/components/Ingredients';
import { Testimonials } from '@/components/Testimonials';
import { productService } from '@/services/product.service';
import { Product } from '@prisma/client';

import { PRODUCT_SORT_OPTIONS } from '@/config/product-sort.config';
import { ProductSort } from '@/types/product';

export const dynamic = 'force-dynamic';

interface HomePageProps {
	searchParams: {
		sort?: string;
		category?: string;
	};
}

export default async function Home({ searchParams }: HomePageProps) {
	const currentSort = Object.values(PRODUCT_SORT_OPTIONS).includes(searchParams?.sort as any)
		? (searchParams?.sort as ProductSort)
		: PRODUCT_SORT_OPTIONS.LATEST;
	const currentCategory = searchParams?.category;

	let products: Product[] = [];
	try {
		products = await productService.fetchProducts({ sort: currentSort, category: currentCategory });
		// On home page we might still want to limit or just show what's filtered
		// If no category is selected, we could show only the latest 3, but the user asked for "same thing"
		if (!currentCategory && currentSort === PRODUCT_SORT_OPTIONS.LATEST) {
			products = products.slice(0, 3);
		}
	} catch (error) {
		console.error('[BUILD_ERROR]: Failed to fetch products. Falling back to empty list.', error);
	}

	return (
		<main className="bg-stone-50">
			<Hero />
			<Features />
			<Collections 
				products={products} 
				currentSort={currentSort}
				currentCategory={currentCategory}
				searchParams={searchParams}
			/>
			<Ingredients />
			<Testimonials />
		</main>
	);
}
