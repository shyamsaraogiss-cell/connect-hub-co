import type { Metadata } from 'next';
import { StaticBusinessHeroPage } from '@/components/business-pages/StaticBusinessHeroPage';
import { ReligiousPartnersContent } from '@/components/business-pages/religious-partners/ReligiousPartnersContent';

export const metadata: Metadata = {
  title: 'Religious Partner Network | Connect Hub Co.',
  description:
    'Join a trusted network of verified religious service professionals. Register with Connect Hub Co. to connect with seeking families across India and worldwide.',
};

export default function ReligiousPartnersPage() {
  return (
    <StaticBusinessHeroPage slideId="religious-partner-network">
      <ReligiousPartnersContent />
    </StaticBusinessHeroPage>
  );
}
