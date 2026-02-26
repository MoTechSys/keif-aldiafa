'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Types
// ============================================
type PageType = 'home' | 'services' | 'offerings' | 'portfolio' | 'about' | 'contact'

// ============================================
// PWA Install Prompt Type
// ============================================
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// ============================================
// Constants
// ============================================
const WHATSAPP_NUMBER = "967770941666"
const INSTAGRAM_URL = "https://www.instagram.com/moain.7"
const EMAIL = "moain.learn@gmail.com"
const PHONE = "+967770941666"

const getWhatsAppLink = (message?: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`

const navLinks: { id: PageType; label: string }[] = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'services', label: 'خدماتنا' },
  { id: 'offerings', label: 'تقديماتنا وتوزيعاتنا' },
  { id: 'portfolio', label: 'معرض أعمالنا' },
  { id: 'about', label: 'من نحن' },
  { id: 'contact', label: 'تواصل معنا' },
]

// ============================================
// Image URLs
// ============================================
const images = {
  hero: "https://images.unsplash.com/photo-1758899058841-d70f58437fe5?w=1080&q=80",
  coffee: "https://images.unsplash.com/photo-1670351230643-27f874d17025?w=1080&q=80",
  catering: "https://images.unsplash.com/photo-1769812343266-323d6b508f24?w=1080&q=80",
  tea: "https://images.unsplash.com/photo-1572282924904-41bacfbd86a5?w=1080&q=80",
  event: "https://images.unsplash.com/photo-1720722023471-fbe5b68c3542?w=1080&q=80",
  waiter: "https://images.unsplash.com/photo-1610845325460-493f99d21de9?w=1080&q=80",
  woman: "https://images.unsplash.com/photo-1686545232018-bf8d11a36124?w=1080&q=80",
  equip: "https://images.unsplash.com/photo-1771830933605-ffbae3e3d1b5?w=1080&q=80",
  portfolio: "https://images.unsplash.com/photo-1768508951405-10e83c4a2872?w=1080&q=80",
  kitchen: "https://images.unsplash.com/photo-1771499194141-329333b53841?w=1080&q=80",
}

// ============================================
// Section Title Component
// ============================================
function SectionTitle({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className={`text-[#B8860B] mb-2 ${center ? "text-center" : ""}`} style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>
          ✦ {subtitle || "كيف الضيافة"} ✦
        </p>
        <h2 className={`text-[#F5F5DC] ${center ? "text-center" : ""}`} style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 700 }}>
          {title}
        </h2>
        <div className={`mt-3 h-px bg-gradient-to-r from-transparent via-[#B8860B] to-transparent ${center ? "mx-auto" : ""}`} style={{ width: "120px" }} />
      </motion.div>
    </div>
  )
}

// ============================================
// HOME PAGE
// ============================================
function HomePage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const whyCards = [
    { icon: "✦", title: "خبرة متميزة", desc: "سنوات من الخبرة في تقديم خدمات الضيافة الفاخرة للمناسبات الكبرى والحفلات الراقية" },
    { icon: "◈", title: "فريق احترافي", desc: "كوادر مدربة على أعلى مستوى من الاحتراف والأناقة لضمان تجربة لا تُنسى" },
    { icon: "❋", title: "تقديمات فاخرة", desc: "أرقى التقديمات من قهوة سعودية وشاي وحلويات فاخرة وتوزيعات متنوعة" },
    { icon: "◇", title: "تغطية شاملة", desc: "نغطي جميع مناطق المملكة العربية السعودية بأسطول متكامل من المعدات الفاخرة" },
  ]

  const moments = [
    { img: images.coffee, title: "القهوة السعودية الأصيلة", category: "مشروبات حارة" },
    { img: images.catering, title: "تجهيزات المناسبات الكبرى", category: "خدمات الضيافة" },
    { img: images.tea, title: "جلسات الشاي الفاخرة", category: "مشروبات" },
    { img: images.waiter, title: "فريق الضيافة المحترف", category: "الخدمات الرجالية" },
    { img: images.event, title: "حفلات الزفاف الفاخرة", category: "مناسبات" },
    { img: images.equip, title: "معدات التقديم الراقية", category: "المعدات" },
  ]

  const testimonials = [
    { name: "أحمد العمري", role: "مدير فعاليات", text: "كيف الضيافة رفعت مستوى مناسباتنا إلى آفاق جديدة. الاحترافية والفخامة في كل تفصيلة.", rating: 5 },
    { name: "نورة الشمري", role: "صاحبة مناسبة", text: "تجربة لا تُنسى، من أول لحظة حتى آخر لحظة. الفريق محترف وودود والتقديمات رائعة.", rating: 5 },
    { name: "فيصل الزهراني", role: "رجل أعمال", text: "اعتمدنا على كيف الضيافة في جميع فعاليات شركتنا. لم نخيب ظننا أبداً.", rating: 5 },
  ]

  const partners = ["شركة الراجحي", "أرامكو السعودية", "مجموعة بن لادن", "فندق الريتز كارلتون", "مطار الملك عبدالعزيز", "هيئة الأفلام", "موسم الرياض", "نيوم"]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src={images.hero} alt="كيف الضيافة" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/40 to-[#1a1a1a]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(184,134,11,0.08) 0%, transparent 70%)" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[#B8860B] mb-4" style={{ fontSize: "0.85rem", letterSpacing: "0.3em" }}>
            ✦ ✦ ✦
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-[#F5F5DC] mb-3" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, lineHeight: 1.2, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            كيف الضيافة
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-[#B8860B] mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 300, letterSpacing: "0.1em" }}>
            KEIF AL-DIAFA
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-[#F5F5DC]/70 max-w-lg mb-10" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.8 }}>
            منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية الأصيلة
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.9 }} className="flex gap-4 flex-wrap justify-center">
            <button onClick={() => onNavigate('services')} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-xl hover:shadow-[#B8860B]/40 transition-all duration-300 hover:-translate-y-0.5" style={{ fontWeight: 700, fontSize: "1rem" }}>
              اكتشف خدماتنا
            </button>
            <button onClick={() => onNavigate('portfolio')} className="px-8 py-3 rounded-full border border-[#B8860B]/50 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500, fontSize: "1rem" }}>
              معرض أعمالنا
            </button>
          </motion.div>

          <motion.div className="absolute bottom-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div className="w-6 h-10 rounded-full border-2 border-[#B8860B]/40 flex items-start justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-[#B8860B]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-[#B8860B]/10 via-[#B8860B]/5 to-[#B8860B]/10 border-y border-[#B8860B]/20 py-6">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "+500", label: "مناسبة ناجحة" },
            { num: "+50", label: "شريك موثوق" },
            { num: "+200", label: "عميل راضٍ" },
            { num: "8+", label: "سنوات خبرة" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-[#B8860B]" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700 }}>{s.num}</p>
              <p className="text-[#F5F5DC]/60 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Keif Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
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
              className="relative p-6 rounded-2xl border border-[#B8860B]/15 overflow-hidden group"
              style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)", backdropFilter: "blur(10px)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-[#B8860B] mb-4 relative z-10" style={{ fontSize: "2rem", lineHeight: 1 }}>{card.icon}</div>
              <h3 className="text-[#F5F5DC] mb-3 relative z-10" style={{ fontSize: "1.05rem", fontWeight: 600 }}>{card.title}</h3>
              <p className="text-[#F5F5DC]/55 text-sm leading-relaxed relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Moments */}
      <section className="py-20 px-4 bg-[#141414]">
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
                <Image src={m.img} alt={m.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[#B8860B] border border-[#B8860B]/40" style={{ fontSize: "0.7rem", background: "rgba(26,26,26,0.8)", backdropFilter: "blur(10px)" }}>
                    {m.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-[#F5F5DC]" style={{ fontSize: "1.05rem", fontWeight: 600 }}>{m.title}</h3>
                  <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-[#B8860B] transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => onNavigate('portfolio')} className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500 }}>
              عرض المزيد من الأعمال
              <span>←</span>
            </button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="شركاء النجاح" subtitle="نثق بهم ويثقون بنا" />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10" />
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10" />
          <motion.div className="flex gap-8 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="flex-shrink-0 px-8 py-4 rounded-xl border border-[#B8860B]/15 text-[#F5F5DC]/50 hover:text-[#B8860B] hover:border-[#B8860B]/40 transition-all duration-300 cursor-pointer whitespace-nowrap" style={{ background: "rgba(30,25,15,0.5)", fontSize: "0.9rem", fontWeight: 500 }}>
                {p}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#141414]">
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
                className="p-6 rounded-2xl border border-[#B8860B]/15 relative"
                style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}
              >
                <div className="text-[#B8860B]/30 mb-4" style={{ fontSize: "3rem", lineHeight: 1, fontFamily: "serif" }}>"</div>
                <p className="text-[#F5F5DC]/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <span key={si} className="text-[#B8860B]" style={{ fontSize: "0.9rem" }}>★</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B]/30 to-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[#F5F5DC]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{t.name}</p>
                    <p className="text-[#F5F5DC]/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ ابدأ رحلتك معنا ✦</p>
            <h2 className="text-[#F5F5DC] mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700 }}>جاهزون لإضافة لمسة فخامة لمناسبتك</h2>
            <p className="text-[#F5F5DC]/60 mb-10 leading-relaxed">تواصل معنا الآن واحصل على استشارة مجانية لتصميم تجربة ضيافة لا تُنسى</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5" style={{ fontWeight: 700, fontSize: "1rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                تواصل عبر واتساب
              </motion.a>
              <motion.a href={`tel:${PHONE}`} className="flex items-center gap-3 px-8 py-4 rounded-full border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500, fontSize: "1rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                اتصل بنا الآن
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ============================================
// SERVICES PAGE
// ============================================
function ServicesPage() {
  const [selected, setSelected] = useState<{
    id: string
    title: string
    subtitle: string
    img: string
    icon: string
    description: string
    features: string[]
    outfits?: { name: string; color: string }[]
  } | null>(null)

  const services = [
    {
      id: "male",
      title: "الخدمات الرجالية",
      subtitle: "Male Hospitality Services",
      img: images.waiter,
      icon: "♦",
      description: "فريق من المضيفين المحترفين المدربين على أعلى مستوى لتقديم خدمة الضيافة في المناسبات الرجالية والمحافل الرسمية.",
      features: ["مضيفون بزي رسمي فاخر", "تقديم القهوة السعودية والشاي", "خدمة طاولات الضيوف", "التنسيق مع إدارة الفعاليات", "مدربون على آداب الضيافة السعودية"],
      outfits: [{ name: "الزي الكلاسيكي الفاخر", color: "#2C2C2C" }, { name: "الزي التراثي المميز", color: "#4A3728" }, { name: "الزي الرسمي الأنيق", color: "#1C2840" }],
    },
    {
      id: "female",
      title: "الخدمات النسائية",
      subtitle: "Female Hospitality Services",
      img: images.woman,
      icon: "◈",
      description: "مضيفات متميزات يجمعن بين الأناقة والاحترافية لتقديم تجربة ضيافة راقية في المناسبات النسائية والفعاليات الفاخرة.",
      features: ["مضيفات بزي أنيق ومحتشم", "خدمة تقديم المشروبات والحلويات", "استقبال وتوجيه الضيفات", "إدارة طاولات العرض والتقديم", "تدريب على التميز في الخدمة"],
      outfits: [{ name: "العباءة الفاخرة الكلاسيكية", color: "#1a1a1a" }, { name: "الزي الخليجي الأنيق", color: "#3D2B1F" }, { name: "الزي الرسمي الراقي", color: "#2C1A3A" }],
    },
    {
      id: "artistic",
      title: "الخدمات الفنية",
      subtitle: "Artistic Services",
      img: images.catering,
      icon: "❋",
      description: "عروض ضيافة فنية مميزة تجمع بين التراث العربي الأصيل والإبداع العصري لإضافة لمسة فريدة لمناسبتك.",
      features: ["عرض صب القهوة السعودية التقليدي", "تحضير الشاي بأساليب فنية", "تنسيق وعرض الحلويات بشكل احترافي", "إضافة لمسات ثقافية وتراثية", "فرق العزف والاستقبال الموسيقي"],
      outfits: [],
    },
    {
      id: "equipment",
      title: "المعدات والتجهيزات",
      subtitle: "Equipment & Setup",
      img: images.equip,
      icon: "◇",
      description: "أسطول من أرقى المعدات والتجهيزات الفاخرة لضمان تجربة ضيافة متكاملة ومتميزة في كل المناسبات.",
      features: ["دلال قهوة ذهبية وفضية فاخرة", "أطقم شاي وقهوة من البورسلين الراقي", "طاولات وكراسي بتصاميم فاخرة", "معدات تبريد وتدفئة متطورة", "إضاءة وديكور مكمل للفعاليات"],
      outfits: [],
    },
  ]

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ خدمات متكاملة ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>خدماتنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">نقدم باقة متكاملة من خدمات الضيافة الفاخرة التي تلبي احتياجات جميع أنواع المناسبات</p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(s)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "16/9" }}
            >
              <Image src={s.img} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
              <div className="absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center text-[#B8860B] text-xl border border-[#B8860B]/30" style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(10px)" }}>
                {s.icon}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#B8860B] mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>{s.subtitle}</p>
                <h2 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.3rem", fontWeight: 700 }}>{s.title}</h2>
                <p className="text-[#F5F5DC]/60 text-sm line-clamp-2 mb-4">{s.description}</p>
                <span className="inline-flex items-center gap-2 text-[#B8860B] text-sm group-hover:gap-3 transition-all duration-300" style={{ fontWeight: 500 }}>
                  اعرف أكثر
                  <span>←</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(26,26,26,0.95) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          <p className="text-[#B8860B] mb-2" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ زر الاستفسار السريع ✦</p>
          <h3 className="text-[#F5F5DC] mb-4" style={{ fontSize: "1.3rem", fontWeight: 700 }}>هل تحتاج مساعدة في اختيار الخدمة المناسبة؟</h3>
          <p className="text-[#F5F5DC]/55 mb-6 text-sm">فريقنا جاهز لمساعدتك في اختيار باقة الخدمات المثالية لمناسبتك</p>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-xl hover:shadow-[#B8860B]/30 transition-all duration-300" style={{ fontWeight: 700, fontSize: "1rem" }}>
            استفسر الآن
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative max-w-2xl w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #242015 0%, #1a1a1a 100%)", border: "1px solid rgba(184,134,11,0.3)", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
              <div className="relative h-56 overflow-hidden">
                <Image src={selected.img} alt={selected.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                <button onClick={() => setSelected(null)} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1a1a1a]/80 border border-[#B8860B]/30 text-[#F5F5DC]/60 hover:text-[#B8860B] flex items-center justify-center text-lg transition-colors">✕</button>
              </div>
              <div className="p-6">
                <p className="text-[#B8860B] text-xs mb-1" style={{ letterSpacing: "0.15em" }}>{selected.subtitle}</p>
                <h2 className="text-[#F5F5DC] mb-4" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{selected.title}</h2>
                <p className="text-[#F5F5DC]/65 text-sm leading-relaxed mb-6">{selected.description}</p>
                <h3 className="text-[#B8860B] mb-3" style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.1em" }}>ما نقدمه:</h3>
                <ul className="space-y-2 mb-6">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#F5F5DC]/70">
                      <span className="text-[#B8860B]">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {selected.outfits && selected.outfits.length > 0 && (
                  <>
                    <h3 className="text-[#B8860B] mb-3" style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.1em" }}>الأزياء المتاحة:</h3>
                    <div className="flex gap-3 flex-wrap mb-6">
                      {selected.outfits.map((o, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B8860B]/20" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className="w-5 h-5 rounded-full border border-[#B8860B]/30" style={{ background: o.color }} />
                          <span className="text-[#F5F5DC]/60 text-xs">{o.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <a href={getWhatsAppLink(`مرحباً، أود الاستفسار عن ${selected.title}`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#B8860B]/30 transition-all duration-300" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
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

// ============================================
// OFFERINGS PAGE
// ============================================
function OfferingsPage() {
  const [activeCategory, setActiveCategory] = useState("hot")
  const [selectedItem, setSelectedItem] = useState<null | { name: string; desc: string; img: string }>(null)

  const categories = [
    { id: "hot", label: "مشروبات حارة", icon: "☕", items: [
      { name: "القهوة السعودية", desc: "بهارات مميزة وأصالة سعودية", img: images.coffee },
      { name: "القهوة العربية", desc: "بالهيل والزعفران", img: images.hero },
      { name: "الشاي الكرك", desc: "بالحليب والبهارات", img: images.tea },
      { name: "الشاي الأخضر", desc: "بالنعناع الطازج", img: images.tea },
    ]},
    { id: "cold", label: "مشروبات باردة", icon: "🧊", items: [
      { name: "عصير الليمون بالنعناع", desc: "منعش وطبيعي", img: images.hero },
      { name: "عصائر الفواكه الطازجة", desc: "تشكيلة متنوعة", img: images.coffee },
      { name: "المشروبات المثلجة", desc: "بنكهات متعددة", img: images.tea },
    ]},
    { id: "dates", label: "تمر فاخر", icon: "🌴", items: [
      { name: "تمر مجدول", desc: "أجود أنواع التمر السعودي", img: images.hero },
      { name: "تمر بالمكسرات", desc: "محشو بالجوز والبادام", img: images.coffee },
      { name: "تمر بالشوكولاتة", desc: "مكسو بشوكولاتة بلجيكية", img: images.equip },
      { name: "صواني التمر الفاخرة", desc: "تشكيلات راقية للمناسبات", img: images.tea },
    ]},
    { id: "sweets", label: "حلويات وشوكولاتة", icon: "🍫", items: [
      { name: "شوكولاتة بلجيكية", desc: "تشكيلة متنوعة من أجود الأنواع", img: images.hero },
      { name: "معمول فاخر", desc: "بالتمر والمكسرات", img: images.coffee },
      { name: "كنافة نابلسية", desc: "بعجينة الكنافة الأصيلة", img: images.tea },
      { name: "بسبوسة فاخرة", desc: "بطعم البلح والقشطة", img: images.equip },
    ]},
    { id: "pastry", label: "معجنات", icon: "🥐", items: [
      { name: "سمبوسة فاخرة", desc: "بحشوات متنوعة", img: images.coffee },
      { name: "كروسان بالجبن", desc: "طازج ومقرمش", img: images.hero },
      { name: "مناقيش زعتر", desc: "على الطريقة الشامية", img: images.tea },
    ]},
    { id: "equipment", label: "معدات التقديم", icon: "✨", items: [
      { name: "دلال ذهبية فاخرة", desc: "لتقديم القهوة بأسلوب راقٍ", img: images.equip },
      { name: "أطقم قهوة بورسلين", desc: "مزخرفة بتصاميم عربية", img: images.hero },
      { name: "صوانٍ فضية فاخرة", desc: "لتقديم التمر والحلويات", img: images.coffee },
    ]},
  ]

  const currentCategory = categories.find((c) => c.id === activeCategory)!

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ أرقى التقديمات ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>تقديماتنا وتوزيعاتنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">تشكيلة واسعة من أرقى المشروبات والحلويات والتقديمات الفاخرة لإضفاء لمسة مميزة على مناسباتكم</p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${activeCategory === cat.id ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] shadow-lg shadow-[#B8860B]/30" : "border border-[#B8860B]/20 text-[#F5F5DC]/60 hover:border-[#B8860B]/40 hover:text-[#B8860B]"}`}
              style={{ fontWeight: activeCategory === cat.id ? 700 : 400 }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentCategory.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }} onClick={() => setSelectedItem(item)} className="rounded-2xl overflow-hidden cursor-pointer group border border-[#B8860B]/10 hover:border-[#B8860B]/30 transition-all duration-300" style={{ background: "rgba(30,25,15,0.5)" }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[#B8860B] text-2xl">✦</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-[#F5F5DC]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{item.name}</h3>
                  <p className="text-[#F5F5DC]/50 text-xs mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative max-w-sm w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #242015 0%, #1a1a1a 100%)", border: "1px solid rgba(184,134,11,0.3)" }} onClick={(e) => e.stopPropagation()}>
              <div className="relative h-56">
                <Image src={selectedItem.img} alt={selectedItem.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1a1a1a]/80 border border-[#B8860B]/30 text-[#F5F5DC]/60 hover:text-[#B8860B] flex items-center justify-center transition-colors">✕</button>
              </div>
              <div className="p-6">
                <h2 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.3rem", fontWeight: 700 }}>{selectedItem.name}</h2>
                <p className="text-[#F5F5DC]/60 text-sm mb-6">{selectedItem.desc}</p>
                <a href={getWhatsAppLink(`مرحباً، أود الاستفسار عن ${selectedItem.name}`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-lg transition-all duration-300" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  استفسر الآن
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// PORTFOLIO PAGE
// ============================================
function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const projects = [
    { id: 1, img: images.portfolio, title: "حفل شركة أرامكو السعودية", desc: "تجهيز وإدارة ضيافة فاخرة لحفل السنوي لأرامكو السعودية بحضور أكثر من ٥٠٠ ضيف", category: "events", tags: ["حفلات كبرى", "شركات"] },
    { id: 2, img: images.coffee, title: "حفل قهوة تراثي", desc: "عرض صب القهوة السعودية بالطريقة التقليدية", category: "hospitality", tags: ["قهوة", "تراثي"] },
    { id: 3, img: images.event, title: "حفل زفاف فاخر", desc: "ضيافة متكاملة لحفل زفاف راقٍ بمنطقة الرياض", category: "events", tags: ["زفاف", "رياض"] },
    { id: 4, img: images.catering, title: "مؤتمر رجال الأعمال", desc: "تجهيز قاعات وتقديم ضيافة متميزة لمؤتمر كبار المستثمرين", category: "events", tags: ["مؤتمرات", "أعمال"] },
    { id: 5, img: images.tea, title: "جلسة شاي فاخرة", desc: "تقديم الشاي الفاخر بأساليب إبداعية في مناسبة نسائية", category: "food", tags: ["شاي", "نسائي"] },
    { id: 6, img: images.waiter, title: "خدمة الضيافة الرجالية", desc: "فريق المضيفين الرجاليين في حفل ملكي فاخر", category: "hospitality", tags: ["خدمة", "رجالي"] },
    { id: 7, img: images.kitchen, title: "خلف الكواليس - التحضير", desc: "لقطة من عملية التحضير والتجهيز قبيل إحدى الفعاليات الكبرى", category: "behind", tags: ["كواليس", "تحضير"] },
    { id: 8, img: images.woman, title: "فريق الضيافة النسائية", desc: "مضيفاتنا المتميزات في حفل عيد الميلاد الخمسين لإحدى الشركات", category: "hospitality", tags: ["نسائي", "احتفالية"] },
    { id: 9, img: images.equip, title: "معدات التقديم الفاخرة", desc: "عرض لأرقى المعدات الذهبية المستخدمة في الفعاليات الملكية", category: "food", tags: ["معدات", "ذهبي"] },
    { id: 10, img: images.hero, title: "تقديمات موسم الرياض", desc: "مشاركتنا في موسم الرياض وتقديم تجربة ضيافة استثنائية", category: "events", tags: ["موسم الرياض", "فعاليات"] },
    { id: 11, img: images.coffee, title: "خلف الكواليس - القهوة", desc: "لحظات التحضير والإعداد لأرقى أنواع القهوة العربية", category: "behind", tags: ["كواليس", "قهوة"] },
    { id: 12, img: images.portfolio, title: "حفل حكومي رسمي", desc: "ضيافة حفل حكومي رسمي بحضور كبار المسؤولين", category: "events", tags: ["حكومي", "رسمي"] },
  ]

  const filters: { id: string; label: string }[] = [
    { id: "all", label: "الكل" },
    { id: "events", label: "الفعاليات" },
    { id: "hospitality", label: "الضيافة" },
    { id: "food", label: "التقديمات" },
    { id: "behind", label: "خلف الكواليس" },
  ]

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ الدليل البصري ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>معرض أعمالنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">لحظات من إبداعاتنا وأعمالنا المتميزة في عالم الضيافة الفاخرة</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${activeFilter === f.id ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] shadow-lg shadow-[#B8860B]/30" : "border border-[#B8860B]/20 text-[#F5F5DC]/60 hover:border-[#B8860B]/40 hover:text-[#B8860B]"}`} style={{ fontWeight: activeFilter === f.id ? 700 : 400 }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project) => (
              <motion.div key={project.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className="relative rounded-xl overflow-hidden cursor-pointer group" style={{ aspectRatio: "4/3" }}>
                <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-[#F5F5DC] text-sm" style={{ fontWeight: 600 }}>{project.title}</h3>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {project.tags.map((t) => (
                      <span key={t} className="text-[#B8860B] px-2 py-0.5 rounded-full border border-[#B8860B]/30" style={{ fontSize: "0.65rem", background: "rgba(26,26,26,0.7)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ============================================
// ABOUT PAGE
// ============================================
function AboutPage() {
  const values = [
    { icon: "✦", title: "الجودة أولاً", desc: "نلتزم بأعلى معايير الجودة في كل تفصيلة من تفاصيل خدماتنا" },
    { icon: "◈", title: "الأصالة والهوية", desc: "نفخر بتراثنا العربي الأصيل ونعكسه في كل لحظة ضيافة" },
    { icon: "❋", title: "الاحترافية", desc: "فريقنا مدرب على أعلى مستوى من الاحترافية والتميز" },
    { icon: "◇", title: "الابتكار", desc: "نجمع بين الأصالة والحداثة لنقدم تجارب ضيافة فريدة ومبتكرة" },
  ]

  const team = [
    { name: "محمد العمري", role: "المدير التنفيذي", img: images.waiter },
    { name: "سعود الشمري", role: "مدير العمليات", img: images.coffee },
    { name: "خالد الزهراني", role: "مدير الجودة", img: images.hero },
  ]

  const milestones = [
    { year: "2016", event: "تأسيس كيف الضيافة بالرياض" },
    { year: "2018", event: "توسع الخدمات لتشمل المنطقة الغربية" },
    { year: "2020", event: "تجاوزنا ١٠٠ مناسبة ناجحة" },
    { year: "2022", event: "المشاركة في موسم الرياض الكبير" },
    { year: "2024", event: "أكثر من ٥٠٠ مناسبة وعملاء في كل أنحاء المملكة" },
    { year: "2026", event: "إطلاق المنصة الرقمية الفاخرة" },
  ]

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ قصتنا ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>من نحن</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={images.hero} alt="كيف الضيافة" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 to-transparent" />
              <div className="absolute top-4 right-4 bottom-4 left-4 border border-[#B8860B]/20 rounded-2xl pointer-events-none" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ رؤيتنا ✦</p>
            <h2 className="text-[#F5F5DC] mb-5" style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700 }}>رحلة من الشغف نحو الفخامة</h2>
            <div className="space-y-4 text-[#F5F5DC]/65 text-sm leading-relaxed">
              <p>انطلقت "كيف الضيافة" من رؤية واضحة: تحويل كل مناسبة إلى تجربة لا تُنسى تجمع بين الأصالة العربية الأصيلة وأرقى معايير الفخامة المعاصرة.</p>
              <p>منذ تأسيسنا عام ٢٠١٦، قدمنا خدماتنا لأكثر من ٥٠٠ مناسبة في مختلف أرجاء المملكة العربية السعودية، من حفلات الزفاف الفاخرة إلى الفعاليات الحكومية الكبرى.</p>
              <p>فلسفتنا بسيطة: "البساطة هي قمة التعقيد"، ونؤمن بأن التفاصيل الصغيرة هي التي تصنع الفارق وتترك الأثر العميق في نفوس ضيوفكم.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#B8860B] mb-2" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ ما يميزنا ✦</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}>قيمنا ومبادئنا</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl border border-[#B8860B]/15 hover:border-[#B8860B]/30 transition-all duration-300" style={{ background: "rgba(30,25,15,0.5)" }}>
                <div className="text-[#B8860B] mx-auto mb-4 w-14 h-14 rounded-full border border-[#B8860B]/30 flex items-center justify-center" style={{ fontSize: "1.6rem", background: "rgba(184,134,11,0.08)" }}>{v.icon}</div>
                <h3 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>{v.title}</h3>
                <p className="text-[#F5F5DC]/55 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#B8860B] mb-2" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ مسيرتنا ✦</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}>محطات مضيئة</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mt-3" />
          </div>
          <div className="relative">
            <div className="absolute right-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#B8860B]/60 via-[#B8860B]/30 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-6 pr-14 relative">
                  <div className="absolute right-4 top-1.5 w-5 h-5 rounded-full bg-[#1a1a1a] border-2 border-[#B8860B] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#B8860B]" />
                  </div>
                  <div className="p-4 rounded-xl border border-[#B8860B]/15 flex-1" style={{ background: "rgba(30,25,15,0.4)" }}>
                    <span className="text-[#B8860B] block mb-1" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}>{m.year}</span>
                    <p className="text-[#F5F5DC]/75 text-sm">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#B8860B] mb-2" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ خبراء الضيافة ✦</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}>فريق القيادة</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#B8860B]/30 group-hover:border-[#B8860B] transition-all duration-300">
                  <Image src={member.img} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-[#F5F5DC]" style={{ fontSize: "1rem", fontWeight: 600 }}>{member.name}</h3>
                <p className="text-[#B8860B] text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ============================================
// CONTACT PAGE
// ============================================
function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.
الاسم: ${form.name}
الهاتف: ${form.phone}
البريد الإلكتروني: ${form.email}
الخدمة المطلوبة: ${form.service}
التاريخ المقترح: ${form.date}
تفاصيل إضافية: ${form.message}`
    window.open(getWhatsAppLink(msg), "_blank")
    setSubmitted(true)
  }

  return (
    <div className="pt-24 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ نسعد بتواصلكم ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>تواصل معنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">فريقنا جاهز لمساعدتكم في تصميم تجربة ضيافة مثالية لمناسبتكم</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[#F5F5DC] mb-8" style={{ fontSize: "1.2rem", fontWeight: 700 }}>طرق التواصل المباشر</h2>
            <div className="space-y-4 mb-12">
              {/* WhatsApp */}
              <motion.a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" whileHover={{ x: -5 }} className="flex items-center gap-4 p-5 rounded-2xl border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 group" style={{ background: "rgba(37,211,102,0.05)" }}>
                <div className="w-14 h-14 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </div>
                <div>
                  <p className="text-[#25D366]" style={{ fontWeight: 600 }}>تواصل عبر واتساب</p>
                  <p className="text-[#F5F5DC]/50 text-sm">ردود فورية طوال اليوم</p>
                  <p className="text-[#F5F5DC]/40 text-xs mt-1">+967 770 941 666</p>
                </div>
              </motion.a>
              {/* Phone */}
              <motion.a href={`tel:${PHONE}`} whileHover={{ x: -5 }} className="flex items-center gap-4 p-5 rounded-2xl border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 group" style={{ background: "rgba(184,134,11,0.05)" }}>
                <div className="w-14 h-14 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-[#B8860B]" style={{ fontWeight: 600 }}>اتصل بنا مباشرة</p>
                  <p className="text-[#F5F5DC]/50 text-sm">من ٨ صباحاً حتى ١٢ منتصف الليل</p>
                  <p className="text-[#F5F5DC]/40 text-xs mt-1">+967 770 941 666</p>
                </div>
              </motion.a>
              {/* Instagram */}
              <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" whileHover={{ x: -5 }} className="flex items-center gap-4 p-5 rounded-2xl border border-[#E1306C]/20 hover:border-[#E1306C]/40 transition-all duration-300 group" style={{ background: "rgba(225,48,108,0.05)" }}>
                <div className="w-14 h-14 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </div>
                <div>
                  <p className="text-[#E1306C]" style={{ fontWeight: 600 }}>تابعونا على إنستغرام</p>
                  <p className="text-[#F5F5DC]/50 text-sm">آخر أعمالنا ومشاريعنا</p>
                  <p className="text-[#F5F5DC]/40 text-xs mt-1">@moain.7</p>
                </div>
              </motion.a>
              {/* Email */}
              <motion.a href={`mailto:${EMAIL}`} whileHover={{ x: -5 }} className="flex items-center gap-4 p-5 rounded-2xl border border-[#B8860B]/15 hover:border-[#B8860B]/30 transition-all duration-300" style={{ background: "rgba(30,25,15,0.4)" }}>
                <div className="w-14 h-14 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]/70 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-[#F5F5DC]/80" style={{ fontWeight: 500 }}>البريد الإلكتروني</p>
                  <p className="text-[#B8860B] text-sm">{EMAIL}</p>
                </div>
              </motion.a>
            </div>
            {/* Service Areas */}
            <div className="p-5 rounded-2xl border border-[#B8860B]/15" style={{ background: "rgba(30,25,15,0.4)" }}>
              <h3 className="text-[#B8860B] mb-3" style={{ fontSize: "0.9rem", fontWeight: 600 }}>✦ مناطق التغطية</h3>
              <div className="flex flex-wrap gap-2">
                {["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر", "أبها", "تبوك"].map((city) => (
                  <span key={city} className="px-3 py-1 rounded-full text-[#F5F5DC]/60 text-xs border border-[#B8860B]/15" style={{ background: "rgba(184,134,11,0.05)" }}>{city}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-[#B8860B]/20" style={{ background: "rgba(30,25,15,0.5)" }}>
                <div className="w-20 h-20 rounded-full bg-[#B8860B]/15 border-2 border-[#B8860B] flex items-center justify-center text-[#B8860B] text-3xl mb-6">✓</div>
                <h3 className="text-[#F5F5DC] mb-3" style={{ fontSize: "1.3rem", fontWeight: 700 }}>شكراً لتواصلك معنا!</h3>
                <p className="text-[#F5F5DC]/60 text-sm mb-6">تم إرسال رسالتك عبر واتساب. سيتواصل معك فريقنا في أقرب وقت ممكن.</p>
                <button onClick={() => setSubmitted(false)} className="px-6 py-2 rounded-full border border-[#B8860B]/40 text-[#B8860B] text-sm hover:bg-[#B8860B]/10 transition-colors">إرسال رسالة أخرى</button>
              </motion.div>
            ) : (
              <div className="p-6 rounded-3xl border border-[#B8860B]/15" style={{ background: "rgba(30,25,15,0.4)" }}>
                <h2 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>نموذج الاستفسار</h2>
                <p className="text-[#F5F5DC]/50 text-sm mb-6">سيتم إرسال رسالتك مباشرة عبر واتساب لضمان الرد السريع</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F5F5DC]/60 text-xs mb-1.5">الاسم الكريم</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="محمد العمري" className="w-full px-4 py-3 rounded-xl text-[#F5F5DC] placeholder-[#F5F5DC]/25 outline-none text-sm transition-all duration-200 focus:border-[#B8860B]/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,134,11,0.2)" }} />
                    </div>
                    <div>
                      <label className="block text-[#F5F5DC]/60 text-xs mb-1.5">رقم الهاتف</label>
                      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+966 5X XXX XXXX" className="w-full px-4 py-3 rounded-xl text-[#F5F5DC] placeholder-[#F5F5DC]/25 outline-none text-sm transition-all duration-200 focus:border-[#B8860B]/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,134,11,0.2)" }} dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#F5F5DC]/60 text-xs mb-1.5">البريد الإلكتروني</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@email.com" className="w-full px-4 py-3 rounded-xl text-[#F5F5DC] placeholder-[#F5F5DC]/25 outline-none text-sm transition-all duration-200 focus:border-[#B8860B]/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,134,11,0.2)" }} dir="ltr" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F5F5DC]/60 text-xs mb-1.5">الخدمة المطلوبة</label>
                      <select name="service" value={form.service} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200" style={{ background: "#1e180a", border: "1px solid rgba(184,134,11,0.2)", color: form.service ? "#F5F5DC" : "rgba(245,245,220,0.3)" }}>
                        <option value="" disabled>اختر الخدمة</option>
                        <option value="ضيافة رجالية">ضيافة رجالية</option>
                        <option value="ضيافة نسائية">ضيافة نسائية</option>
                        <option value="خدمات فنية">خدمات فنية</option>
                        <option value="تأجير معدات">تأجير معدات</option>
                        <option value="باقة متكاملة">باقة متكاملة</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#F5F5DC]/60 text-xs mb-1.5">التاريخ المقترح</label>
                      <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3 rounded-xl text-[#F5F5DC]/70 outline-none text-sm transition-all duration-200 focus:border-[#B8860B]/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,134,11,0.2)", colorScheme: "dark" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#F5F5DC]/60 text-xs mb-1.5">تفاصيل إضافية</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="اكتب هنا أي تفاصيل إضافية عن مناسبتك..." className="w-full px-4 py-3 rounded-xl text-[#F5F5DC] placeholder-[#F5F5DC]/25 outline-none text-sm resize-none transition-all duration-200 focus:border-[#B8860B]/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,134,11,0.2)" }} />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-xl hover:shadow-[#B8860B]/30 transition-all duration-300 flex items-center justify-center gap-3" style={{ fontWeight: 700, fontSize: "1rem" }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    إرسال عبر واتساب
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(true) // يظهر افتراضياً
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false)
  }, [currentPage])

  // PWA Install Logic
  useEffect(() => {
    // Check if running as standalone PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as unknown as { standalone?: boolean }).standalone === true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsStandalone(standalone)

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: boolean }).MSStream
    setIsIOS(isIOSDevice)

    // Listen for beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true')
        setShowInstallBanner(false)
      }
      setDeferredPrompt(null)
    }
  }

  const handleDismissInstall = () => {
    setShowInstallBanner(false)
    localStorage.setItem('pwa-install-dismissed', 'true')
  }

  const navigateTo = (page: PageType) => setCurrentPage(page)

  const getWhatsAppMessage = () => {
    switch (currentPage) {
      case 'services': return "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."
      case 'offerings': return "مرحباً، أود الاستفسار عن تقديماتكم وتوزيعاتكم."
      case 'portfolio': return "مرحباً، أود الاطلاع على المزيد من أعمالكم."
      default: return "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#F5F5DC]" dir="rtl" style={{ fontFamily: "'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif" }}>
      {/* PWA Install Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] p-4"
          >
            <div className="max-w-lg mx-auto rounded-2xl p-4 shadow-2xl" style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.98) 0%, rgba(26,26,26,0.98) 100%)", border: "1px solid rgba(184,134,11,0.4)", boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(184,134,11,0.2)" }}>
              <div className="flex items-center gap-4">
                {/* App Icon */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#1a1a1a]">
                    <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
                  </svg>
                </div>
                
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F5F5DC]" style={{ fontSize: "1rem", fontWeight: 700 }}>ثبّت التطبيق</h3>
                  <p className="text-[#F5F5DC]/60 text-sm mt-0.5">
                    {isIOS 
                      ? "اضغط  ثم \"إضافة إلى الشاشة الرئيسية\""
                      : "للوصول السريع وتجربة أفضل"
                    }
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDismissInstall}
                    className="p-2 rounded-full text-[#F5F5DC]/40 hover:text-[#F5F5DC]/70 hover:bg-white/5 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {!isIOS && (
                    <motion.button
                      onClick={handleInstallClick}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تثبيت
                    </motion.button>
                  )}
                </div>
              </div>

              {/* iOS Instructions */}
              {isIOS && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-3 pt-3 border-t border-[#B8860B]/20"
                >
                  <div className="flex items-center gap-3 text-sm text-[#F5F5DC]/70">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#B8860B]/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#B8860B]">
                        <path d="M16.5 1h-9C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h9c1.38 0 2.5-1.12 2.5-2.5v-17C19 2.12 17.88 1 16.5 1zm-4.5 20.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7.5V4h9v13.5z"/>
                      </svg>
                    </div>
                    <p>اضغط على زن <span className="inline-block mx-1 px-2 py-0.5 bg-[#B8860B]/20 rounded text-[#B8860B]">↑</span> في أسفل الشاشة، ثم اختر "إضافة إلى الشاشة الرئيسية"</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg shadow-black/50" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg shadow-[#B8860B]/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#1a1a1a]">
                <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="text-[#B8860B] block leading-none" style={{ fontSize: "1.1rem", fontWeight: 700 }}>كيف الضيافة</span>
              <span className="text-[#F5F5DC]/60 block" style={{ fontSize: "0.65rem" }}>KEIF AL-DIAFA</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`transition-colors duration-200 hover:text-[#B8860B] text-sm ${currentPage === link.id ? "text-[#B8860B]" : "text-[#F5F5DC]/80"}`}>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={() => setShowInstallBanner(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#B8860B]/50 text-[#B8860B] text-sm transition-all duration-200 hover:bg-[#B8860B]/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              تثبيت
            </motion.button>
            <a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-[#B8860B] text-[#1a1a1a] text-sm transition-all duration-200 hover:bg-[#DAA520] hover:shadow-lg hover:shadow-[#B8860B]/30" style={{ fontWeight: 600 }}>واتساب</a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'offerings' && <OfferingsPage />}
            {currentPage === 'portfolio' && <PortfolioPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-[#B8860B]/20 pt-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[#1a1a1a]">
                    <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[#B8860B]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>كيف الضيافة</span>
              </div>
              <p className="text-[#F5F5DC]/60 text-sm leading-relaxed">منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية، توفر رحلة حسية متكاملة للزائر.</p>
            </div>
            <div>
              <h3 className="text-[#B8860B] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>روابط سريعة</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => navigateTo(link.id)} className="text-[#F5F5DC]/60 text-sm hover:text-[#B8860B] transition-colors">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#B8860B] mb-4" style={{ fontSize: "1rem", fontWeight: 600 }}>تواصل معنا</h3>
              <div className="flex gap-3">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a href={`tel:${PHONE}`} className="w-10 h-10 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] hover:bg-[#B8860B]/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#B8860B]/20 pt-6 text-center">
            <p className="text-[#F5F5DC]/40 text-xs">© {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="fixed bottom-24 left-4 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40" animate={{ scale: [1, 1.08, 1], boxShadow: ["0 4px 20px rgba(37,211,102,0.4)", "0 4px 30px rgba(37,211,102,0.7)", "0 4px 20px rgba(37,211,102,0.4)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} aria-label="تواصل عبر واتساب">
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </motion.a>

      {/* Floating Install Button - Mobile */}
      <motion.button
        onClick={() => setShowInstallBanner(true)}
        className="fixed bottom-40 left-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg shadow-[#B8860B]/40 md:hidden"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="تثبيت التطبيق"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[#1a1a1a]">
          <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>

      {/* Floating Menu Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] shadow-xl shadow-[#B8860B]/40" style={{ fontWeight: 700, fontSize: "0.9rem" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.span animate={{ rotate: isMenuOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-lg">{isMenuOpen ? "✕" : "☰"}</motion.span>
          <span>القائمة</span>
        </motion.button>
      </div>

      {/* Pop-up Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(26,26,26,0.97) 0%, rgba(40,30,10,0.97) 100%)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(184,134,11,0.3)", boxShadow: "0 -10px 60px rgba(184,134,11,0.15)" }}>
              <div className="max-w-lg mx-auto px-6 py-8 pb-24">
                <div className="w-12 h-1 bg-[#B8860B] rounded-full mx-auto mb-8" />
                <p className="text-center text-[#B8860B] mb-6" style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}>كيف الضيافة</p>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <button onClick={() => { navigateTo(link.id); setIsMenuOpen(false) }} className={`flex items-center justify-between w-full px-5 py-4 rounded-xl transition-all duration-200 group ${currentPage === link.id ? "bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B]/30" : "text-[#F5F5DC]/80 hover:bg-[#B8860B]/10 hover:text-[#B8860B] border border-transparent"}`} style={{ fontSize: "1.05rem", fontWeight: 500 }}>
                        <span>{link.label}</span>
                        <span className="text-[#B8860B]/60 group-hover:text-[#B8860B] transition-colors">←</span>
                      </button>
                    </motion.div>
                  ))}
                </nav>
                <div className="flex justify-center gap-4 mt-8">
                  <motion.button
                    onClick={() => { setShowInstallBanner(true); setIsMenuOpen(false) }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] text-sm font-bold hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <path d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    تثبيت
                  </motion.button>
                  <a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm hover:bg-[#25D366]/20 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    واتساب
                  </a>
                  <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] text-sm hover:bg-[#B8860B]/20 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    اتصال
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
