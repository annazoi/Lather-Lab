import React from 'react';
import { CollectionsSkeleton } from '@/components/CollectionsSkeleton';

export default function CollectionsLoading() {
	return (
		<main className="min-h-screen pt-32 pb-24 bg-[#23211F]">
			<div className="max-w-[1400px] mx-auto px-6 lg:px-16">
				{/* Header Section Skeleton */}
				<header className="mb-20 text-center space-y-8">
					<div className="flex justify-center items-center gap-4">
						<div className="h-px w-8 bg-[#86967E]/30" />
						<div className="h-4 w-32 bg-[#86967E]/20 animate-pulse rounded" />
						<div className="h-px w-8 bg-[#86967E]/30" />
					</div>
					<div className="space-y-4">
						<div className="h-16 w-3/4 max-w-xl mx-auto bg-stone-800 animate-pulse rounded-lg" />
						<div className="h-16 w-1/2 max-w-lg mx-auto bg-stone-800 animate-pulse rounded-lg" />
					</div>
					<div className="space-y-3 max-w-2xl mx-auto pt-4">
						<div className="h-4 w-full bg-stone-900 animate-pulse rounded" />
						<div className="h-4 w-full bg-stone-900 animate-pulse rounded" />
						<div className="h-4 w-2/3 mx-auto bg-stone-900 animate-pulse rounded" />
					</div>
				</header>

				{/* Grid Section Skeleton via existing CollectionsSkeleton grid logic */}
				<CollectionsSkeleton />
			</div>
		</main>
	);
}
