export const getProductImageUrl = (image: string | null | undefined): string => {
	if (!image) {
		return '/images/placeholder.png';
	}

	// If it's already an absolute URL or starts with a slash, return it
	if (image.startsWith('http') || image.startsWith('/')) {
		return image;
	}

	// Otherwise, assume it's a public asset that needs a leading slash
	return `/${image}`;
};
