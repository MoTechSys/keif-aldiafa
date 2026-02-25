import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Amiri } from "next/font/google";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "كيف الضيافة | حيث تلتقي الفخامة بالضيافة الأصيلة",
  description: "كيف الضيافة - خدمات ضيافة فاخرة للمناسبات الخاصة والمؤتمرات والفعاليات في جميع أنحاء المملكة العربية السعودية. ضيافة رجالية ونسائية، خدمات فنية، تقديمات فاخرة.",
  keywords: ["ضيافة", "ضيافة فاخرة", "مناسبات", "أعراس", "مؤتمرات", "فعاليات", "السعودية", "جدة", "مكة", "الرياض", "مضيفين", "مضيفات", "قهوة سعودية", "تمر"],
  authors: [{ name: "كيف الضيافة" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "كيف الضيافة | خدمات ضيافة فاخرة",
    description: "حيث تلتقي الفخامة بالضيافة الأصيلة - خدمات ضيافة فاخرة للمناسبات",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف الضيافة",
    description: "خدمات ضيافة فاخرة للمناسبات الخاصة",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ar" 
      dir="rtl" 
      className={`${ibmPlexArabic.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
