import '@/app/globals.css';
import React, { Suspense } from 'react';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PublicHeader } from '@/components/auth/PublicHeader';
import { BusinessFooter } from '@/components/auth/BusinessFooter';
import { PageContent } from '@/components/common/PageContent';
import { ServicesDrawerProvider } from '@/components/auth/ServicesDrawerContext';
import { ServicesDrawerHost } from '@/components/auth/ServicesDrawerHost';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Connect Hub Co. | Religious Services',
  description:
    'Trusted coordination for ancestral rites — Verified Priests, human support, responsible AI guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-full flex flex-col" style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          <ServicesDrawerProvider>
            <PublicHeader />
            <PageContent>{children}</PageContent>
            <BusinessFooter />
            <Suspense fallback={null}>
              <ServicesDrawerHost />
            </Suspense>
          </ServicesDrawerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
