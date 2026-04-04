import React from 'react';
import { orderService } from '@/services/order.service';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

import OrderStatusSelector from './components/OrderStatusSelector';
import OrderDetailsButton from './components/OrderDetailsModal';

export default async function AdminOrdersPage() {
  const orders = await orderService.getAllOrders();

  return (
    <div className="space-y-10 px-4 md:px-0">
      <header>
        <h1 className="text-4xl font-serif mb-2 text-[#F9F8F6]">Customer Orders</h1>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#86967E] font-bold">
          Total Shipments: {orders.length} Records
        </p>
      </header>

      <div className="bg-[#1C1917] border border-[#363330] rounded-xl shadow-2xl overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#363330] bg-[#23211F]/50">
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#86967E] font-bold">Order Ritual ID</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#86967E] font-bold">Customer & Shipping</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#86967E] font-bold text-center">Contact</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#86967E] font-bold">Sum</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#86967E] font-bold text-center">Status</th>
              <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-[#86967E] font-bold text-right pr-12">Ritual Record</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#363330]">
            {orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group group/item">
                <td className="px-8 py-6">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[12px] font-sans text-stone-300 font-[800] uppercase tracking-widest">
                      #{order.id.slice(-6)}
                    </span>
                    <span className="text-[10px] text-stone-600 font-sans uppercase font-bold tracking-widest">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col space-y-1">
                    <span className="text-[13px] font-sans font-bold text-[#F9F8F6]">{order.shippingName || 'No Name'}</span>
                    <span className="text-[11px] text-stone-500 font-sans italic leading-relaxed">
                      {order.shippingAddress}, {order.shippingCity}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-[11px] font-sans text-stone-500 tracking-widest uppercase font-bold">
                    {order.shippingPhone || '—'}
                  </span>
                </td>
                <td className="px-8 py-6 text-[#86967E] font-[900] tracking-wider font-sans text-[14px]">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-8 py-6 text-center">
                  <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                </td>
                <td className="px-8 py-6 text-right pr-12">
                  <OrderDetailsButton order={order} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
