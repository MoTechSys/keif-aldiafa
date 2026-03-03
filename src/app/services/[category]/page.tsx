import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import servicesData from '@/data/services.json'
import ServicePageClient from './ServicePageClient'

type CategoryKey = 'male' | 'female' | 'other'

const categoryMeta: Record<CategoryKey, { title: string; description: string }> = {
  male: {
    title: 'الخدمات الرجالية',
    description: 'فريق من المضيفين المحترفين المدربين على أعلى مستوى لتقديم خدمة الضيافة في المناسبات الرجالية.',
  },
  female: {
    title: 'الخدمات النسائية',
    description: 'مضيفات متميزات يجمعن بين الأناقة والاحترافية لتقديم تجربة ضيافة راقية في المناسبات النسائية.',
  },
  other: {
    title: 'الخدمات التكميلية',
    description: 'باقة متنوعة من الخدمات التكميلية الفاخرة التي تضيف لمسات إبداعية مميزة لمناسباتكم.',
  },
}

export async function generateStaticParams() {
  return [{ category: 'male' }, { category: 'female' }, { category: 'other' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const meta = categoryMeta[category as CategoryKey]
  if (!meta) return { title: 'غير موجود' }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | كيف الضيافة`,
      description: meta.description,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const validCategories: CategoryKey[] = ['male', 'female', 'other']

  if (!validCategories.includes(category as CategoryKey)) {
    notFound()
  }

  const data = servicesData[category as CategoryKey]

  return <ServicePageClient category={category as CategoryKey} data={data} />
}
