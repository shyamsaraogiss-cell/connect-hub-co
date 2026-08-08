import type { Metadata } from 'next';
import { RitualServicesPage } from '@/components/business-pages/ritual-services/RitualServicesPage';
import { StaticBusinessHeroPage } from '@/components/business-pages/StaticBusinessHeroPage';

export const metadata: Metadata = {
  title: 'Vedic Ritual Services & Sacred Coordination | Connect Hub Co.',
  description:
    'Explore authentic Vedic pujas, homams, Griha Pravesh, Navagraha Shanti, sacred samagri care, and NRI remote live Sankalp coordinated through verified Religious Partners across 15+ locations in India and Nepal.',
};

export default function Page() {
  return <StaticBusinessHeroPage slideId="ritual-services"><RitualServicesPage embedded /></StaticBusinessHeroPage>;
}
