import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Collections } from '@/components/Collections';
import { Ingredients } from '@/components/Ingredients';
import { Testimonials } from '@/components/Testimonials';
import { productService } from '@/services/product.service';

export default async function Home() {
	const latestProducts = await productService.getLatestProducts(3);

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
