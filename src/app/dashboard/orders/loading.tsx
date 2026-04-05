import React from 'react';
import { OrderTableSkeleton } from '@/components/OrderTableSkeleton';

export default function OrdersLoading() {
	return (
		<div className="min-h-screen bg-[#1C1816] pt-12">
			<OrderTableSkeleton />
		</div>
	);
}
