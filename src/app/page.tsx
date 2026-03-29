import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Collections } from '@/components/Collections';
import { Ingredients } from '@/components/Ingredients';
import { Testimonials } from '@/components/Testimonials';
import { productService } from '@/services/product.service';
import { Product } from '@prisma/client';

export default async function Home() {
	let latestProducts: Product[] = [];
	try {
		latestProducts = await productService.getLatestProducts(3);
	} catch (error) {
		console.error('[BUILD_ERROR]: Failed to fetch products during build. Falling back to empty list.', error);
	}

	return (
		<main className="bg-stone-50">
			<Hero />
			<Features />
			<Collections products={latestProducts} />
			<Ingredients />
			<Testimonials />
		</main>
	);
}
