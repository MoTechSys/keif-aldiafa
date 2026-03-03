'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import partnersData from '@/data/partners.json'
import SectionTitle from './SectionTitle'

import 'swiper/css'
import 'swiper/css/free-mode'

export default function PartnersSlider() {
  const { partners } = partnersData

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="شركاء النجاح" subtitle="نثق بهم ويثقون بنا" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          freeMode={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2.5 },
            640: { slidesPerView: 3.5 },
            1024: { slidesPerView: 5.5 },
          }}
          className="partners-swiper"
        >
          {/* Double the partners for seamless loop */}
          {[...partners, ...partners].map((partner, i) => (
            <SwiperSlide key={`${partner.id}-${i}`} className="!w-auto">
              <div
                className="flex-shrink-0 px-8 py-4 rounded-xl border border-[#B8860B]/15 text-[#F5F5DC]/50 hover:text-[#B8860B] hover:border-[#B8860B]/40 transition-all duration-300 cursor-pointer whitespace-nowrap group grayscale hover:grayscale-0"
                style={{
                  background: "rgba(30,25,15,0.5)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                <span className="transition-colors duration-300 group-hover:text-[#B8860B]">
                  {partner.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
