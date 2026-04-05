import React from 'react';
import { Skeleton } from './ui/Skeleton';

export function ProductDetailSkeleton() {
	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#23211F]">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				{/* Back Button Skeleton */}
				<Skeleton className="h-6 w-40 mb-12 bg-stone-800" />

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
					{/* Left: Image Gallery Skeleton */}
					<div className="space-y-6">
						<Skeleton className="relative aspect-[4/5] w-full rounded-2xl bg-stone-900 border border-[#363330]" />
						<div className="grid grid-cols-4 gap-4">
							{Array.from({ length: 4 }).map((_, i) => (
								<Skeleton key={i} className="aspect-square rounded-lg bg-stone-900" />
							))}
						</div>
					</div>

					{/* Right: Product Details Skeleton */}
					<div className="space-y-12">
						<section className="space-y-6">
							<div>
								<Skeleton className="h-4 w-32 mb-4 bg-[#86967E]/20" />
								<Skeleton className="h-16 w-full lg:w-3/4 mb-4 bg-stone-800" />
								<Skeleton className="h-16 w-1/2 bg-stone-800" />
							</div>

							<div className="flex items-baseline space-x-6">
								<Skeleton className="h-10 w-24 bg-stone-800" />
								<Skeleton className="h-6 w-20 bg-stone-900" />
							</div>

							<div className="space-y-3">
								<Skeleton className="h-5 w-full bg-stone-800/50" />
								<Skeleton className="h-5 w-full bg-stone-800/50" />
								<Skeleton className="h-5 w-2/3 bg-stone-800/50" />
							</div>
						</section>

						{/* Benefits List Skeleton */}
						<section className="space-y-6">
							<Skeleton className="h-4 w-1/3 bg-stone-900 border-b border-[#363330] pb-4" />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
								{Array.from({ length: 4 }).map((_, i) => (
									<div key={i} className="flex items-center space-x-4">
										<Skeleton className="w-5 h-5 rounded-full bg-stone-800" />
										<Skeleton className="h-4 w-full bg-stone-800" />
									</div>
								))}
							</div>
						</section>

						{/* Action Buttons Skeleton */}
						<section className="space-y-6 pt-4">
							<div className="flex gap-4">
								<Skeleton className="h-16 flex-1 bg-stone-800" />
								<Skeleton className="h-16 w-16 bg-stone-800" />
							</div>
							<Skeleton className="h-4 w-1/2 mx-auto sm:mx-0 bg-stone-900" />
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}
