import React from 'react';
import { Skeleton } from './ui/Skeleton';

export function HeroSkeleton() {
	return (
		<section className="relative min-h-[100vh] flex flex-col lg:flex-row overflow-hidden bg-white mt-20 lg:mt-0">
			{/* Right Background Block Skeleton */}
			<div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[#E5ECE3]/30" />

			{/* Left Content Skeleton */}
			<div className="relative w-full lg:w-1/2 flex items-center bg-[#fafaf9] justify-center lg:justify-end px-6 lg:px-16 py-16 lg:py-0">
				<div className="w-full max-w-[500px] lg:mr-10 xl:mr-20 space-y-8 mt-12 lg:mt-24">
					<Skeleton className="h-4 w-1/4 bg-stone-200" />
					<div className="space-y-4">
						<Skeleton className="h-16 w-full bg-stone-200" />
						<Skeleton className="h-16 w-3/4 bg-stone-200" />
					</div>
					<Skeleton className="h-20 w-full bg-stone-100" />
					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<Skeleton className="h-14 w-40 bg-stone-300" />
						<Skeleton className="h-14 w-40 bg-white border border-stone-100" />
					</div>
				</div>
			</div>

			{/* Right Content Skeleton */}
			<div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-12 lg:py-0 bg-[#E5ECE3]/20 lg:bg-transparent min-h-[600px] lg:min-h-screen">
				<div className="relative w-full max-w-[500px] xl:max-w-[550px]">
					<Skeleton className="relative aspect-[4/5] sm:aspect-square w-full shadow-2xl z-10" />
					<div className="absolute -bottom-8 -left-4 sm:-left-12 bg-white p-6 sm:p-8 shadow-2xl w-[280px] z-20 space-y-3">
						<Skeleton className="h-6 w-1/2" />
						<Skeleton className="h-12 w-full bg-stone-100" />
					</div>
				</div>
			</div>
		</section>
	);
}
