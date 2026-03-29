import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Collections } from '@/components/Collections';
import { Ingredients } from '@/components/Ingredients';
import { Testimonials } from '@/components/Testimonials';

export default function Home() {
	return (
		<main className="bg-stone-50">
			<Hero />
			<Features />
			<Collections />
			<Ingredients />
			<Testimonials />
		</main>
	);
}
