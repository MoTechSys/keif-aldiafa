'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

// معلومات التواصل
const WHATSAPP_NUMBER = "967770941666"
const INSTAGRAM_URL = "https://www.instagram.com/moain.7"
const EMAIL = "moain.learn@gmail.com"
const PHONE = "+967770941666"

// روابط التواصل
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`

// بيانات الخدمات
const services = [
  {
    id: 1,
    title: "ضيافة المناسبات الخاصة",
    description: "خدمات ضيافة فاخرة للأعراس والمناسبات الراقية",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    icon: "👑"
  },
  {
    id: 2,
    title: "الضيافة الرجالية والنسائية",
    description: "مضيفون ومضيفات محترفون بأزياء راقية",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    icon: "☕"
  },
  {
    id: 3,
    title: "الخدمات الفنية والإبداعية",
    description: "خطاطون، رسامون، فرق شعبية، ومزيد",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80",
    icon: "🎨"
  },
  {
    id: 4,
    title: "تقديماتنا الفاخرة",
    description: "قهوة سعودية، تمر فاخر، مشروبات راقية",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    icon: "✨"
  }
]

// بيانات المزايا
const features = [
  {
    icon: "🏆",
    title: "جودة استثنائية",
    description: "نلتزم بأعلى معايير الجودة في كل تفصيلة"
  },
  {
    icon: "💎",
    title: "احترافية عالية",
    description: "فريق مدرب ومحترف يضم نخبة من الخبراء"
  },
  {
    icon: "🌟",
    title: "تنوع شامل",
    description: "مجموعة متكاملة من الخدمات تلبي جميع احتياجاتكم"
  },
  {
    icon: "🤝",
    title: "خبرة واسعة",
    description: "سنوات من الخبرة في خدمة أعرق المناسبات"
  }
]

// بيانات آراء العملاء
const testimonials = [
  {
    name: "أبو محمد",
    role: "تاجر",
    content: "تجربة استثنائية من أول تواصل حتى نهاية الحفل. خدمة راقية تعكس الذوق السعودي الأصيل.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
  },
  {
    name: "أم فهد",
    role: "ربة منزل",
    content: "حفل زفاف ابنتي كان مميزاً بفضل خدمات كيف الضيافة. أنصح الجميع بالتعامل معهم.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
  },
  {
    name: "خالد العتيبي",
    role: "مدير شركة",
    content: "تعاملنا معهم في عدة مؤتمرات وكانت الخدمة على أعلى مستوى من الاحترافية.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80"
  }
]

// بيانات الشركاء
const partners = [
  "شركة القاسم القابضة",
  "مجموعة الراجحي",
  "فندق الريتز كارلتون",
  "شركة أرامكو",
  "وزارة السياحة",
  "الهلال الأحمر السعودي"
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F5DC] overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* خلفية متحركة */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a] z-10" />
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
            alt="خلفية فاخرة"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        {/* جسيمات ذهبية */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              <div 
                className="w-full h-full bg-[#D4AF37] rounded-full animate-pulse"
                style={{
                  boxShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37'
                }}
              />
            </div>
          ))}
        </div>

        {/* محتوى Hero */}
        <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
          {/* الشعار */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="gold-text">كيف الضيافة</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          </div>

          {/* العنوان الفرعي */}
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-[#F5F5DC]/90 mb-4 font-light animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            حيث تلتقي الفخامة بالضيافة الأصيلة
          </p>

          {/* الوصف */}
          <p 
            className="text-lg text-[#F5F5DC]/70 mb-12 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            نقدم لكم تجربة ضيافة استثنائية تجمع بين الأصالة السعودية والفخامة العصرية
          </p>

          {/* أزرار CTA */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0a0a0a] font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              تواصل معنا الآن
            </a>
            <a
              href="#services"
              className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-full text-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              اكتشف خدماتنا
            </a>
          </div>
        </div>

        {/* سهم للأسفل */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <a href="#services" className="text-[#D4AF37]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===== قسم الخدمات ===== */}
      <section id="services" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* عنوان القسم */}
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-lg mb-4 block">خدماتنا المميزة</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gold-text">لحظاتنا المميزة</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          </div>

          {/* بطاقات الخدمات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl glass-card card-luxury cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* صورة الخدمة */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                </div>

                {/* محتوى البطاقة */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{service.title}</h3>
                  <p className="text-[#F5F5DC]/80 text-sm">{service.description}</p>
                </div>

                {/* تأثير الـ hover */}
                <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== قسم المزايا ===== */}
      <section className="py-24 px-4 relative bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-lg mb-4 block">لماذا نحن؟</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gold-text">لماذا كيف الضيافة؟</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 glass-card rounded-2xl card-luxury"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#D4AF37] mb-3">{feature.title}</h3>
                <p className="text-[#F5F5DC]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== قسم الشركاء ===== */}
      <section className="py-16 px-4 overflow-hidden">
        <div className="text-center mb-12">
          <span className="text-[#D4AF37] text-lg">شركاء النجاح</span>
        </div>
        
        <div className="relative">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="glass-card px-8 py-4 rounded-lg inline-block"
              >
                <span className="text-[#D4AF37] font-semibold">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== قسم آراء العملاء ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-lg mb-4 block">آراء عملائنا</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gold-text">ماذا يقول عملاؤنا</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl card-luxury relative"
              >
                {/* علامات الاقتباس */}
                <div className="absolute top-4 right-4 text-6xl text-[#D4AF37]/20 font-serif">
                  "
                </div>
                
                {/* المحتوى */}
                <p className="text-[#F5F5DC]/90 mb-6 relative z-10 text-lg leading-relaxed">
                  {testimonial.content}
                </p>
                
                {/* معلومات العميل */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D4AF37]">{testimonial.name}</h4>
                    <p className="text-sm text-[#F5F5DC]/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== قسم التواصل ===== */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-lg mb-4 block">تواصل معنا</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gold-text">نحن هنا لخدمتكم</span>
            </h2>
            <p className="text-[#F5F5DC]/70 text-lg">
              نغطي جميع مناطق المملكة العربية السعودية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* معلومات التواصل */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex items-center gap-4 card-luxury">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <h4 className="font-bold text-[#D4AF37] mb-1">واتساب</h4>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  >
                    +967 770 941 666
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl flex items-center gap-4 card-luxury">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-[#D4AF37] mb-1">اتصل بنا</h4>
                  <a 
                    href={`tel:${PHONE}`}
                    className="text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  >
                    +967 770 941 666
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl flex items-center gap-4 card-luxury">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                  📸
                </div>
                <div>
                  <h4 className="font-bold text-[#D4AF37] mb-1">انستغرام</h4>
                  <a 
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  >
                    @moain.7
                  </a>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl flex items-center gap-4 card-luxury">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-2xl">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-[#D4AF37] mb-1">البريد الإلكتروني</h4>
                  <a 
                    href={`mailto:${EMAIL}`}
                    className="text-[#F5F5DC] hover:text-[#D4AF37] transition-colors"
                  >
                    moain.learn@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* الخريطة */}
            <div className="glass-card rounded-2xl overflow-hidden h-[400px] lg:h-auto relative">
              <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🇸🇦</div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">المملكة العربية السعودية</h3>
                  <p className="text-[#F5F5DC]/70">نغطي جميع مناطق المملكة</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {['جدة', 'مكة', 'الرياض', 'الدمام', 'المدينة', 'الطائف', 'تبوك', 'أبها'].map((city) => (
                      <span key={city} className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== الفوتر ===== */}
      <footer className="py-12 px-4 border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold gold-text mb-4">كيف الضيافة</h3>
          <p className="text-[#F5F5DC]/60 mb-6">حيث تلتقي الفخامة بالضيافة الأصيلة</p>
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href={`mailto:${EMAIL}`}
              className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          <p className="text-[#F5F5DC]/40 text-sm">
            © {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      {/* ===== زر واتساب عائم ===== */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 pulse-gold"
        style={{
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
        aria-label="تواصل عبر واتساب"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ===== زر القائمة العائم ===== */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsMenuOpen(!isMenuOpen)
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#D4AF37] to-[#C9A227] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        style={{
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)'
        }}
        aria-label="القائمة"
      >
        <svg 
          className="w-6 h-6 text-[#0a0a0a] transition-transform duration-300"
          style={{ transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* ===== القائمة المنبثقة ===== */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ease-out ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="glass-strong rounded-t-3xl p-8 pb-24"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-1 bg-[#D4AF37] rounded-full mx-auto mb-8" />
          
          <nav className="space-y-2">
            {[
              { href: '#', label: 'الرئيسية', icon: '🏠' },
              { href: '#services', label: 'خدماتنا', icon: '👑' },
              { href: '#offerings', label: 'تقديماتنا', icon: '☕' },
              { href: '#portfolio', label: 'معرض أعمالنا', icon: '📸' },
              { href: '#about', label: 'من نحن', icon: 'ℹ️' },
              { href: '#contact', label: 'تواصل معنا', icon: '📞' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#D4AF37]/10 transition-colors group"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg text-[#F5F5DC] group-hover:text-[#D4AF37] transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* overlay للقائمة */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
