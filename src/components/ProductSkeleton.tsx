import React from 'react';
import { Skeleton } from './ui/Skeleton';

export function ProductSkeleton() {
	return (
		<div className="flex flex-col space-y-6">
			{/* Image Skeleton */}
			<div className="relative aspect-square overflow-hidden bg-[#2D2A28]/30 rounded-xl border border-[#363330]">
				<Skeleton className="w-full h-full bg-[#363330]/50" />
			</div>

			{/* Info Skeleton */}
			<div className="space-y-3 px-1">
				<div className="flex justify-between items-start">
					<Skeleton className="h-7 w-3/5 bg-[#363330]/50 rounded" />
					<Skeleton className="h-7 w-1/4 bg-[#363330]/50 rounded" />
				</div>
				<div className="flex justify-between items-center">
					<Skeleton className="h-4 w-1/3 bg-[#363330]/30 rounded" />
					<Skeleton className="h-3 w-1/4 bg-[#363330]/30 rounded" />
				</div>
			</div>
		</div>
	);
}
