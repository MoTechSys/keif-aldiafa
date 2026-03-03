'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '@/components/shared/SectionTitle'
import PartnersSlider from '@/components/shared/PartnersSlider'
import { images, getWhatsAppLink, PHONE, INSTAGRAM_URL, EMAIL } from '@/data/constants'

// ============================================
// PWA Install Prompt Type
// ============================================
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// ============================================
// HOME PAGE
// ============================================
export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  // PWA Install Logic
  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: boolean }).MSStream
    setIsIOS(isIOSDevice)

    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    if (!standalone && !localStorage.getItem('pwa-install-dismissed')) {
      setShowInstallBanner(true)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
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

  const serviceCategories = [
    {
      id: "male",
      title: "الخدمات الرجالية",
      subtitle: "Male Hospitality",
      img: images.waiter,
      icon: "♦",
      description: "مضيفون، سقيا زمزم، سفرجيه، سواس صور",
      href: "/services/male",
    },
    {
      id: "female",
      title: "الخدمات النسائية",
      subtitle: "Female Hospitality",
      img: images.woman,
      icon: "◈",
      description: "مضيفات بأزياء أنيقة ومحتشمة للمناسبات النسائية",
      href: "/services/female",
    },
    {
      id: "other",
      title: "الخدمات التكميلية",
      subtitle: "Complementary Services",
      img: images.catering,
      icon: "❋",
      description: "خطاط، رسام، فرقة، خيمة، كاونتر، بوفيه، طاولة متنقلة",
      href: "/services/other",
    },
  ]

  return (
    <div>
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
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#B8860B] to-[#DAA520] flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#1a1a1a]">
                    <path d="M12 2C8 2 4 5 4 9c0 3 2 5.5 5 7l1 4h4l1-4c3-1.5 5-4 5-7 0-4-4-7-8-7z" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#F5F5DC]" style={{ fontSize: "1rem", fontWeight: 700 }}>ثبّت التطبيق</h3>
                  <p className="text-[#F5F5DC]/60 text-sm mt-0.5">
                    {isIOS ? 'اضغط ثم "إضافة إلى الشاشة الرئيسية"' : "للوصول السريع وتجربة أفضل"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleDismissInstall} className="p-2 rounded-full text-[#F5F5DC]/40 hover:text-[#F5F5DC]/70 hover:bg-white/5 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {!isIOS && (
                    <motion.button onClick={handleInstallClick} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] text-sm font-bold shadow-lg hover:shadow-xl transition-shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      تثبيت
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <Link href="/services/male" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#1a1a1a] hover:shadow-xl hover:shadow-[#B8860B]/40 transition-all duration-300 hover:-translate-y-0.5" style={{ fontWeight: 700, fontSize: "1rem" }}>
              اكتشف خدماتنا
            </Link>
            <Link href="#portfolio" className="px-8 py-3 rounded-full border border-[#B8860B]/50 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500, fontSize: "1rem" }}>
              معرض أعمالنا
            </Link>
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
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="relative p-6 rounded-2xl border border-[#B8860B]/15 overflow-hidden group" style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)", backdropFilter: "blur(10px)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-[#B8860B] mb-4 relative z-10" style={{ fontSize: "2rem", lineHeight: 1 }}>{card.icon}</div>
              <h3 className="text-[#F5F5DC] mb-3 relative z-10" style={{ fontSize: "1.05rem", fontWeight: 600 }}>{card.title}</h3>
              <p className="text-[#F5F5DC]/55 text-sm leading-relaxed relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section - Cards linking to /services/[category] */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="خدماتنا" subtitle="خدمات متكاملة" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link href={s.href} className="block relative rounded-3xl overflow-hidden group" style={{ aspectRatio: "16/10" }}>
                  <Image src={s.img} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
                  <div className="absolute top-5 right-5 w-12 h-12 rounded-full flex items-center justify-center text-[#B8860B] text-xl border border-[#B8860B]/30" style={{ background: "rgba(26,26,26,0.7)", backdropFilter: "blur(10px)" }}>
                    {s.icon}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#B8860B] mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}>{s.subtitle}</p>
                    <h2 className="text-[#F5F5DC] mb-2" style={{ fontSize: "1.3rem", fontWeight: 700 }}>{s.title}</h2>
                    <p className="text-[#F5F5DC]/60 text-sm mb-4">{s.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#B8860B] text-sm group-hover:gap-3 transition-all duration-300" style={{ fontWeight: 500 }}>
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

      {/* Featured Moments */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="لحظاتنا المميزة" subtitle="من أعمالنا" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moments.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -5 }} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ aspectRatio: "4/3" }}>
                <Image src={m.img} alt={m.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
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
        </div>
      </section>

      {/* Partners - Using Swiper.js Infinite Slider */}
      <PartnersSlider />

      {/* Testimonials */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="آراء عملائنا" subtitle="ثقتكم تُلهمنا" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }} className="p-6 rounded-2xl border border-[#B8860B]/15 relative" style={{ background: "linear-gradient(135deg, rgba(40,35,25,0.8) 0%, rgba(26,26,26,0.95) 100%)" }}>
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

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="تواصل معنا" subtitle="نسعد بتواصلكم" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* WhatsApp */}
            <motion.a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 text-center" style={{ background: "rgba(37,211,102,0.05)" }}>
              <div className="w-14 h-14 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </div>
              <p className="text-[#25D366]" style={{ fontWeight: 600 }}>واتساب</p>
              <p className="text-[#F5F5DC]/40 text-xs">ردود فورية</p>
            </motion.a>

            {/* Phone */}
            <motion.a href={`tel:${PHONE}`} whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#B8860B]/20 hover:border-[#B8860B]/40 transition-all duration-300 text-center" style={{ background: "rgba(184,134,11,0.05)" }}>
              <div className="w-14 h-14 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/30 flex items-center justify-center text-[#B8860B]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <p className="text-[#B8860B]" style={{ fontWeight: 600 }}>اتصل بنا</p>
              <p className="text-[#F5F5DC]/40 text-xs">+967 770 941 666</p>
            </motion.a>

            {/* Instagram */}
            <motion.a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#E1306C]/20 hover:border-[#E1306C]/40 transition-all duration-300 text-center" style={{ background: "rgba(225,48,108,0.05)" }}>
              <div className="w-14 h-14 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </div>
              <p className="text-[#E1306C]" style={{ fontWeight: 600 }}>إنستغرام</p>
              <p className="text-[#F5F5DC]/40 text-xs">@moain.7</p>
            </motion.a>

            {/* Email */}
            <motion.a href={`mailto:${EMAIL}`} whileHover={{ y: -5 }} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[#B8860B]/15 hover:border-[#B8860B]/30 transition-all duration-300 text-center" style={{ background: "rgba(30,25,15,0.4)" }}>
              <div className="w-14 h-14 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B]/70">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-[#F5F5DC]/80" style={{ fontWeight: 500 }}>البريد</p>
              <p className="text-[#B8860B] text-xs">{EMAIL}</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#B8860B] mb-3" style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}>✦ ابدأ رحلتك معنا ✦</p>
            <h2 className="text-[#F5F5DC] mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700 }}>جاهزون لإضافة لمسة فخامة لمناسبتك</h2>
            <p className="text-[#F5F5DC]/60 mb-10 leading-relaxed">تواصل معنا الآن واحصل على استشارة مجانية لتصميم تجربة ضيافة لا تُنسى</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white hover:shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5" style={{ fontWeight: 700, fontSize: "1rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل عبر واتساب
              </motion.a>
              <motion.a href={`tel:${PHONE}`} className="flex items-center gap-3 px-8 py-4 rounded-full border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 transition-all duration-300" style={{ fontWeight: 500, fontSize: "1rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                اتصل بنا الآن
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
