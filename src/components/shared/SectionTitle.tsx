'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  center?: boolean
}

export default function SectionTitle({ title, subtitle, center = true }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className={`text-[#B8860B] mb-2 ${center ? "text-center" : ""}`}
          style={{ fontSize: "0.8rem", letterSpacing: "0.2em" }}
        >
          ✦ {subtitle || "كيف الضيافة"} ✦
        </p>
        <h2
          className={`text-[#F5F5DC] ${center ? "text-center" : ""}`}
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 700 }}
        >
          {title}
        </h2>
        <div
          className={`mt-3 h-px bg-gradient-to-r from-transparent via-[#B8860B] to-transparent ${center ? "mx-auto" : ""}`}
          style={{ width: "120px" }}
        />
      </motion.div>
    </div>
  )
}
