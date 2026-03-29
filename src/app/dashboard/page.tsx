import React from 'react';
import { ShoppingBag, Users, TrendingUp, Package, AlertCircle } from 'lucide-react';

export default async function DashboardPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="mb-14">
        <h1 className="text-5xl font-serif mb-4 text-[#F9F8F6]">Studio Overview</h1>
        <p className="text-[12px] uppercase tracking-[0.25em] text-[#86967E] font-bold">
          Performance Monitoring & Management
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Revenue', value: '$12,450.00', icon: TrendingUp, color: 'text-green-400' },
          { label: 'Total Orders', value: '1,502', icon: ShoppingBag, color: 'text-stone-400' },
          { label: 'Active Customers', value: '492', icon: Users, color: 'text-stone-400' },
          { label: 'Store Items', value: '24', icon: Package, color: 'text-stone-400' }
        ].map((stat, i) => (
          <div key={i} className="p-10 bg-[#1C1917] border border-[#363330] rounded-xl group hover:border-[#86967E] transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <stat.icon size={20} className={stat.color} />
              <div className="h-1 w-8 bg-[#363330] group-hover:bg-[#86967E] transition-colors"></div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A8886] block mb-2">{stat.label}</span>
            <div className="text-4xl font-serif text-[#F9F8F6]">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="p-10 bg-[#1C1917] border border-[#363330] rounded-xl">
          <h3 className="text-xl font-serif text-[#F9F8F6] mb-8">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start space-x-5 py-4 border-b border-[#363330]/50 last:border-0">
                <div className="bg-[#2D2A28] p-3 rounded-full">
                  <Package size={14} className="text-[#86967E]" />
                </div>
                <div>
                  <p className="text-[13px] font-sans text-stone-300">New order #81920 received from user_819</p>
                  <span className="text-[10px] text-stone-500 mt-1 block">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 bg-[#1C1917] border border-[#363330] rounded-xl flex flex-col justify-center items-center text-center">
          <AlertCircle size={40} className="text-[#86967E] mb-6 opacity-30" />
          <h3 className="text-xl font-serif text-[#F9F8F6] mb-2">Performance Optimization</h3>
          <p className="text-[12px] font-sans text-stone-500 max-w-xs leading-relaxed">
            All systems currently operational. Product inventory is 100% synced with PostgreSQL.
          </p>
        </div>
      </div>
    </div>
  );
}
