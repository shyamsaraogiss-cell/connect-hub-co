import { permanentRedirect } from 'next/navigation';

export default function PrivacyPolicyPage() {
  permanentRedirect('/policies-legal-terms#privacy-policy');
}
