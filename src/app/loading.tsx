import { HeroSkeleton } from '@/components/HeroSkeleton';
import { CollectionsSkeleton } from '@/components/CollectionsSkeleton';

export default function RootLoading() {
	return (
		<main className="min-h-screen pt-20 bg-white">
			<HeroSkeleton />
			<CollectionsSkeleton />
			<section className="py-24 bg-stone-50">
				<div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
					<div className="h-40 w-full bg-stone-100 animate-pulse rounded-xl" />
					<div className="h-80 w-full bg-stone-100 animate-pulse rounded-xl" />
				</div>
			</section>
		</main>
	);
}
