import '@/app/globals.css';
import React from 'react';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PublicHeader } from '@/components/auth/PublicHeader';
import { BusinessFooter } from '@/components/auth/BusinessFooter';
import { PageContent } from '@/components/common/PageContent';

export const metadata = {
  title: 'Connect Hub Co. | Religious Services',
  description: 'The Authentic Ancestral Rites | Verified Lineage | Vedic Precision',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col" style={{ margin: 0, padding: 0, backgroundColor: '#054B52' }}>
        <AuthProvider>
          <PublicHeader />
          <PageContent>{children}</PageContent>
          <BusinessFooter />
        </AuthProvider>
      </body>
    </html>
  );
}
