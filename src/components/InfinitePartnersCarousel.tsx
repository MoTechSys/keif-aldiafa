"use client";

import { motion } from "framer-motion";
import { partners } from "@/data/services";

/**
 * InfinitePartnersCarousel
 * High-performance infinite loop slider using Framer Motion.
 * Duplicates items 3x for seamless looping without gaps.
 */
export default function InfinitePartnersCarousel() {
  // Triple the items for seamless infinite loop
  const items = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 px-4 overflow-hidden" aria-label="شركاء النجاح">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <p
            className="text-[#D4AF37] mb-2"
            style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
          >
            ✦ نثق بهم ويثقون بنا ✦
          </p>
          <h2
            className="text-[#F5F5DC]"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              fontWeight: 700,
            }}
          >
            شركاء النجاح
          </h2>
          <div
            className="mt-3 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
            style={{ width: "120px" }}
          />
        </div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <motion.div
          className="flex gap-6 items-center mb-4"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((partner, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 px-8 py-4 rounded-xl border border-[#D4AF37]/15 text-[#F5F5DC]/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer whitespace-nowrap select-none"
              style={{
                background: "rgba(30,25,15,0.5)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              {partner.name}
            </div>
          ))}
        </motion.div>

        {/* Row 2 - scrolls right (reverse) for visual depth */}
        <motion.div
          className="flex gap-6 items-center"
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...items].reverse().map((partner, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 px-6 py-3 rounded-lg border border-[#D4AF37]/10 text-[#F5F5DC]/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer whitespace-nowrap select-none"
              style={{
                background: "rgba(20,18,10,0.4)",
                fontSize: "0.8rem",
                fontWeight: 400,
              }}
            >
              {partner.nameEn}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
