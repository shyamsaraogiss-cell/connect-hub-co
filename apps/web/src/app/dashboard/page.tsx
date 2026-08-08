'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard';
import { PartnerDashboard } from '@/components/dashboard/PartnerDashboard';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-stone-50 p-6 text-stone-700">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-800 border-t-transparent"></div>
          <p className="mt-4 font-semibold text-teal-900">Loading your secure dashboard…</p>
        </div>
      </main>
    );
  }

  if (user?.role === 'ADMIN' || user?.role === 'STAFF' || (user?.email && user.email.includes('admin'))) {
    return <AdminDashboard />;
  }

  if (user?.role === 'PARTNER' || (user?.email && user.email.includes('partner'))) {
    return <PartnerDashboard />;
  }

  return <CustomerDashboard />;
}
