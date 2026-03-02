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
  title: {
    default: "كيف الضيافة | حيث تلتقي الفخامة بالضيافة الأصيلة",
    template: "%s | كيف الضيافة",
  },
  description: "كيف الضيافة - خدمات ضيافة فاخرة للمناسبات الخاصة والمؤتمرات والفعاليات في جميع أنحاء المملكة العربية السعودية. ضيافة رجالية ونسائية، خدمات فنية، تقديمات فاخرة.",
  keywords: ["ضيافة", "ضيافة فاخرة", "مناسبات", "أعراس", "مؤتمرات", "فعاليات", "السعودية", "جدة", "مكة", "الرياض", "مضيفين", "مضيفات", "قهوة سعودية", "تمر"],
  authors: [{ name: "كيف الضيافة" }],
  creator: "كيف الضيافة",
  publisher: "كيف الضيافة",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://keif-aldiafa.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/icon.svg",
        color: "#B8860B",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "كيف الضيافة | خدمات ضيافة فاخرة",
    description: "حيث تلتقي الفخامة بالضيافة الأصيلة - خدمات ضيافة فاخرة للمناسبات",
    url: "https://keif-aldiafa.com",
    siteName: "كيف الضيافة",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "كيف الضيافة - خدمات ضيافة فاخرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كيف الضيافة",
    description: "خدمات ضيافة فاخرة للمناسبات الخاصة",
    images: ["/og-image.png"],
    creator: "@keifdiafa",
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
    google: "google-site-verification-code",
  },
  category: "business",
  classification: "Hospitality Services",
  appLinks: {
    web: {
      url: "https://keif-aldiafa.com",
      should_fallback: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D4AF37" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
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
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="كيف الضيافة" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="كيف الضيافة" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* iOS Splash Screens */}
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Theme Colors */}
        <meta name="color-scheme" content="dark light" />
        <meta name="prefers-color-scheme" content="dark" />
        
        {/* Other SEO */}
        <link rel="canonical" href="https://keif-aldiafa.com" />
        <link rel="alternate" hrefLang="ar" href="https://keif-aldiafa.com" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
