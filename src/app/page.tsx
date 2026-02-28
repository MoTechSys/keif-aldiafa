'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Types
// ============================================
type PageType = 'home' | 'services' | 'offerings' | 'portfolio' | 'about' | 'contact'
type ServiceCategory = 'male' | 'female' | 'other' | null

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
  { id: 'offerings', label: 'تقديماتنا' },
  { id: 'portfolio', label: 'معرض أعمالنا' },
  { id: 'about', label: 'من نحن' },
  { id: 'contact', label: 'تواصل معنا' },
]

// ============================================
// Image URLs - صور من الموقع الأصلي
// ============================================
const images = {
  hero: "/images/hero.jpg",
  coffee: "/images/gallery/gallery-1.jpg",
  catering: "/images/gallery/gallery-2.jpg",
  tea: "/images/gallery/gallery-3.jpg",
  event: "/images/gallery/gallery-4.jpg",
  waiter: "/images/gallery/gallery-5.jpg",
  woman: "/images/gallery/gallery-6.jpg",
  equip: "/images/gallery/gallery-7.jpg",
  portfolio: "/images/gallery/gallery-8.jpg",
  kitchen: "/images/gallery/gallery-9.jpg",
  logo: "/images/logo.png",
  banner1: "/images/old-site/banner-1.jpg",
  banner2: "/images/old-site/banner-2.jpg",
  banner3: "/images/old-site/banner-3.jpg",
}

// ============================================
// Service Data - البيانات الجديدة للخدمات
// ============================================
const maleServices = [
  {
    id: "hosts",
    title: "مضيفين",
    description: "مضيفون محترفون بزي رسمي فاخر لتقديم أفضل تجربة ضيافة",
    img: images.waiter,
    outfits: [
      { name: "الزي الكلاسيكي الأسود", color: "#1a1a1a" },
      { name: "الزي التراثي الذهبي", color: "#B8860B" },
      { name: "الزي الرسمي الأبيض", color: "#F5F5DC" },
    ]
  },
  {
    id: "zamzam",
    title: "سقيا زمزم",
    description: "خدمة تقديم ماء زمزم المبارك بأسلوب فاخر ومميز",
    img: images.coffee,
    outfits: [
      { name: "الزي التقليدي", color: "#2C2C2C" },
      { name: "الزي الفاخر", color: "#B8860B" },
    ]
  },
  {
    id: "safrja",
    title: "خدمات السفرجية",
    description: "سفرجية محترفة لإدارة وتنظيم الضيافة في المناسبات الكبرى",
    img: images.catering,
    outfits: [
      { name: "الزي الرسمي", color: "#1a1a1a" },
      { name: "الزي التنفيذي", color: "#2C3E50" },
    ]
  },
  {
    id: "sawas",
    title: "سواس صور",
    description: "خدمة تصوير احترافية لتوثيق لحظات ضيافتكم المميزة",
    img: images.portfolio,
    outfits: []
  }
]

const femaleServices = [
  {
    id: "hostesses",
    title: "مضيفات",
    description: "مضيفات متميزات بزي أنيق ومحتشم يعكس هوية كيف الضيافة",
    img: images.woman,
    outfits: [
      { name: "العباءة الفاخرة", color: "#1a1a1a" },
      { name: "الزي الخليجي", color: "#3D2B1F" },
      { name: "الزي الرسمي الراقي", color: "#2C1A3A" },
    ]
  }
]

const otherServices = [
  { id: "calligrapher", title: "خطاط", description: "خطاط محترف لكتابة بطاقات الدعوة والترحيب", img: images.coffee, icon: "✒️" },
  { id: "painter", title: "رسام", description: "رسام للعروض الحية في المناسبات", img: images.event, icon: "🎨" },
  { id: "painter-female", title: "رسامة", description: "رسامة للعروض الحية في المناسبات النسائية", img: images.woman, icon: "🎨" },
  { id: "folk-band", title: "فرقة شعبية", description: "فرقة شعبية للعروض التراثية والفنية", img: images.event, icon: "🎵" },
  { id: "heritage-tent", title: "خيمة تراثية", description: "خيمة تراثية لاستقبال الضيوف بأسلوب أصيل", img: images.catering, icon: "⛺" },
  { id: "reception-counter", title: "كونتر ضيافة", description: "كونتر استقبال بتصاميم عصرية وكلاسيكية", img: images.equip, icon: "🏛️" },
  { id: "photo-booth", title: "فوت بوث", description: "ركن تصوير تفاعلي للضيوف مع إطارات ومؤثرات", img: images.portfolio, icon: "📸" },
  { id: "open-buffet", title: "بوفيه مفتوحة", description: "خدمات بوفيه متكاملة بأصناف متنوعة", img: images.catering, icon: "🍽️" },
  { id: "mobile-table", title: "طاولة متنقلة", description: "طاولات ضيافة متحركة بين الضيوف", img: images.tea, icon: "🛒" },
  { id: "cleaning", title: "النظافة", description: "خدمات تنظيف احترافية قبل وبعد المناسبات", img: images.kitchen, icon: "✨" },
]

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
// SERVICES PAGE - الهيكلية الجديدة
// ============================================
function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('male')
  const [selectedService, setSelectedService] = useState<typeof maleServices[0] | typeof otherServices[0] | null>(null)

  const categories = [
    { id: 'male' as const, label: 'الخدمات الرجالية', icon: '👨‍💼' },
    { id: 'female' as const, label: 'الخدمات النسائية', icon: '👩‍💼' },
    { id: 'other' as const, label: 'خدمات أخرى', icon: '✨' },
  ]

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-12 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ خدمات متكاملة ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>خدماتنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">نقدم باقة متكاملة من خدمات الضيافة الفاخرة التي تلبي احتياجات جميع أنواع المناسبات</p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex gap-3 justify-center flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all duration-300 ${activeCategory === cat.id ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] shadow-lg shadow-[#B8860B]/30" : "border border-[#B8860B]/20 text-[#F5F5DC]/60 hover:border-[#B8860B]/40 hover:text-[#B8860B]"}`}
              style={{ fontWeight: activeCategory === cat.id ? 700 : 400 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Services Content */}
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* Male Services */}
          {activeCategory === 'male' && (
            <motion.div
              key="male"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {maleServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedService(service)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{service.title}</h3>
                    <p className="text-[#F5F5DC]/60 text-sm line-clamp-2 mb-3">{service.description}</p>
                    {service.outfits.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {service.outfits.map((outfit, oi) => (
                          <div key={oi} className="w-6 h-6 rounded-full border border-[#B8860B]/30" style={{ background: outfit.color }} title={outfit.name} />
                        ))}
                      </div>
                    )}
                    <span className="text-[#B8860B] text-sm">اعرف المزيد ←</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Female Services */}
          {activeCategory === 'female' && (
            <motion.div
              key="female"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {femaleServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedService(service)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{service.title}</h3>
                    <p className="text-[#F5F5DC]/60 text-sm line-clamp-2 mb-3">{service.description}</p>
                    {service.outfits.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {service.outfits.map((outfit, oi) => (
                          <div key={oi} className="w-6 h-6 rounded-full border border-[#B8860B]/30" style={{ background: outfit.color }} title={outfit.name} />
                        ))}
                      </div>
                    )}
                    <span className="text-[#B8860B] text-sm">اعرف المزيد ←</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Other Services */}
          {activeCategory === 'other' && (
            <motion.div
              key="other"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {otherServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => setSelectedService(service)}
                  className="relative rounded-xl overflow-hidden cursor-pointer group border border-[#B8860B]/10 hover:border-[#B8860B]/30 transition-all"
                  style={{ background: "rgba(30,25,15,0.5)", aspectRatio: "1/1" }}
                >
                  <Image src={service.img} alt={service.title} fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-3xl mb-2">{service.icon}</span>
                    <h3 className="text-[#F5F5DC] text-sm font-semibold mb-1">{service.title}</h3>
                    <p className="text-[#F5F5DC]/50 text-xs line-clamp-2">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedService(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative max-w-md w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #242015 0%, #1a1a1a 100%)", border: "1px solid rgba(184,134,11,0.3)" }} onClick={(e) => e.stopPropagation()}>
              <div className="relative h-48 overflow-hidden">
                <Image src={selectedService.img} alt={selectedService.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                <button onClick={() => setSelectedService(null)} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1a1a1a]/80 border border-[#B8860B]/30 text-[#F5F5DC]/60 hover:text-[#B8860B] flex items-center justify-center transition-colors">✕</button>
              </div>
              <div className="p-6">
                <h2 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.4rem", fontWeight: 700 }}>{selectedService.title}</h2>
                <p className="text-[#F5F5DC]/60 text-sm mb-4">{selectedService.description}</p>
                {'outfits' in selectedService && selectedService.outfits && selectedService.outfits.length > 0 && (
                  <>
                    <h3 className="text-[#B8860B] mb-3 text-sm font-semibold">الأزياء المتاحة:</h3>
                    <div className="flex gap-3 flex-wrap mb-4">
                      {selectedService.outfits.map((o, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B8860B]/20" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className="w-5 h-5 rounded-full border border-[#B8860B]/30" style={{ background: o.color }} />
                          <span className="text-[#F5F5DC]/60 text-xs">{o.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <a href={getWhatsAppLink(`مرحباً، أود الاستفسار عن خدمة ${selectedService.title}`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-lg hover:shadow-[#B8860B]/30 transition-all duration-300" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
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
      { name: "تمر بالمكسرات", desc: "محشو بالجوز واللوز", img: images.coffee },
      { name: "صواني التمر الفاخرة", desc: "تشكيلات راقية للمناسبات", img: images.tea },
    ]},
    { id: "sweets", label: "حلويات", icon: "🍫", items: [
      { name: "شوكولاتة بلجيكية", desc: "تشكيلة متنوعة من أجود الأنواع", img: images.hero },
      { name: "معمول فاخر", desc: "بالتمر والمكسرات", img: images.coffee },
      { name: "كنافة نابلسية", desc: "بعجينة الكنافة الأصيلة", img: images.tea },
    ]},
  ]

  const currentCategory = categories.find((c) => c.id === activeCategory)!

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-12 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ أرقى التقديمات ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>تقديماتنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">تشكيلة واسعة من أرقى المشروبات والحلويات والتقديمات الفاخرة</p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
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
    { id: 1, img: images.portfolio, title: "حفل شركة أرامكو السعودية", desc: "تجهيز وإدارة ضيافة فاخرة", category: "events", tags: ["حفلات كبرى", "شركات"] },
    { id: 2, img: images.coffee, title: "حفل قهوة تراثي", desc: "عرض صب القهوة السعودية التقليدي", category: "hospitality", tags: ["قهوة", "تراثي"] },
    { id: 3, img: images.event, title: "حفل زفاف فاخر", desc: "ضيافة متكاملة لحفل زفاف راقٍ", category: "events", tags: ["زفاف"] },
    { id: 4, img: images.catering, title: "مؤتمر رجال الأعمال", desc: "تجهيز قاعات وتقديم ضيافة متميزة", category: "events", tags: ["مؤتمرات"] },
    { id: 5, img: images.tea, title: "جلسة شاي فاخرة", desc: "تقديم الشاي الفاخر بأساليب إبداعية", category: "food", tags: ["شاي"] },
    { id: 6, img: images.waiter, title: "خدمة الضيافة الرجالية", desc: "فريق المضيفين المحترفين", category: "hospitality", tags: ["خدمة", "رجالي"] },
    { id: 7, img: images.kitchen, title: "خلف الكواليس", desc: "لحظات التحضير والتجهيز", category: "behind", tags: ["كواليس"] },
    { id: 8, img: images.woman, title: "فريق الضيافة النسائية", desc: "مضيفاتنا المتميزات", category: "hospitality", tags: ["نسائي"] },
    { id: 9, img: images.equip, title: "معدات التقديم الفاخرة", desc: "أرقى المعدات الذهبية", category: "food", tags: ["معدات"] },
    { id: 10, img: images.hero, title: "تقديمات موسم الرياض", desc: "تجربة ضيافة استثنائية", category: "events", tags: ["موسم الرياض"] },
    { id: 11, img: images.coffee, title: "خلف الكواليس - القهوة", desc: "لحظات التحضير والإعداد", category: "behind", tags: ["كواليس", "قهوة"] },
    { id: 12, img: images.portfolio, title: "حفل حكومي رسمي", desc: "ضيافة حفل رسمي", category: "events", tags: ["حكومي"] },
  ]

  const filters: { id: string; label: string }[] = [
    { id: "all", label: "الكل" },
    { id: "events", label: "فعاليات" },
    { id: "hospitality", label: "ضيافة" },
    { id: "food", label: "طعام" },
    { id: "behind", label: "كواليس" },
  ]

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-12 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ أعمالنا ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>معرض أعمالنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">نعرض لكم مجموعة من أبرز الأعمال التي قمنا بتقديمها</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${activeFilter === f.id ? "bg-[#B8860B] text-[#1a1a1a]" : "border border-[#B8860B]/20 text-[#F5F5DC]/60 hover:border-[#B8860B]/40"}`} style={{ fontWeight: activeFilter === f.id ? 600 : 400 }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ aspectRatio: "4/3" }}
              >
                <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  {p.tags.map((tag, ti) => (
                    <span key={ti} className="px-2 py-1 rounded-full text-[#B8860B] border border-[#B8860B]/30 text-xs" style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(10px)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-[#F5F5DC]" style={{ fontSize: "1.1rem", fontWeight: 600 }}>{p.title}</h3>
                  <p className="text-[#F5F5DC]/60 text-sm mt-1">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================
// ABOUT PAGE
// ============================================
function AboutPage() {
  const values = [
    { icon: "✦", title: "الاحترافية", desc: "فريق مدرب على أعلى مستوى من الاحتراف والتميز" },
    { icon: "◈", title: "الجودة", desc: "نحرص على تقديم أعلى معايير الجودة في كل خدمة" },
    { icon: "❋", title: "الأصالة", desc: "نجمع بين التراث السعودي الأصيل والعصرية" },
    { icon: "◇", title: "التميز", desc: "نسعى دائماً لتجاوز توقعات عملائنا" },
  ]

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ قصتنا ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>من نحن</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-[#F5F5DC]/70 leading-relaxed text-lg mb-6">
            <span className="text-[#B8860B] font-bold">كيف الضيافة</span> هي مؤسسة رائدة في تقديم خدمات الضيافة الفاخرة في المملكة العربية السعودية. نجمع بين الأصالة السعودية والفخامة العصرية لتقديم تجربة ضيافة لا تُنسى.
          </p>
          <p className="text-[#F5F5DC]/60 leading-relaxed">
            نقدم خدماتنا لجميع المناسبات من أعراس وحفلات ومؤتمرات ومعارض، مع فريق متخصص من المضيفين والمضيفات المحترفين.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[#B8860B]/15 text-center"
              style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}
            >
              <div className="text-[#B8860B] text-3xl mb-4">{v.icon}</div>
              <h3 className="text-[#F5F5DC] text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-[#F5F5DC]/60 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-8 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(26,26,26,0.95) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          {[
            { num: "+500", label: "مناسبة ناجحة" },
            { num: "+200", label: "عميل راضٍ" },
            { num: "+50", label: "فريق محترف" },
            { num: "8+", label: "سنوات خبرة" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-[#B8860B] text-3xl font-bold">{s.num}</p>
              <p className="text-[#F5F5DC]/60 text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ============================================
// CONTACT PAGE
// ============================================
function ContactPage() {
  const contactInfo = [
    { icon: "📞", label: "الهاتف", value: PHONE, link: `tel:${PHONE}` },
    { icon: "💬", label: "واتساب", value: WHATSAPP_NUMBER, link: getWhatsAppLink() },
    { icon: "📧", label: "البريد الإلكتروني", value: EMAIL, link: `mailto:${EMAIL}` },
    { icon: "📷", label: "انستغرام", value: "@moain.7", link: INSTAGRAM_URL },
  ]

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ تواصل معنا ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700 }}>تواصل معنا</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">نحن هنا لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت</p>
        </motion.div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactInfo.map((info, i) => (
            <motion.a
              key={i}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl border border-[#B8860B]/15 flex items-center gap-4 transition-all duration-300 hover:border-[#B8860B]/40"
              style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}
            >
              <div className="text-3xl">{info.icon}</div>
              <div>
                <p className="text-[#B8860B] text-sm mb-1">{info.label}</p>
                <p className="text-[#F5F5DC] font-semibold">{info.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-8 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(26,26,26,0.95) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          <p className="text-[#F5F5DC] text-lg mb-4">جاهزون لخدمتك على مدار الساعة</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#25D366] text-white hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300" style={{ fontWeight: 600 }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              تواصل عبر واتساب
            </a>
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-8 py-3 rounded-full border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              اتصل بنا
            </a>
          </div>
        </motion.div>
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

  const navigateTo = (page: PageType) => setCurrentPage(page)

  const getWhatsAppMessage = () => {
    switch (currentPage) {
      case 'services': return "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."
      case 'offerings': return "مرحباً، أود الاستفسار عن تقديماتكم."
      case 'portfolio': return "مرحباً، أود الاطلاع على المزيد من أعمالكم."
      default: return "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#F5F5DC]" dir="rtl" style={{ fontFamily: "'IBM Plex Sans Arabic', 'IBM Plex Sans', sans-serif" }}>
      {/* Header - أصغر */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg shadow-black/50 py-2" : "bg-transparent py-3"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg shadow-[#B8860B]/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#1a1a1a]">
                <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="text-[#B8860B] block leading-none text-sm font-bold">كيف الضيافة</span>
              <span className="text-[#F5F5DC]/60 block text-[0.6rem]">KEIF AL-DIAFA</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`transition-colors duration-200 hover:text-[#B8860B] text-xs ${currentPage === link.id ? "text-[#B8860B]" : "text-[#F5F5DC]/80"}`}>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full bg-[#B8860B] text-[#1a1a1a] text-xs transition-all duration-200 hover:bg-[#DAA520] hover:shadow-lg hover:shadow-[#B8860B]/30 font-semibold">
              واتساب
            </a>
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
      <footer className="bg-[#111111] border-t border-[#B8860B]/20 pt-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#1a1a1a]">
                    <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[#B8860B] text-sm font-bold">كيف الضيافة</span>
              </div>
              <p className="text-[#F5F5DC]/60 text-xs leading-relaxed">منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية</p>
            </div>
            <div>
              <h3 className="text-[#B8860B] mb-3 text-sm font-semibold">روابط سريعة</h3>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => navigateTo(link.id)} className="text-[#F5F5DC]/60 text-xs hover:text-[#B8860B] transition-colors">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#B8860B] mb-3 text-sm font-semibold">تواصل معنا</h3>
              <div className="flex gap-2">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>
                <a href={`tel:${PHONE}`} className="w-8 h-8 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] hover:bg-[#B8860B]/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#B8860B]/20 pt-4 text-center">
            <p className="text-[#F5F5DC]/40 text-xs">© {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="fixed bottom-20 left-4 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40" animate={{ scale: [1, 1.08, 1], boxShadow: ["0 4px 20px rgba(37,211,102,0.4)", "0 4px 30px rgba(37,211,102,0.7)", "0 4px 20px rgba(37,211,102,0.4)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} aria-label="تواصل عبر واتساب">
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </motion.a>

      {/* Floating Menu Button */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] shadow-xl shadow-[#B8860B]/40" style={{ fontWeight: 700, fontSize: "0.85rem" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
              <div className="max-w-lg mx-auto px-6 py-6 pb-20">
                <div className="w-12 h-1 bg-[#B8860B] rounded-full mx-auto mb-6" />
                <p className="text-center text-[#B8860B] mb-4 text-xs" style={{ letterSpacing: "0.15em" }}>كيف الضيافة</p>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <button onClick={() => { navigateTo(link.id); setIsMenuOpen(false) }} className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group ${currentPage === link.id ? "bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B]/30" : "text-[#F5F5DC]/80 hover:bg-[#B8860B]/10 hover:text-[#B8860B] border border-transparent"}`} style={{ fontSize: "1rem", fontWeight: 500 }}>
                        <span>{link.label}</span>
                        <span className="text-[#B8860B]/60 group-hover:text-[#B8860B] transition-colors">←</span>
                      </button>
                    </motion.div>
                  ))}
                </nav>
                <div className="flex justify-center gap-3 mt-6">
                  <a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs hover:bg-[#25D366]/20 transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    واتساب
                  </a>
                  <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] text-xs hover:bg-[#B8860B]/20 transition-colors">
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
