import type { Metadata } from 'next';
import { StaticBusinessHeroPage } from '@/components/business-pages/StaticBusinessHeroPage';
import { VahiApprovedContent } from '@/components/business-pages/vahi-records/VahiApprovedContent';

export const metadata: Metadata = {
  title: 'Vahi (Panji) Ancestral Lineage Records & Guidance | Connect Hub Co.',
  description:
    'Guided ancestral lineage documentation, Gotra verification, and Vahi (Panji) record assistance coordinated through authorised traditional Panda custodians.',
};

export default function VahiRecordsPage() {
  return (
    <StaticBusinessHeroPage slideId="vahi-records">
      <VahiApprovedContent />
    </StaticBusinessHeroPage>
  );
}
