import React from 'react';
import { Skeleton } from './ui/Skeleton';
import { ProductSkeleton } from './ProductSkeleton';

export function CollectionsSkeleton() {
	return (
		<section className="py-24 bg-[#23211F]" id="collections">
			<div className="max-w-[1400px] mx-auto px-6 lg:px-12">
				<div className="mb-16">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
						<div className="space-y-4 w-full md:w-2/3">
							<Skeleton className="h-4 w-32 bg-[#86967E]/20" />
							<div className="space-y-4">
								<Skeleton className="h-14 w-full bg-[#363330]/50" />
								<Skeleton className="h-14 w-2/3 bg-[#363330]/50" />
							</div>
						</div>
						<Skeleton className="h-6 w-40 bg-[#363330]/30" />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
					{Array.from({ length: 3 }).map((_, i) => (
						<ProductSkeleton key={i} />
					))}
				</div>
			</div>
		</section>
	);
}
