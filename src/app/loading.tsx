import React from 'react';
import { ProductSkeleton } from '@/components/ProductSkeleton';

export default function RootLoading() {
	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#1C1816]">
			<div className="max-w-[1440px] mx-auto px-6 lg:px-12">
				{/* Header Section Skeleton */}
				<div className="mb-16 space-y-4">
					<div className="h-16 w-1/3 bg-[#33302E]/40 animate-pulse rounded-lg" />
					<div className="h-4 w-1/4 bg-[#2D2A28]/30 animate-pulse rounded-lg" />
				</div>

				{/* Grid Section Skeleton */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
					{Array.from({ length: 8 }).map((_, i) => (
						<ProductSkeleton key={i} />
					))}
				</div>
			</div>
		</main>
	);
}
