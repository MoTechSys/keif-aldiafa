import type { Metadata } from "next";
import {
  serviceCategories,
  getAllCategorySlugs,
  getCategoryBySlug,
  SITE_NAME,
  SITE_URL,
} from "@/data/services";
import ServiceCategoryPage from "./ServiceCategoryPage";

// ============================================
// Static Generation — generateStaticParams
// Generates all category pages at build time for instant loading & SEO
// ============================================
export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

// ============================================
// Dynamic Metadata for SEO
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: `خدماتنا | ${SITE_NAME}`,
      description: "خدمات ضيافة فاخرة من كيف الضيافة",
    };
  }

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    keywords: category.seoKeywords,
    openGraph: {
      title: `${category.title} | ${SITE_NAME}`,
      description: category.seoDescription,
      url: `${SITE_URL}/services/${category.slug}`,
      siteName: SITE_NAME,
      locale: "ar_SA",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${category.title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | ${SITE_NAME}`,
      description: category.seoDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/services/${category.slug}`,
    },
  };
}

// ============================================
// Page Component (Server Component)
// ============================================
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1
            className="text-[#D4AF37] mb-4"
            style={{ fontSize: "2rem", fontWeight: 700 }}
          >
            الصفحة غير موجودة
          </h1>
          <a
            href="/"
            className="text-[#F5F5DC]/60 hover:text-[#D4AF37] transition-colors"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    );
  }

  // Build JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.title,
    description: category.seoDescription,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "المملكة العربية السعودية",
    },
    serviceType: category.titleEn,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: category.services.map((s, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
        position: i + 1,
      })),
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceCategoryPage category={category} allCategories={serviceCategories} />
    </>
  );
}
