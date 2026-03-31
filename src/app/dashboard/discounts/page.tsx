import React from 'react';
import { productService } from '@/services/product.service';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { ProductTable } from '@/components/ProductTable';

export const dynamic = 'force-dynamic';

export default async function AdminDiscountsPage() {
	const products = await productService.getDiscountedProducts();

	return (
		<div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000 slide-in-from-top-4">
			<header className="flex flex-col lg:flex-row lg:justify-between lg:items-end border-b border-[#363330] pb-10 gap-8">
				<div>
					<h1 className="text-3xl md:text-5xl font-serif mb-4 text-[#F9F8F6]">Active Promotions</h1>
					<p className="text-[10px] md:text-[12px] uppercase tracking-[0.25em] text-[#86967E] font-bold">
						Currently Campaigning: {products.length} Products
					</p>
				</div>
                <div className="flex space-x-4">
                    <Link
                        href="/dashboard/products"
                        className="border border-[#363330] text-[#86967E] px-6 md:px-10 py-4 flex items-center justify-center space-x-3 text-[10px] md:text-[11px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 w-full lg:w-auto"
                    >
                        <span>View All Products</span>
                    </Link>
                </div>
			</header>

			<ProductTable 
                products={products} 
                emptyTitle="No products are currently on discount."
                emptySubtitle="Visit the catalogue to apply promotional pricing"
            />
		</div>
	);
}
