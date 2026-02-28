'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================
// Types
// ============================================
type PageType = 'home' | 'services' | 'offerings' | 'portfolio' | 'about' | 'contact'
type ServiceCategory = 'male' | 'female' | 'other' | 'main' | null

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
// Image URLs
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
}

// ============================================
// Service Data
// ============================================
const maleServices = [
  { id: "hosts", title: "مضيفين", subtitle: "Professional Hosts", description: "مضيفون محترفون بزي رسمي فاخر لتقديم أفضل تجربة ضيافة في مناسباتكم", img: images.waiter, features: ["أزياء رسمية فاخرة متعددة", "تدريب عالي على آداب الضيافة", "تقديم القهوة والشاي بطريقة احترافية", "التعامل مع كافة أنواع المناسبات"], outfits: [{ name: "الزي الكلاسيكي الأسود", color: "#1a1a1a" }, { name: "الزي التراثي الذهبي", color: "#B8860B" }, { name: "الزي الرسمي الأبيض", color: "#F5F5DC" }] },
  { id: "zamzam", title: "سقيا زمزم", subtitle: "Zamzam Water Service", description: "خدمة تقديم ماء زمزم المبارك بأسلوب فاخر ومميز يعكس روح الضيافة الإسلامية", img: images.coffee, features: ["تقديم بأسلوب تراثي راقي", "أزياء خاصة بالخدمة", "دلال ومعدات فاخرة", "مناسبة للحفلات الدينية"], outfits: [{ name: "الزي التقليدي", color: "#2C2C2C" }, { name: "الزي الفاخر", color: "#B8860B" }] },
  { id: "safrja", title: "خدمات السفرجية", subtitle: "Butler Services", description: "سفرجية محترفة لإدارة وتنظيم الضيافة في المناسبات الكبرى والمؤتمرات", img: images.catering, features: ["إدارة كاملة لخدمة الضيوف", "تنظيم طاولات الطعام", "التنسيق مع المطبخ", "أزياء رسمية متنوعة"], outfits: [{ name: "الزي الرسمي", color: "#1a1a1a" }, { name: "الزي التنفيذي", color: "#2C3E50" }] },
  { id: "sawas", title: "سواس صور", subtitle: "Photography Services", description: "خدمة تصوير احترافية لتوثيق لحظات ضيافتكم المميزة بأعلى جودة", img: images.portfolio, features: ["تصوير احترافي عالي الجودة", "تغطية كاملة للمناسبة", "مونتاج وتحرير احترافي", "تسليم سريع"], outfits: [] }
]

const femaleServices = [
  { id: "hostesses", title: "مضيفات", subtitle: "Professional Hostesses", description: "مضيفات متميزات بزي أنيق ومحتشم يجمع بين الرقي والاحتشام", img: images.woman, features: ["أزياء فاخرة ومحتشمة", "تدريب على آداب الضيافة", "تقديم المشروبات والحلويات", "استقبال وتوجيه الضيفات"], outfits: [{ name: "العباءة الفاخرة", color: "#1a1a1a" }, { name: "الزي الخليجي", color: "#3D2B1F" }, { name: "الزي الرسمي الراقي", color: "#2C1A3A" }] }
]

const otherServices = [
  { id: "calligrapher", title: "خطاط", description: "خطاط محترف لكتابة بطاقات الدعوة والترحيب بخط عربي أصيل", img: images.coffee, icon: "✒️", color: "#B8860B" },
  { id: "painter", title: "رسام", description: "رسام للعروض الحية الفنية في المناسبات", img: images.event, icon: "🎨", color: "#E74C3C" },
  { id: "painter-female", title: "رسامة", description: "رسامة للعروض الحية في المناسبات النسائية", img: images.woman, icon: "🎨", color: "#9B59B6" },
  { id: "folk-band", title: "فرقة شعبية", description: "فرقة شعبية للعروض التراثية والفنية", img: images.event, icon: "🎵", color: "#E67E22" },
  { id: "heritage-tent", title: "خيمة تراثية", description: "خيمة تراثية لاستقبال الضيوف بأسلوب أصيل", img: images.catering, icon: "⛺", color: "#8B4513" },
  { id: "reception-counter", title: "كونتر ضيافة", description: "كونتر استقبال بتصاميم عصرية وكلاسيكية", img: images.equip, icon: "🏛️", color: "#34495E" },
  { id: "photo-booth", title: "فوت بوث", description: "ركن تصوير تفاعلي للضيوف مع إطارات ومؤثرات", img: images.portfolio, icon: "📸", color: "#1ABC9C" },
  { id: "open-buffet", title: "بوفيه مفتوحة", description: "خدمات بوفيه متكاملة بأصناف متنوعة ولذيذة", img: images.catering, icon: "🍽️", color: "#C0392B" },
  { id: "mobile-table", title: "طاولة متنقلة", description: "طاولات ضيافة متحركة بين الضيوف", img: images.tea, icon: "🛒", color: "#2980B9" },
  { id: "cleaning", title: "النظافة", description: "خدمات تنظيف احترافية قبل وبعد المناسبات", img: images.kitchen, icon: "✨", color: "#27AE60" },
]

// ============================================
// Section Title Component
// ============================================
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#B8860B] mb-2 text-center" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>
          ✦ {subtitle || "كيف الضيافة"} ✦
        </p>
        <h2 className="text-[#F5F5DC] text-center" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 700 }}>
          {title}
        </h2>
        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto" style={{ width: "120px" }} />
      </motion.div>
    </div>
  )
}

// ============================================
// HOME PAGE
// ============================================
function HomePage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const whyCards = [
    { icon: "✦", title: "خبرة متميزة", desc: "سنوات من الخبرة في تقديم خدمات الضيافة الفاخرة" },
    { icon: "◈", title: "فريق احترافي", desc: "كوادر مدربة على أعلى مستوى من الاحتراف" },
    { icon: "❋", title: "تقديمات فاخرة", desc: "أرقى التقديمات من قهوة سعودية وشاي وحلويات" },
    { icon: "◇", title: "تغطية شاملة", desc: "نغطي جميع مناطق المملكة العربية السعودية" },
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
    { name: "نورة الشمري", role: "صاحبة مناسبة", text: "تجربة لا تُنسى، من أول لحظة حتى آخر لحظة. الفريق محترف وودود.", rating: 5 },
    { name: "فيصل الزهراني", role: "رجل أعمال", text: "اعتمدنا على كيف الضيافة في جميع فعاليات شركتنا. لم نخيب ظننا أبداً.", rating: 5 },
  ]

  const partners = ["أرامكو السعودية", "موسم الرياض", "مجموعة بن لادن", "فندق الريتز كارلتون", "هيئة الأفلام", "نيوم"]

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src={images.hero} alt="كيف الضيافة" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/40 to-[#1a1a1a]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(184,134,11,0.1) 0%, transparent 70%)" }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-2xl shadow-[#B8860B]/50">
              <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-[#1a1a1a]">
                <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
          
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.85rem", letterSpacing: "0.3em" }}>
            ✦ ✦ ✦
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-[#F5F5DC] mb-2" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, lineHeight: 1.2, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            كيف الضيافة
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-[#B8860B] mb-2" style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 300, letterSpacing: "0.1em" }}>
            KEIF AL-DIAFA
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-[#F5F5DC]/70 max-w-lg mb-10" style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.8 }}>
            حيث تلتقي الفخامة بالضيافة الأصيلة
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.9 }} className="flex gap-4 flex-wrap justify-center">
            <button onClick={() => onNavigate('services')} className="px-10 py-4 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-xl hover:shadow-[#B8860B]/40 transition-all duration-300 hover:-translate-y-0.5" style={{ fontWeight: 700, fontSize: "1rem" }}>
              اكتشف خدماتنا
            </button>
            <button onClick={() => onNavigate('portfolio')} className="px-10 py-4 rounded-full border border-[#B8860B]/50 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500, fontSize: "1rem" }}>
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
          {[{ num: "+500", label: "مناسبة ناجحة" }, { num: "+50", label: "شريك موثوق" }, { num: "+200", label: "عميل راضٍ" }, { num: "8+", label: "سنوات خبرة" }].map((s, i) => (
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
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -5 }} className="relative p-6 rounded-2xl border border-[#B8860B]/15 overflow-hidden group" style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-[#B8860B] mb-4 relative z-10" style={{ fontSize: "2rem" }}>{card.icon}</div>
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
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }}>
                <Image src={m.img} alt={m.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="px-3 py-1 rounded-full text-[#B8860B] border border-[#B8860B]/40 text-xs" style={{ background: "rgba(26,26,26,0.8)" }}>{m.category}</span>
                  <h3 className="text-[#F5F5DC] mt-2" style={{ fontSize: "1.05rem", fontWeight: 600 }}>{m.title}</h3>
                </div>
              </motion.div>
            ))}
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
          <motion.div className="flex gap-8 items-center" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
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
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="p-6 rounded-2xl border border-[#B8860B]/15" style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}>
                <div className="text-[#B8860B]/30 mb-4 text-3xl">"</div>
                <p className="text-[#F5F5DC]/70 text-sm leading-relaxed mb-5">{t.text}</p>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (<span key={si} className="text-[#B8860B]">★</span>))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B]/30 to-[#B8860B]/10 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B] font-bold">{t.name[0]}</div>
                  <div>
                    <p className="text-[#F5F5DC] font-semibold">{t.name}</p>
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
            <p className="text-[#F5F5DC]/60 mb-10">تواصل معنا الآن واحصل على استشارة مجانية</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white hover:shadow-xl transition-all" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل عبر واتساب
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ============================================
// SERVICES MAIN PAGE - الصفحة الرئيسية للخدمات
// ============================================
function ServicesMainPage({ onSelectCategory }: { onSelectCategory: (cat: ServiceCategory) => void }) {
  const categories = [
    { id: 'male' as const, title: 'الخدمات الرجالية', subtitle: 'Male Services', icon: '👨‍💼', img: images.waiter, count: 4, color: '#B8860B' },
    { id: 'female' as const, title: 'الخدمات النسائية', subtitle: 'Female Services', icon: '👩‍💼', img: images.woman, count: 1, color: '#D4A574' },
    { id: 'other' as const, title: 'خدمات أخرى', subtitle: 'Other Services', icon: '✨', img: images.catering, count: 10, color: '#C9A227' },
  ]

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.15) 0%, transparent 60%)" }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-2xl shadow-[#B8860B]/30">
            <span className="text-3xl"> Hospitality</span>
          </motion.div>
          <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.25em" }}>✦ خدمات متكاملة ✦</p>
          <h1 className="text-[#F5F5DC] mb-4" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700 }}>خدماتنا</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mb-4" />
          <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm leading-relaxed">نقدم باقة متكاملة من خدمات الضيافة الفاخرة التي تلبي احتياجات جميع أنواع المناسبات</p>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(cat.id)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "3/4", minHeight: "400px" }}
            >
              <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
              
              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-[#B8860B]/0 group-hover:border-[#B8860B]/30 rounded-3xl transition-all duration-500" />
              
              {/* Top Badge */}
              <motion.div 
                className="absolute top-4 right-4 px-4 py-2 rounded-full"
                style={{ background: `linear-gradient(135deg, ${cat.color}CC, ${cat.color}99)`, backdropFilter: "blur(10px)" }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-[#1a1a1a] font-bold text-sm">{cat.count} خدمات</span>
              </motion.div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.2 + 0.3 }}>
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <p className="text-[#B8860B]/80 text-xs mb-1 tracking-wider">{cat.subtitle}</p>
                  <h3 className="text-[#F5F5DC] text-2xl font-bold mb-3">{cat.title}</h3>
                  <div className="flex items-center gap-2 text-[#B8860B]">
                    <span className="text-sm font-semibold">اكتشف الخدمات</span>
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>←</motion.span>
                  </div>
                </motion.div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)" }} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-8 rounded-3xl text-center" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.1) 0%, rgba(26,26,26,0.95) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          <p className="text-[#B8860B] mb-2 text-xs tracking-wider">✦ استشارة مجانية ✦</p>
          <h3 className="text-[#F5F5DC] mb-4 text-xl font-bold">هل تحتاج مساعدة في اختيار الخدمة المناسبة؟</h3>
          <p className="text-[#F5F5DC]/55 mb-6 text-sm">فريقنا جاهز لمساعدتك في اختيار باقة الخدمات المثالية</p>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] font-bold hover:shadow-xl transition-all">
            استفسر الآن
          </a>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================
// SERVICES CATEGORY PAGE - صفحة الخدمات التفصيلية
// ============================================
function ServicesCategoryPage({ category, onBack }: { category: ServiceCategory; onBack: () => void }) {
  const [selectedService, setSelectedService] = useState<typeof maleServices[0] | typeof otherServices[0] | null>(null)

  const getCategoryData = () => {
    switch (category) {
      case 'male':
        return { title: 'الخدمات الرجالية', subtitle: 'Male Services', icon: '👨‍💼', services: maleServices }
      case 'female':
        return { title: 'الخدمات النسائية', subtitle: 'Female Services', icon: '👩‍💼', services: femaleServices }
      case 'other':
        return { title: 'خدمات أخرى', subtitle: 'Other Services', icon: '✨', services: otherServices }
      default:
        return { title: '', subtitle: '', icon: '', services: [] }
    }
  }

  const categoryData = getCategoryData()

  return (
    <div className="pt-20 pb-32 min-h-screen">
      {/* Header */}
      <div className="relative py-12 px-4">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(184,134,11,0.12) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[#B8860B] mb-6 hover:gap-3 transition-all"
          >
            <span>→</span>
            <span>العودة للخدمات</span>
          </motion.button>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg shadow-[#B8860B]/30">
                <span className="text-2xl">{categoryData.icon}</span>
              </div>
              <div>
                <p className="text-[#B8860B]/80 text-xs tracking-wider">{categoryData.subtitle}</p>
                <h1 className="text-[#F5F5DC] text-3xl font-bold">{categoryData.title}</h1>
              </div>
            </div>
            <div className="h-0.5 w-24 bg-gradient-to-r from-[#B8860B] to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {category === 'other' ? (
          // عرض خدمات أخرى بشكل بطاقات صغيرة
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => setSelectedService(service)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "1/1" }}
              >
                <Image src={service.img} alt={service.title} fill className="object-cover opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center border border-[#B8860B]/10 group-hover:border-[#B8860B]/30 transition-colors rounded-2xl" style={{ background: "rgba(26,26,26,0.8)" }}>
                  <motion.div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                    style={{ background: `linear-gradient(135deg, ${service.color || '#B8860B'}40, ${service.color || '#B8860B'}20)` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-2xl">{service.icon}</span>
                  </motion.div>
                  <h3 className="text-[#F5F5DC] font-semibold text-sm mb-1">{service.title}</h3>
                  <p className="text-[#F5F5DC]/40 text-xs line-clamp-2">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // عرض خدمات رجالية ونسائية بشكل بطاقات كبيرة
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`grid gap-6 ${category === 'female' ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {(category === 'male' ? maleServices : femaleServices).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedService(service)}
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: "4/5" }}
              >
                <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="mb-2">
                    <span className="px-3 py-1 rounded-full text-[#B8860B] text-xs" style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(10px)" }}>{service.subtitle}</span>
                  </div>
                  <h3 className="text-[#F5F5DC] text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-[#F5F5DC]/70 text-sm line-clamp-2 mb-4">{service.description}</p>
                  
                  {/* Outfits */}
                  {service.outfits && service.outfits.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#B8860B] text-xs">الأزياء:</span>
                      <div className="flex gap-1">
                        {service.outfits.map((outfit, oi) => (
                          <motion.div 
                            key={oi} 
                            className="w-6 h-6 rounded-full border-2 border-[#B8860B]/30"
                            style={{ background: outfit.color }}
                            whileHover={{ scale: 1.2 }}
                            title={outfit.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-[#B8860B]">
                    <span className="text-sm font-semibold">تفاصيل أكثر</span>
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>←</motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedService(null)}>
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} className="relative max-w-lg w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)", border: "2px solid rgba(184,134,11,0.3)" }} onClick={(e) => e.stopPropagation()}>
              <div className="relative h-64 overflow-hidden">
                <Image src={selectedService.img} alt={selectedService.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />
                <button onClick={() => setSelectedService(null)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#1a1a1a]/80 border border-[#B8860B]/30 text-[#F5F5DC] flex items-center justify-center hover:bg-[#B8860B]/20 transition-colors text-xl">✕</button>
              </div>
              
              <div className="p-6">
                {'subtitle' in selectedService && selectedService.subtitle && (
                  <p className="text-[#B8860B]/80 text-xs tracking-wider mb-1">{selectedService.subtitle}</p>
                )}
                <h2 className="text-[#F5F5DC] text-2xl font-bold mb-3">{selectedService.title}</h2>
                <p className="text-[#F5F5DC]/60 text-sm mb-5">{selectedService.description}</p>
                
                {'features' in selectedService && selectedService.features && (
                  <div className="mb-5">
                    <h4 className="text-[#B8860B] text-sm font-semibold mb-3">المميزات:</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[#F5F5DC]/70 text-sm">
                          <span className="text-[#B8860B]">✦</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {'outfits' in selectedService && selectedService.outfits && selectedService.outfits.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-[#B8860B] text-sm font-semibold mb-3">الأزياء المتاحة:</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedService.outfits.map((o, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#B8860B]/20" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div className="w-5 h-5 rounded-full border border-[#B8860B]/30" style={{ background: o.color }} />
                          <span className="text-[#F5F5DC]/70 text-xs">{o.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <a href={getWhatsAppLink(`مرحباً، أود الاستفسار عن خدمة ${selectedService.title}`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] font-bold hover:shadow-lg hover:shadow-[#B8860B]/30 transition-all">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
    ]},
    { id: "dates", label: "تمر فاخر", icon: "🌴", items: [
      { name: "تمر مجدول", desc: "أجود أنواع التمر السعودي", img: images.hero },
      { name: "تمر بالمكسرات", desc: "محشو بالجوز واللوز", img: images.coffee },
    ]},
    { id: "sweets", label: "حلويات", icon: "🍫", items: [
      { name: "شوكولاتة بلجيكية", desc: "تشكيلة متنوعة", img: images.hero },
      { name: "معمول فاخر", desc: "بالتمر والمكسرات", img: images.coffee },
    ]},
  ]

  const currentCategory = categories.find((c) => c.id === activeCategory)!

  return (
    <div className="pt-20 pb-32 min-h-screen">
      <div className="relative py-12 px-4 text-center">
        <p className="text-[#B8860B] mb-3 text-xs tracking-wider">✦ أرقى التقديمات ✦</p>
        <h1 className="text-[#F5F5DC] text-3xl font-bold mb-4">تقديماتنا</h1>
        <p className="text-[#F5F5DC]/55 max-w-lg mx-auto text-sm">تشكيلة واسعة من أرقى المشروبات والحلويات</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all ${activeCategory === cat.id ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] font-bold" : "border border-[#B8860B]/20 text-[#F5F5DC]/60 hover:border-[#B8860B]/40"}`}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentCategory.items.map((item, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} onClick={() => setSelectedItem(item)} className="rounded-2xl overflow-hidden cursor-pointer group border border-[#B8860B]/10 hover:border-[#B8860B]/30 transition-all" style={{ background: "rgba(30,25,15,0.5)" }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <h3 className="text-[#F5F5DC] font-semibold">{item.name}</h3>
                <p className="text-[#F5F5DC]/50 text-xs mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative max-w-sm w-full rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)", border: "1px solid rgba(184,134,11,0.3)" }} onClick={(e) => e.stopPropagation()}>
              <div className="relative h-56">
                <Image src={selectedItem.img} alt={selectedItem.name} fill className="object-cover" />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1a1a1a]/80 text-[#F5F5DC] flex items-center justify-center">✕</button>
              </div>
              <div className="p-6">
                <h2 className="text-[#F5F5DC] text-xl font-bold mb-2">{selectedItem.name}</h2>
                <p className="text-[#F5F5DC]/60 text-sm mb-4">{selectedItem.desc}</p>
                <a href={getWhatsAppLink(`مرحباً، أود الاستفسار عن ${selectedItem.name}`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] font-bold">
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
    { id: 1, img: images.portfolio, title: "حفل أرامكو السعودية", category: "events" },
    { id: 2, img: images.coffee, title: "حفل قهوة تراثي", category: "hospitality" },
    { id: 3, img: images.event, title: "حفل زفاف فاخر", category: "events" },
    { id: 4, img: images.catering, title: "مؤتمر رجال الأعمال", category: "events" },
    { id: 5, img: images.tea, title: "جلسة شاي فاخرة", category: "food" },
    { id: 6, img: images.waiter, title: "خدمة الضيافة الرجالية", category: "hospitality" },
    { id: 7, img: images.woman, title: "فريق الضيافة النسائية", category: "hospitality" },
    { id: 8, img: images.equip, title: "معدات التقديم الفاخرة", category: "food" },
  ]

  const filters = [{ id: "all", label: "الكل" }, { id: "events", label: "فعاليات" }, { id: "hospitality", label: "ضيافة" }, { id: "food", label: "طعام" }]
  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="pt-20 pb-32 min-h-screen">
      <div className="py-12 px-4 text-center">
        <p className="text-[#B8860B] mb-3 text-xs tracking-wider">✦ أعمالنا ✦</p>
        <h1 className="text-[#F5F5DC] text-3xl font-bold">معرض أعمالنا</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} className={`px-5 py-2 rounded-full text-sm transition-all ${activeFilter === f.id ? "bg-[#B8860B] text-[#1a1a1a]" : "border border-[#B8860B]/20 text-[#F5F5DC]/60"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, i) => (
            <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ y: -5 }} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src={p.img} alt={p.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-[#F5F5DC] font-semibold">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// ABOUT PAGE
// ============================================
function AboutPage() {
  return (
    <div className="pt-20 pb-32 min-h-screen">
      <div className="py-12 px-4 text-center">
        <p className="text-[#B8860B] mb-3 text-xs tracking-wider">✦ قصتنا ✦</p>
        <h1 className="text-[#F5F5DC] text-3xl font-bold">من نحن</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#F5F5DC]/70 leading-relaxed mb-6">
            <span className="text-[#B8860B] font-bold">كيف الضيافة</span> هي مؤسسة رائدة في تقديم خدمات الضيافة الفاخرة في المملكة العربية السعودية. نجمع بين الأصالة السعودية والفخامة العصرية لتقديم تجربة ضيافة لا تُنسى.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-8 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(26,26,26,0.95) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          {[{ num: "+500", label: "مناسبة ناجحة" }, { num: "+200", label: "عميل راضٍ" }, { num: "+50", label: "فريق محترف" }, { num: "8+", label: "سنوات خبرة" }].map((s, i) => (
            <div key={i}>
              <p className="text-[#B8860B] text-2xl font-bold">{s.num}</p>
              <p className="text-[#F5F5DC]/60 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
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
    { icon: "📧", label: "البريد", value: EMAIL, link: `mailto:${EMAIL}` },
    { icon: "📷", label: "انستغرام", value: "@moain.7", link: INSTAGRAM_URL },
  ]

  return (
    <div className="pt-20 pb-32 min-h-screen">
      <div className="py-12 px-4 text-center">
        <p className="text-[#B8860B] mb-3 text-xs tracking-wider">✦ تواصل معنا ✦</p>
        <h1 className="text-[#F5F5DC] text-3xl font-bold">تواصل معنا</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {contactInfo.map((info, i) => (
            <motion.a key={i} href={info.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} className="p-5 rounded-2xl border border-[#B8860B]/15 flex items-center gap-4 hover:border-[#B8860B]/40 transition-all" style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}>
              <div className="text-2xl">{info.icon}</div>
              <div>
                <p className="text-[#B8860B] text-xs mb-1">{info.label}</p>
                <p className="text-[#F5F5DC] font-semibold text-sm">{info.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center p-8 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.08) 0%, rgba(26,26,26,0.95) 100%)", border: "1px solid rgba(184,134,11,0.2)" }}>
          <p className="text-[#F5F5DC] mb-4">جاهزون لخدمتك على مدار الساعة</p>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#25D366] text-white font-semibold">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            تواصل عبر واتساب
          </a>
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
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('main')

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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [serviceCategory])

  const navigateTo = (page: PageType) => {
    setCurrentPage(page)
    if (page !== 'services') {
      setServiceCategory('main')
    }
  }

  const getWhatsAppMessage = () => "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#F5F5DC]" dir="rtl" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-3"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => { navigateTo('home'); setServiceCategory('main') }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#1a1a1a]">
                <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[#B8860B] font-bold text-sm">كيف الضيافة</span>
          </button>

          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => navigateTo(link.id)} className={`text-xs transition-colors ${currentPage === link.id ? "text-[#B8860B]" : "text-[#F5F5DC]/80 hover:text-[#B8860B]"}`}>
                {link.label}
              </button>
            ))}
          </nav>

          <a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="hidden md:flex px-4 py-1.5 rounded-full bg-[#B8860B] text-[#1a1a1a] text-xs font-semibold hover:bg-[#DAA520] transition-all">
            واتساب
          </a>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={currentPage + serviceCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
            {currentPage === 'services' && serviceCategory === 'main' && <ServicesMainPage onSelectCategory={setServiceCategory} />}
            {currentPage === 'services' && serviceCategory !== 'main' && <ServicesCategoryPage category={serviceCategory} onBack={() => setServiceCategory('main')} />}
            {currentPage === 'offerings' && <OfferingsPage />}
            {currentPage === 'portfolio' && <PortfolioPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-[#B8860B]/20 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#1a1a1a]">
                <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[#B8860B] font-bold">كيف الضيافة</span>
          </div>
          <p className="text-[#F5F5DC]/40 text-xs">© {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <motion.a href={getWhatsAppLink(getWhatsAppMessage())} target="_blank" rel="noopener noreferrer" className="fixed bottom-20 left-4 z-50 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </motion.a>

      {/* Menu Button */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] shadow-xl" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <motion.span animate={{ rotate: isMenuOpen ? 45 : 0 }} className="text-lg">{isMenuOpen ? "✕" : "☰"}</motion.span>
          <span className="font-bold text-sm">القائمة</span>
        </motion.button>
      </div>

      {/* Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 pb-20" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)" }} onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-1 bg-[#B8860B] rounded-full mx-auto mb-6" />
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => { navigateTo(link.id); setIsMenuOpen(false) }} className={`px-4 py-3 rounded-xl text-right ${currentPage === link.id ? "bg-[#B8860B]/20 text-[#B8860B]" : "text-[#F5F5DC]/80"}`}>
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
