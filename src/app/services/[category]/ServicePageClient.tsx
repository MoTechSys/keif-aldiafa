'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getWhatsAppLink } from '@/data/constants'

interface Outfit {
  name: string
  color: string
  image: string
}

interface ServiceItem {
  id: string
  name: string
  nameEn: string
  description: string
  image: string
  features: string[]
  outfits: Outfit[]
  whatsappMessage: string
}

interface CategoryData {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  heroImage: string
  services: ServiceItem[]
}

interface ServicePageClientProps {
  category: string
  data: CategoryData
}

export default function ServicePageClient({ data }: ServicePageClientProps) {
  const [selected, setSelected] = useState<ServiceItem | null>(null)

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Hero Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#B8860B]/60 hover:text-[#B8860B] transition-colors text-sm mb-6"
          >
            <span>→</span>
            <span>العودة للرئيسية</span>
          </Link>

          <div className="text-[#B8860B] text-3xl mb-4">{data.icon}</div>
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>
            ✦ {data.subtitle} ✦
          </p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>
            {data.title}
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">{data.description}</p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(service)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group border border-[#B8860B]/10 hover:border-[#B8860B]/30 transition-all duration-300"
              style={{ background: "rgba(30,25,15,0.5)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-[#B8860B] mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>
                  {service.nameEn}
                </p>
                <h3 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {service.name}
                </h3>
                <p className="text-[#F5F5DC]/60 text-sm line-clamp-2 mb-4">{service.description}</p>

                {/* Outfits preview */}
                {service.outfits.length > 0 && (
                  <div className="flex gap-1 mb-4">
                    {service.outfits.map((outfit, oi) => (
                      <div
                        key={oi}
                        className="w-6 h-6 rounded-full border border-[#B8860B]/30"
                        style={{ background: outfit.color }}
                        title={outfit.name}
                      />
                    ))}
                  </div>
                )}

                <span
                  className="inline-flex items-center gap-2 text-[#B8860B] text-sm group-hover:gap-3 transition-all duration-300"
                  style={{ fontWeight: 500 }}
                >
                  التفاصيل والأزياء
                  <span>←</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(26,26,26,0.95) 100%)",
            border: "1px solid rgba(184,134,11,0.2)",
          }}
        >
          <p className="text-[#B8860B] mb-2" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>
            ✦ زر الاستفسار السريع ✦
          </p>
          <h3 className="text-[#F5F5DC] mb-4" style={{ fontSize: "1.3rem", fontWeight: 700 }}>
            هل تحتاج مساعدة في اختيار الخدمة المناسبة؟
          </h3>
          <p className="text-[#F5F5DC]/55 mb-6 text-sm">
            فريقنا جاهز لمساعدتك في اختيار باقة الخدمات المثالية لمناسبتك
          </p>
          <a
            href={getWhatsAppLink(`مرحباً، أود الاستفسار عن ${data.title}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-xl hover:shadow-[#B8860B]/30 transition-all duration-300"
            style={{ fontWeight: 700, fontSize: "1rem" }}
          >
            استفسر الآن
          </a>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-2xl w-full rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #242015 0%, #1a1a1a 100%)",
                border: "1px solid rgba(184,134,11,0.3)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1a1a1a]/80 border border-[#B8860B]/30 text-[#F5F5DC]/60 hover:text-[#B8860B] flex items-center justify-center text-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[#B8860B] text-xs mb-1" style={{ letterSpacing: "0.15em" }}>
                  {selected.nameEn}
                </p>
                <h2 className="text-[#F5F5DC] mb-4" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                  {selected.name}
                </h2>
                <p className="text-[#F5F5DC]/65 text-sm leading-relaxed mb-6">{selected.description}</p>

                {/* Features */}
                <h3
                  className="text-[#B8860B] mb-3"
                  style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  ما نقدمه:
                </h3>
                <ul className="space-y-2 mb-6">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#F5F5DC]/70">
                      <span className="text-[#B8860B]">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Outfits */}
                {selected.outfits.length > 0 && (
                  <>
                    <h3
                      className="text-[#B8860B] mb-3"
                      style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.1em" }}
                    >
                      الأزياء المتاحة:
                    </h3>
                    <div className="flex gap-3 flex-wrap mb-6">
                      {selected.outfits.map((outfit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B8860B]/20"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-[#B8860B]/30"
                            style={{ background: outfit.color }}
                          />
                          <span className="text-[#F5F5DC]/60 text-xs">{outfit.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* WhatsApp Button */}
                <a
                  href={getWhatsAppLink(selected.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#B8860B]/30 transition-all duration-300"
                  style={{ fontWeight: 700, fontSize: "0.95rem" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  استفسر عن هذه الخدمة
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
