import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { ReligiousPartnersContent } from '@/components/business-pages/religious-partners/ReligiousPartnersContent';

export const metadata: Metadata = {
  title: 'Religious Partner Network | Connect Hub Co.',
  description:
    'Join a trusted network of verified religious service professionals. Register with Connect Hub Co. to connect with seeking families across India and worldwide.',
};

export default function ReligiousPartnersPage() {
  return (
    <PublicHeroShell>
      <ReligiousPartnersContent />
    </PublicHeroShell>
  );
}
