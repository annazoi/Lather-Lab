import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProfileLoading() {
	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#23211F]">
			<div className="max-w-[1200px] mx-auto px-10">
				<header className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#363330] pb-12 mb-16 gap-8">
					<div className="space-y-4">
						<Skeleton className="h-12 w-64 bg-stone-800" />
						<Skeleton className="h-4 w-40 bg-[#86967E]/20" />
					</div>
					<Skeleton className="h-12 w-32 bg-stone-800" />
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
					<div className="lg:col-span-1 space-y-10">
						<div className="bg-[#1C1917] border border-[#363330] p-10 rounded-xl space-y-8">
							<Skeleton className="w-14 h-14 rounded-full bg-[#86967E]/20" />
							<Skeleton className="h-7 w-1/2 bg-stone-800" />
							<div className="space-y-6">
								<div className="space-y-2">
									<Skeleton className="h-3 w-20 bg-stone-900" />
									<Skeleton className="h-4 w-40 bg-stone-800" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-3 w-20 bg-stone-900" />
									<Skeleton className="h-4 w-28 bg-stone-800" />
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2 space-y-10">
						<div className="bg-[#1C1917] border border-[#363330] p-10 rounded-xl min-h-[400px]">
							<header className="flex items-center justify-between mb-10 border-b border-[#363330] pb-6">
								<Skeleton className="h-7 w-48 bg-stone-800" />
								<Skeleton className="h-4 w-32 bg-stone-900" />
							</header>
							<div className="space-y-4">
								{Array.from({ length: 3 }).map((_, i) => (
									<Skeleton key={i} className="h-24 w-full bg-[#23211F] rounded-lg border border-[#363330]" />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
