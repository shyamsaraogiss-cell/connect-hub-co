import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { policiesDocument } from '@/components/legal/policiesDocument';

export const metadata: Metadata = {
  title: 'Policies & Legal Terms | Connect Hub Co.',
  description: 'Policies & Legal Terms for Connect Hub Co. services and website use.',
  alternates: { canonical: '/policies-and-legal-terms' },
};

export default function Page() {
  return <LegalDocument document={policiesDocument} />;
}
