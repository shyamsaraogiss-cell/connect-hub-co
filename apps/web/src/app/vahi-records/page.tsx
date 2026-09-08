import React from 'react';
import type { Metadata } from 'next';
import { VahiApprovedContent } from '@/components/business-pages/vahi-records/VahiApprovedContent';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = {
  title: 'Vahi (Panji) Ancestral Lineage Records & Guidance | Connect Hub Co.',
  description: 'Guided ancestral lineage documentation, Gotra verification, and Vahi (Panji) record assistance coordinated through authorised traditional Panda custodians.',
};

export default function VahiRecordsRoute() {
  return <PublicHeroShell><VahiApprovedContent /></PublicHeroShell>;
}
