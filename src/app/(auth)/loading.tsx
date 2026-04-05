import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AuthLoading() {
	return (
		<main className="min-h-screen pt-40 pb-24 bg-[#1C1816] flex items-center justify-center px-6">
			<div className="max-w-md w-full bg-[#23211F] border border-[#363330] p-12 space-y-10 rounded-2xl shadow-2xl">
				<header className="text-center space-y-4">
					<Skeleton className="h-10 w-2/3 mx-auto bg-stone-800" />
					<Skeleton className="h-4 w-1/2 mx-auto bg-stone-900" />
				</header>
				<div className="space-y-8">
					<div className="space-y-3">
						<Skeleton className="h-3 w-16 bg-stone-800" />
						<Skeleton className="h-14 w-full bg-stone-900 border border-[#363330]" />
					</div>
					<div className="space-y-3">
						<Skeleton className="h-3 w-16 bg-stone-800" />
						<Skeleton className="h-14 w-full bg-stone-900 border border-[#363330]" />
					</div>
					<Skeleton className="h-16 w-full bg-stone-800 rounded-lg pt-4" />
				</div>
				<Skeleton className="h-4 w-1/2 mx-auto bg-stone-900" />
			</div>
		</main>
	);
}
