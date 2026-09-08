import type { Metadata } from 'next';
import { RitualServicesPage } from '@/components/business-pages/ritual-services/RitualServicesPage';
import { VahiStyleTopInfoShell } from '@/components/business-pages/VahiStyleTopInfoShell';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = {
  title: 'Vedic Ritual Services & Sacred Coordination | Connect Hub Co.',
  description:
    'Explore authentic Vedic pujas, homams, Griha Pravesh, Navagraha Shanti, sacred samagri care, and NRI remote live Sankalp coordinated through verified Religious Partners across 15+ locations in India and Nepal.',
};

export default function Page() {
  return <PublicHeroShell><VahiStyleTopInfoShell imageSrc="/images/heroes/hero-2/hero-2-ritual-services-info-v4.png" secondaryImageSrc="/images/heroes/hero-2/ritual-services-info-hero-v3.png" imageFit="cover" imageAlign="center" /><RitualServicesPage embedded /></PublicHeroShell>;
}






