import { permanentRedirect } from 'next/navigation';

export default function LegacyPoliciesPage() {
  permanentRedirect('/policies-and-legal-terms');
}
