import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { BusinessAbout } from '@/components/common/BusinessAbout';

export const metadata: Metadata = {
  title: 'About Us | Connect Hub Co.',
  description: 'Learn how Connect Hub Co. coordinates sacred services and pilgrim travel assistance in Gaya Ji and pan-India with verified Religious Partners.',
};

export default function AboutPage() {
  return <PublicHeroShell><BusinessAbout /></PublicHeroShell>;
}
