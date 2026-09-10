import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { refundDocument } from '@/components/legal/refundDocument';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Connect Hub Co.',
  description: 'Refund & Cancellation Policy for Connect Hub Co. services and website use.',
  alternates: { canonical: '/refund-policy' },
};

export default function Page() {
  return <LegalDocument document={refundDocument} />;
}
