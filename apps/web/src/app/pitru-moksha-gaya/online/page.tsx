import type { Metadata } from 'next';
import { OnlineAncestralPage } from '@/components/business-pages/online/OnlineAncestralPage';

export const metadata: Metadata = { title: 'Online Ancestral Services | PitruMoksha Gaya', description: 'Explore guided online ancestral rituals, Virtual Shraddh participation and Verified Priest coordination.' };
export default function OnlinePage() { return <div id="virtual-shraddh"><OnlineAncestralPage /></div>; }
