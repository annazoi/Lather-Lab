'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export function CheckoutSkeleton() {
	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#F9F8F6]">
			<div className="max-w-[1200px] mx-auto px-6 lg:px-12">
				<div className="h-6 w-32 bg-stone-200 animate-pulse mb-8 rounded" />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
					{/* Left: Form Skeleton */}
					<div className="lg:col-span-7 space-y-12">
						<section className="space-y-8">
							<div className="border-b border-stone-200 pb-6">
								<Skeleton className="h-10 w-2/3 bg-stone-200 mb-4" />
								<Skeleton className="h-4 w-1/2 bg-stone-100" />
							</div>
							<div className="space-y-6">
								<Skeleton className="h-4 w-24 bg-stone-200 ml-1 mb-2" />
								<Skeleton className="h-14 w-full bg-white border border-stone-100" />
								<Skeleton className="h-4 w-24 bg-stone-200 ml-1 mt-6 mb-2" />
								<Skeleton className="h-14 w-full bg-white border border-stone-100" />
								<div className="grid grid-cols-2 gap-6">
									<Skeleton className="h-20 w-full" />
									<Skeleton className="h-20 w-full" />
								</div>
							</div>
							<Skeleton className="h-16 w-full mt-8 bg-stone-200" />
						</section>
					</div>

					{/* Right: Summary Skeleton */}
					<div className="lg:col-span-5">
						<div className="bg-white border border-stone-200 rounded-sm p-10 h-[600px] space-y-10">
							<Skeleton className="h-6 w-1/3" />
							<div className="space-y-6">
								{Array.from({ length: 3 }).map((_, i) => (
									<div key={i} className="flex space-x-6">
										<Skeleton className="w-20 h-24 flex-shrink-0" />
										<div className="flex-1 space-y-3">
											<Skeleton className="h-5 w-2/3" />
											<Skeleton className="h-3 w-1/3" />
											<div className="flex justify-between pt-4">
												<Skeleton className="h-4 w-12" />
												<Skeleton className="h-5 w-16" />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
