"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceCategory, ServiceItem } from "@/data/services";
import { resolveImage, getWhatsAppLink } from "@/data/services";

interface ServiceCategoryPageProps {
  category: ServiceCategory;
  allCategories: ServiceCategory[];
}

export default function ServiceCategoryPage({
  category,
  allCategories,
}: ServiceCategoryPageProps) {
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
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
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-sm hover:bg-[#D4AF37]/10 transition-colors"
          >
            الرئيسية ←
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12" dir="rtl">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-[#D4AF37] mb-3"
              style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}
            >
              ✦ {category.subtitle} ✦
            </p>
            <h1
              className="text-[#F5F5DC] mb-4"
              style={{
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 700,
              }}
            >
              {category.title}
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
            <p className="text-[#F5F5DC]/60 max-w-2xl mx-auto text-sm leading-relaxed md:text-base">
              {category.longDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 mb-12" dir="rtl">
        <div className="flex gap-3 flex-wrap justify-center">
          {allCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services/${cat.slug}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                cat.slug === category.slug
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#DAA520] text-[#0a0a0a] shadow-lg shadow-[#D4AF37]/30 font-bold"
                  : "border border-[#D4AF37]/20 text-[#F5F5DC]/60 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(service)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
              style={{ background: "rgba(26,26,26,0.6)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={resolveImage(service.image)}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-lg border border-[#D4AF37]/30 bg-[#0a0a0a]/70 backdrop-blur-sm">
                  {service.icon}
                </div>
              </div>
              <div className="p-5">
                <p
                  className="text-[#D4AF37] mb-1"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  {service.subtitle}
                </p>
                <h2
                  className="text-[#F5F5DC] mb-2"
                  style={{ fontSize: "1.1rem", fontWeight: 700 }}
                >
                  {service.title}
                </h2>
                <p className="text-[#F5F5DC]/55 text-sm line-clamp-2 mb-3">
                  {service.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[#D4AF37] text-sm group-hover:gap-3 transition-all duration-300"
                  style={{ fontWeight: 500 }}
                >
                  التفاصيل
                  <span>←</span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(10,10,10,0.95) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <p
            className="text-[#D4AF37] mb-2"
            style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
          >
            ✦ زر الاستفسار السريع ✦
          </p>
          <h3
            className="text-[#F5F5DC] mb-4"
            style={{ fontSize: "1.3rem", fontWeight: 700 }}
          >
            هل تحتاج مساعدة في اختيار الخدمة المناسبة؟
          </h3>
          <p className="text-[#F5F5DC]/55 mb-6 text-sm">
            فريقنا جاهز لمساعدتك في اختيار باقة الخدمات المثالية لمناسبتك
          </p>
          <a
            href={getWhatsAppLink(
              `مرحباً، أود الاستفسار عن ${category.title}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#DAA520] text-[#0a0a0a] hover:shadow-xl hover:shadow-[#D4AF37]/30 transition-all duration-300"
            style={{ fontWeight: 700, fontSize: "1rem" }}
          >
            استفسر الآن عبر واتساب
          </a>
        </motion.div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            dir="rtl"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a0f 0%, #0a0a0a 100%)",
                border: "1px solid rgba(212,175,55,0.3)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={resolveImage(selected.image)}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#0a0a0a]/80 border border-[#D4AF37]/30 text-[#F5F5DC]/60 hover:text-[#D4AF37] flex items-center justify-center text-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p
                  className="text-[#D4AF37] text-xs mb-1"
                  style={{ letterSpacing: "0.15em" }}
                >
                  {selected.subtitle}
                </p>
                <h2
                  className="text-[#F5F5DC] mb-4"
                  style={{ fontSize: "1.4rem", fontWeight: 700 }}
                >
                  {selected.title}
                </h2>
                <p className="text-[#F5F5DC]/65 text-sm leading-relaxed mb-6">
                  {selected.longDescription}
                </p>

                {/* Features */}
                <h3
                  className="text-[#D4AF37] mb-3"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                  }}
                >
                  ما نقدمه:
                </h3>
                <ul className="space-y-2 mb-6">
                  {selected.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-[#F5F5DC]/70"
                    >
                      <span className="text-[#D4AF37]">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Outfits */}
                {selected.outfits && selected.outfits.length > 0 && (
                  <>
                    <h3
                      className="text-[#D4AF37] mb-3"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                      }}
                    >
                      الأزياء المتاحة:
                    </h3>
                    <div className="flex gap-3 flex-wrap mb-6">
                      {selected.outfits.map((o, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#D4AF37]/20"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-[#D4AF37]/30"
                            style={{ background: o.color }}
                          />
                          <span className="text-[#F5F5DC]/60 text-xs">
                            {o.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* CTA Button */}
                <a
                  href={getWhatsAppLink(
                    `مرحباً، أود الاستفسار عن ${selected.title}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#DAA520] text-[#0a0a0a] hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
                  style={{ fontWeight: 700, fontSize: "0.95rem" }}
                >
                  استفسر عن هذه الخدمة
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple Footer */}
      <footer
        className="border-t border-[#D4AF37]/10 py-8 text-center"
        dir="rtl"
      >
        <p className="text-[#F5F5DC]/40 text-xs">
          © {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.
        </p>
      </footer>
    </div>
  );
}
