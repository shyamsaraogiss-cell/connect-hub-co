'use client';

import { CRMLeadManager } from '@/components/crm/CRMLeadManager';

export default function RequestsPage() {
  return (
    <main className="min-h-screen bg-stone-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <CRMLeadManager />
      </div>
    </main>
  );
}
