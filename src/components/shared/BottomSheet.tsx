'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { navLinks, getWhatsAppLink, PHONE } from '@/data/constants'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
}

export default function BottomSheet({ isOpen, onClose }: BottomSheetProps) {
  const pathname = usePathname()
  const sheetRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 300], [1, 0])
  const backdropOpacity = useTransform(y, [0, 300], [0.6, 0])

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // Close if dragged down more than 100px or with velocity
      if (info.offset.y > 100 || info.velocity.y > 500) {
        onClose()
      }
      // Reset position
      y.set(0)
    },
    [onClose, y]
  )

  const getWhatsAppMessage = () => {
    if (pathname.startsWith('/services')) return "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."
    return "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم."
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
            style={{ opacity: backdropOpacity }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </motion.div>

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ y, opacity }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden touch-none"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
          >
            {/* Sheet Background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(26,26,26,0.97) 0%, rgba(40,30,10,0.97) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(184,134,11,0.3)",
                boxShadow: "0 -10px 60px rgba(184,134,11,0.15)",
              }}
            />

            {/* Sheet Content */}
            <div className="relative max-w-lg mx-auto px-6 py-6 pb-28" style={{ maxHeight: "80vh", overflowY: "auto" }}>
              {/* Drag Handle */}
              <div className="flex justify-center mb-6 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-[#B8860B]/60 rounded-full" />
              </div>

              {/* Brand */}
              <p className="text-center text-[#B8860B] mb-6" style={{ fontSize: "0.8rem", letterSpacing: "0.15em" }}>
                كيف الضيافة
              </p>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between w-full px-5 py-4 rounded-xl transition-all duration-200 group ${
                        pathname === link.href
                          ? "bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B]/30"
                          : "text-[#F5F5DC]/80 hover:bg-[#B8860B]/10 hover:text-[#B8860B] border border-transparent"
                      }`}
                      style={{ fontSize: "1.05rem", fontWeight: 500 }}
                    >
                      <span>{link.label}</span>
                      <span className="text-[#B8860B]/60 group-hover:text-[#B8860B] transition-colors">←</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-8">
                <a
                  href={getWhatsAppLink(getWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm hover:bg-[#25D366]/20 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  واتساب
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/30 text-[#B8860B] text-sm hover:bg-[#B8860B]/20 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  اتصال
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
