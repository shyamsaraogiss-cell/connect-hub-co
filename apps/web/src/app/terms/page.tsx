import { permanentRedirect } from 'next/navigation';

export default function TermsPage() {
  permanentRedirect('/policies-legal-terms#terms-and-conditions');
}
