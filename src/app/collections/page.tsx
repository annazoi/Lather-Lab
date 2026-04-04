import { ProductCard } from '@/components/ProductCard';
import { PRODUCT_SORT_LABELS, PRODUCT_SORT_OPTIONS } from '@/config/product-sort.config';
import { CollectionFilters } from './components/collection-filters';
import { productService } from '@/services/product.service';
import { ProductSort } from '@/types/product';
import { Product } from '@prisma/client';

export const dynamic = 'force-dynamic';

interface CollectionsPageProps {
	searchParams: {
		sort?: string;
		category?: string;
	};
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
	const currentSort = Object.values(PRODUCT_SORT_OPTIONS).includes(searchParams?.sort as any)
		? (searchParams?.sort as ProductSort)
		: PRODUCT_SORT_OPTIONS.LATEST;
	const currentCategory = searchParams?.category;

	let products: Product[] = [];
	try {
		products = await productService.fetchProducts({ sort: currentSort, category: currentCategory });
	} catch (error) {
		console.error('Collections page error:', error);
	}

	const categories = [
		'Purifying & Balancing',
		'Deep Cleanse & Detox',
		'Soothing & Nourishing',
		'Sensitive Skin Care'
	];

	return (
		<main className="min-h-screen pt-32 pb-24 bg-[#23211F] text-stone-50 selection:bg-[#86967E]/30">
			<div className="max-w-[1400px] mx-auto px-6 lg:px-16">
				{/* Page Header */}
				<header className="mb-20 text-center space-y-6">
					<div className="inline-flex items-center gap-4">
						<span className="h-px w-8 bg-[#86967E]/30"></span>
						<span className="text-[11px] uppercase tracking-[0.4em] text-[#86967E] font-bold">
							Our Collections
						</span>
						<span className="h-px w-8 bg-[#86967E]/30"></span>
					</div>
					<h1 className="text-5xl lg:text-[64px] font-serif text-[#F9F8F6] tracking-tight leading-tight">
						Artisanal Botanical <br className="hidden md:block" /> Rituals
					</h1>
					<p className="text-[#8A8886] font-sans max-w-2xl mx-auto text-[14px] leading-relaxed opacity-90">
						Discover our entire range of artisanal, cold-processed soaps. Every bar is crafted with raw botanical
						ingredients to naturally nourish your skin and elevate your daily ritual.
					</p>
				</header>

				{/* Functional Filters / Sort Bar */}
				<CollectionFilters 
					currentSort={currentSort}
					currentCategory={currentCategory}
					productsCount={products.length}
					categories={categories}
					searchParams={searchParams}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
					{products.map((product, idx) => (
						<ProductCard key={product.id} product={product} index={idx} />
					))}
				</div>
			</div>
		</main>
	);
}
