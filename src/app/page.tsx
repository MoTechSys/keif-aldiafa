"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  navLinks,
  serviceCategories,
  testimonials,
  stats,
  resolveImage,
  imageFallbacks,
  getWhatsAppLink,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  EMAIL,
  PHONE,
} from "@/data/services";
import type { PageType } from "@/data/services";
import InfinitePartnersCarousel from "@/components/InfinitePartnersCarousel";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { usePreventBackExit } from "@/hooks/use-prevent-back-exit";

// ============================================
// Image URLs (fallbacks for hero/gallery)
// ============================================
const images = {
  hero: imageFallbacks["/images/services/hero.jpg"],
  coffee: imageFallbacks["/images/services/coffee.jpg"],
  catering: imageFallbacks["/images/services/catering.jpg"],
  tea: imageFallbacks["/images/services/tea.jpg"],
  event: imageFallbacks["/images/services/event.jpg"],
  waiter: imageFallbacks["/images/services/men/hosts.jpg"],
  woman: imageFallbacks["/images/services/women/hostesses.jpg"],
  equip: imageFallbacks["/images/services/equipment.jpg"],
  portfolio: imageFallbacks["/images/services/portfolio.jpg"],
  kitchen: imageFallbacks["/images/services/kitchen.jpg"],
};

// ============================================
// Section Title Component
// ============================================
function SectionTitle({
  title,
  subtitle,
  center = true,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className={`text-[#D4AF37] mb-2 ${center ? "text-center" : ""}`}
          style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
        >
          ✦ {subtitle || "كيف الضيافة"} ✦
        </p>
        <h2
          className={`text-[#F5F5DC] ${center ? "text-center" : ""}`}
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>
        <div
          className={`mt-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent ${
            center ? "mx-auto" : ""
          }`}
          style={{ width: "120px" }}
        />
      </motion.div>
    </div>
  );
}

// ============================================
// HOME SECTION
// ============================================
function HomeSection() {
  const whyCards = [
    {
      icon: "✦",
      title: "خبرة متميزة",
      desc: "سنوات من الخبرة في تقديم خدمات الضيافة الفاخرة للمناسبات الكبرى والحفلات الراقية",
    },
    {
      icon: "◈",
      title: "فريق احترافي",
      desc: "كوادر مدربة على أعلى مستوى من الاحتراف والأناقة لضمان تجربة لا تُنسى",
    },
    {
      icon: "❋",
      title: "تقديمات فاخرة",
      desc: "أرقى التقديمات من قهوة سعودية وشاي وحلويات فاخرة وتوزيعات متنوعة",
    },
    {
      icon: "◇",
      title: "تغطية شاملة",
      desc: "نغطي جميع مناطق المملكة العربية السعودية بأسطول متكامل من المعدات الفاخرة",
    },
  ];

  const moments = [
    {
      img: images.coffee,
      title: "القهوة السعودية الأصيلة",
      category: "مشروبات حارة",
    },
    {
      img: images.catering,
      title: "تجهيزات المناسبات الكبرى",
      category: "خدمات الضيافة",
    },
    {
      img: images.tea,
      title: "جلسات الشاي الفاخرة",
      category: "مشروبات",
    },
    {
      img: images.waiter,
      title: "فريق الضيافة المحترف",
      category: "الخدمات الرجالية",
    },
    {
      img: images.event,
      title: "حفلات الزفاف الفاخرة",
      category: "مناسبات",
    },
    {
      img: images.equip,
      title: "معدات التقديم الراقية",
      category: "المعدات",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen min-h-[600px] overflow-hidden"
        aria-label="الصفحة الرئيسية"
      >
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="كيف الضيافة - خدمات ضيافة فاخرة"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#D4AF37] mb-4"
            style={{ fontSize: "0.85rem", letterSpacing: "0.3em" }}
          >
            ✦ ✦ ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#F5F5DC] mb-3"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            كيف الضيافة
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#D4AF37] mb-2"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              fontWeight: 300,
              letterSpacing: "0.1em",
            }}
          >
            KEIF AL-DIAFA
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[#F5F5DC]/70 max-w-lg mb-10"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              lineHeight: 1.8,
            }}
          >
            منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية الأصيلة
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <a
              href="#services"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#DAA520] text-[#0a0a0a] hover:shadow-xl hover:shadow-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontWeight: 700, fontSize: "1rem" }}
            >
              اكتشف خدماتنا
            </a>
            <a
              href="#portfolio"
              className="px-8 py-3 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
              style={{ fontWeight: 500, fontSize: "1rem" }}
            >
              معرض أعمالنا
            </a>
          </motion.div>

          <motion.div
            className="absolute bottom-10"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#D4AF37]/40 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-[#D4AF37]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/5 to-[#D4AF37]/10 border-y border-[#D4AF37]/20 py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p
                className="text-[#D4AF37]"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 700,
                }}
              >
                {s.num}
              </p>
              <p className="text-[#F5F5DC]/60 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Keif Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto" aria-label="لماذا كيف الضيافة">
        <SectionTitle title="لماذا كيف الضيافة؟" subtitle="مزايانا التنافسية" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-2xl border border-[#D4AF37]/15 overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(10,10,10,0.95) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="text-[#D4AF37] mb-4 relative z-10"
                style={{ fontSize: "2rem", lineHeight: 1 }}
              >
                {card.icon}
              </div>
              <h3
                className="text-[#F5F5DC] mb-3 relative z-10"
                style={{ fontSize: "1.05rem", fontWeight: 600 }}
              >
                {card.title}
              </h3>
              <p className="text-[#F5F5DC]/55 text-sm leading-relaxed relative z-10">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Overview — Links to /services/[category] */}
      <section
        id="services"
        className="py-20 px-4 bg-[#0f0f0f]"
        aria-label="خدماتنا"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="خدماتنا" subtitle="خدمات متكاملة" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={`/services/${cat.slug}`}
                  className="relative rounded-3xl overflow-hidden group block"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={resolveImage(cat.image)}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                  <div
                    className="absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center text-[#D4AF37] text-xl border border-[#D4AF37]/30"
                    style={{
                      background: "rgba(10,10,10,0.7)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className="text-[#D4AF37] mb-1"
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {cat.subtitle}
                    </p>
                    <h3
                      className="text-[#F5F5DC] mb-2"
                      style={{ fontSize: "1.3rem", fontWeight: 700 }}
                    >
                      {cat.title}
                    </h3>
                    <p className="text-[#F5F5DC]/60 text-sm line-clamp-2 mb-3">
                      {cat.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-2 text-[#D4AF37] text-sm group-hover:gap-3 transition-all duration-300"
                      style={{ fontWeight: 500 }}
                    >
                      اعرف أكثر
                      <span>←</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Moments / Portfolio */}
      <section
        id="portfolio"
        className="py-20 px-4"
        aria-label="لحظاتنا المميزة"
      >
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="لحظاتنا المميزة" subtitle="من أعمالنا" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moments.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={m.img}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span
                    className="px-3 py-1 rounded-full text-[#D4AF37] border border-[#D4AF37]/40"
                    style={{
                      fontSize: "0.7rem",
                      background: "rgba(10,10,10,0.8)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {m.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="text-[#F5F5DC]"
                    style={{ fontSize: "1.05rem", fontWeight: 600 }}
                  >
                    {m.title}
                  </h3>
                  <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Partners — Infinite Carousel */}
      <InfinitePartnersCarousel />

      {/* Testimonials */}
      <section
        id="about"
        className="py-20 px-4 bg-[#0f0f0f]"
        aria-label="آراء عملائنا"
      >
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="آراء عملائنا" subtitle="ثقتكم تُلهمنا" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="p-6 rounded-2xl border border-[#D4AF37]/15 relative"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(10,10,10,0.95) 100%)",
                }}
              >
                <div
                  className="text-[#D4AF37]/30 mb-4"
                  style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    fontFamily: "serif",
                  }}
                >
                  &ldquo;
                </div>
                <p className="text-[#F5F5DC]/70 text-sm leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span
                      key={si}
                      className="text-[#D4AF37]"
                      style={{ fontSize: "0.9rem" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      className="text-[#F5F5DC]"
                      style={{ fontSize: "0.9rem", fontWeight: 600 }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[#F5F5DC]/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="py-20 px-4"
        aria-label="تواصل معنا"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-[#D4AF37] mb-3"
              style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
            >
              ✦ ابدأ رحلتك معنا ✦
            </p>
            <h2
              className="text-[#F5F5DC] mb-5"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 700,
              }}
            >
              جاهزون لإضافة لمسة فخامة لمناسبتك
            </h2>
            <p className="text-[#F5F5DC]/60 mb-10 leading-relaxed">
              تواصل معنا الآن واحصل على استشارة مجانية لتصميم تجربة ضيافة لا تُنسى
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5"
                style={{ fontWeight: 700, fontSize: "1rem" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل عبر واتساب
              </motion.a>
              <motion.a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                style={{ fontWeight: 500, fontSize: "1rem" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                اتصل بنا الآن
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// ============================================
// MAIN APP — Single Page with Sections
// ============================================
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { canInstall, triggerInstall } = usePWAInstall();

  // Prevent back-button exit on home page
  usePreventBackExit(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#F5F5DC]"
      dir="rtl"
      style={{
        fontFamily: "'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg shadow-black/50"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#DAA520] flex items-center justify-center shadow-lg shadow-[#D4AF37]/30">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-[#0a0a0a]"
              >
                <path
                  d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <span
                className="text-[#D4AF37] block leading-none"
                style={{ fontSize: "1.1rem", fontWeight: 700 }}
              >
                كيف الضيافة
              </span>
              <span
                className="text-[#F5F5DC]/60 block"
                style={{ fontSize: "0.65rem" }}
              >
                KEIF AL-DIAFA
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" role="navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#D4AF37] text-sm text-[#F5F5DC]/80"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#0a0a0a] text-sm transition-all duration-200 hover:bg-[#DAA520] hover:shadow-lg hover:shadow-[#D4AF37]/30"
              style={{ fontWeight: 600 }}
            >
              واتساب
            </a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <HomeSection />
      </main>

      {/* Footer */}
      <footer
        className="bg-[#080808] border-t border-[#D4AF37]/20 pt-12 pb-24 md:pb-12"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#DAA520] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 text-[#0a0a0a]"
                  >
                    <path
                      d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span
                  className="text-[#D4AF37]"
                  style={{ fontSize: "1.1rem", fontWeight: 700 }}
                >
                  كيف الضيافة
                </span>
              </div>
              <p className="text-[#F5F5DC]/60 text-sm leading-relaxed">
                منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية، توفر
                رحلة حسية متكاملة للزائر.
              </p>
            </div>
            <div>
              <h3
                className="text-[#D4AF37] mb-4"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                روابط سريعة
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-[#F5F5DC]/60 text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {serviceCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/services/${cat.slug}`}
                      className="text-[#F5F5DC]/60 text-sm hover:text-[#D4AF37] transition-colors"
                    >
                      {cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className="text-[#D4AF37] mb-4"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                تواصل معنا
              </h3>
              <div className="flex gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                  aria-label="تواصل عبر واتساب"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-colors"
                  aria-label="اتصل بنا"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors"
                  aria-label="تابعونا على إنستغرام"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D4AF37]/20 pt-6 text-center">
            <p className="text-[#F5F5DC]/40 text-xs">
              © {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 left-4 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40"
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 4px 20px rgba(37,211,102,0.4)",
            "0 4px 30px rgba(37,211,102,0.7)",
            "0 4px 20px rgba(37,211,102,0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="تواصل عبر واتساب"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>

      {/* Floating Menu Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#DAA520] text-[#0a0a0a] shadow-xl shadow-[#D4AF37]/40"
          style={{ fontWeight: 700, fontSize: "0.9rem" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="القائمة"
        >
          <motion.span
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            {isMenuOpen ? "✕" : "☰"}
          </motion.span>
          <span>القائمة</span>
        </motion.button>
      </div>

      {/* Pop-up Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(40,30,10,0.97) 100%)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "0 -10px 60px rgba(212,175,55,0.15)",
              }}
            >
              <div className="max-w-lg mx-auto px-6 py-8 pb-24">
                <div className="w-12 h-1 bg-[#D4AF37] rounded-full mx-auto mb-8" />
                <p
                  className="text-center text-[#D4AF37] mb-6"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}
                >
                  كيف الضيافة
                </p>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between w-full px-5 py-4 rounded-xl transition-all duration-200 group text-[#F5F5DC]/80 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] border border-transparent"
                        style={{ fontSize: "1.05rem", fontWeight: 500 }}
                      >
                        <span>{link.label}</span>
                        <span className="text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                          ←
                        </span>
                      </a>
                    </motion.div>
                  ))}

                  {/* Service Category Links */}
                  <div className="border-t border-[#D4AF37]/15 mt-2 pt-2">
                    <p className="text-[#D4AF37]/60 text-xs px-5 mb-2">
                      صفحات الخدمات
                    </p>
                    {serviceCategories.map((cat, i) => (
                      <motion.div
                        key={cat.slug}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: (navLinks.length + i) * 0.05,
                        }}
                      >
                        <Link
                          href={`/services/${cat.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between w-full px-5 py-3 rounded-xl transition-all duration-200 group text-[#F5F5DC]/60 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] border border-transparent"
                          style={{ fontSize: "0.95rem", fontWeight: 400 }}
                        >
                          <span className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span>{cat.title}</span>
                          </span>
                          <span className="text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">
                            ←
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="flex justify-center gap-4 mt-8">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm hover:bg-[#25D366]/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    واتساب
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm hover:bg-[#D4AF37]/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    اتصال
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
