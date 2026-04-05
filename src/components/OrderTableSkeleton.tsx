import React from 'react';
import { Skeleton } from './ui/Skeleton';

export function OrderTableSkeleton() {
	return (
		<div className="space-y-10 px-4 md:px-0">
			<header className="space-y-4">
				<Skeleton className="h-12 w-1/3 bg-stone-800 rounded-lg" />
				<Skeleton className="h-4 w-1/4 bg-stone-900 rounded" />
			</header>

			<div className="bg-[#1C1917] border border-[#363330] rounded-xl shadow-2xl overflow-hidden">
				<div className="w-full">
					{/* Table Header Skeleton */}
					<div className="grid grid-cols-[1.5fr,2fr,1.5fr,1fr,1.5fr,1.2fr] gap-4 px-8 py-6 border-b border-[#363330] bg-[#23211F]/50">
						{Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className="h-4 w-2/3 bg-[#363330]/50" />
						))}
					</div>

					{/* Table Body Skeleton Rows */}
					<div className="divide-y divide-[#363330]">
						{Array.from({ length: 5 }).map((_, i) => (
							<div key={i} className="grid grid-cols-[1.5fr,2fr,1.5fr,1fr,1.5fr,1.2fr] gap-4 px-8 py-8 items-center bg-[#1C1917]">
								<div className="space-y-3">
									<Skeleton className="h-4 w-24 bg-stone-800" />
									<Skeleton className="h-3 w-16 bg-stone-900" />
								</div>
								<div className="space-y-3">
									<Skeleton className="h-4 w-32 bg-stone-800" />
									<Skeleton className="h-3 w-28 bg-stone-900" />
								</div>
								<Skeleton className="h-4 w-24 mx-auto bg-stone-800" />
								<Skeleton className="h-5 w-16 bg-stone-800" />
								<Skeleton className="h-8 w-28 mx-auto bg-stone-800 rounded-full" />
								<div className="flex justify-end">
									<Skeleton className="h-5 w-20 bg-stone-800" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
