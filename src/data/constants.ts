export const WHATSAPP_NUMBER = "967770941666"
export const INSTAGRAM_URL = "https://www.instagram.com/moain.7"
export const EMAIL = "moain.learn@gmail.com"
export const PHONE = "+967770941666"

export const getWhatsAppLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`

export const images = {
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

export type NavLinkItem = {
  id: string
  label: string
  href: string
}

export const navLinks: NavLinkItem[] = [
  { id: 'home', label: 'الرئيسية', href: '/' },
  { id: 'services-male', label: 'خدمات رجالية', href: '/services/male' },
  { id: 'services-female', label: 'خدمات نسائية', href: '/services/female' },
  { id: 'services-other', label: 'خدمات تكميلية', href: '/services/other' },
]
