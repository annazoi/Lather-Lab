'use client';
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

// Client component for toggling favorite status of a product
export default function FavoriteButton({ productId }: { productId: string }) {
	const [isFavorite, setIsFavorite] = useState(false);
	const [loading, setLoading] = useState(true);

	// Fetch current favorites on mount
	useEffect(() => {
		async function fetchFavorites() {
			try {
				const res = await fetch('/api/profile/favorites', { credentials: 'include' });
				if (res.ok) {
					const data: any[] = await res.json();
					setIsFavorite(data.some((p) => p.id === productId));
				}
			} catch (err) {
				console.error('Failed to fetch favorites');
			} finally {
				setLoading(false);
			}
		}
		fetchFavorites();
	}, [productId]);

	const handleToggle = async () => {
		try {
			const res = await fetch('/api/profile/favorites', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ productId }),
			});
			if (res.ok) {
				const result = await res.json();
				setIsFavorite(result.isFavorite);
			}
		} catch (err) {
			console.error('Failed to toggle favorite');
		}
	};

	if (loading) return null;

	return (
		<button
			onClick={handleToggle}
			className="px-8 py-5 border border-[#363330] text-[#F9F8F6] hover:border-[#86967E] hover:text-[#86967E] transition-all duration-500 flex items-center justify-center"
			title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		>
			<Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
		</button>
	);
}
