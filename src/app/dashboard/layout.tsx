import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/AdminSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('token')?.value;
  const decoded = token ? verifyToken(token) : null;

  if (!decoded || decoded.role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen bg-[#23211F] text-[#F9F8F6]">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}
