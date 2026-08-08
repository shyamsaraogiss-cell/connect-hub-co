import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { PublicHeader } from "@/components/auth/PublicHeader";
import { SessionHeader } from "@/components/auth/SessionHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Connect Hub Co. | Religious Services & Sacred Travel Coordination",
  description: "Discover ritual services, plan PitruMoksha in Gaya, and arrange sacred travel assistance with verified Religious Partners and GenZ Ritual AI guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <PublicHeader />
          <SessionHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
