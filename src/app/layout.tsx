import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "APTM - Associação Portuguesa de Terapia da Mão",
    template: "%s | APTM"
  },
  description: "Associação Portuguesa de Terapia da Mão - Promovendo excelência e desenvolvimento na terapia da mão em Portugal. Serviços de consultoria, investigação, eventos e formações profissionais.",
  keywords: [
    "terapia da mão",
    "associação",
    "Portugal",
    "reabilitação",
    "fisioterapia",
    "terapeuta ocupacional",
    "formação",
    "eventos",
    "consultoria"
  ],
  authors: [{ name: "APTM" }],
  creator: "APTM",
  publisher: "APTM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://aptm.pt",
    title: "APTM - Associação Portuguesa de Terapia da Mão",
    description: "Promovendo excelência e desenvolvimento na terapia da mão em Portugal",
    siteName: "APTM",
  },
  twitter: {
    card: "summary_large_image",
    title: "APTM - Associação Portuguesa de Terapia da Mão",
    description: "Promovendo excelência e desenvolvimento na terapia da mão em Portugal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your domain verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="flex-1">
          <Header />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
