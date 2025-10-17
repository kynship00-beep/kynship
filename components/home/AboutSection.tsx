'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Award, Users, Wrench } from 'lucide-react'
import { usePagesContent } from '@/hooks/usePagesContent'

export default function AboutSection() {
  const { getPageContent } = usePagesContent()

  const [content, setContent] = useState({
    title: 'لماذا تختار kynship؟',
    description: 'نتميز بخبرة تزيد عن 15 عامًا في مجال الألوميتال',
    features: [
      'جودة عالية مضمونة',
      'خبرة تزيد عن 15 عامًا',
      'أسعار مناسبة ومنافسة',
      'ضمان شامل على جميع المنتجات',
    ],
  })

  useEffect(() => {
    const pageContent = getPageContent('home')
    if (pageContent.sections?.about) {
      setContent({
        title: pageContent.sections.about.title || content.title,
        description: pageContent.sections.about.description || content.description,
        features: pageContent.sections.about.features || content.features,
      })
    }
  }, [getPageContent])

  const features = [
    {
      icon: CheckCircle,
      title: 'جودة عالية مضمونة',
      description: 'نستخدم أفضل خامات الألوميتال المستوردة',
    },
    {
      icon: Award,
      title: 'خبرة تزيد عن 15 عامًا',
      description: 'فريق محترف ومتخصص في مجال الألوميتال',
    },
    {
      icon: Users,
      title: 'رضا العملاء أولويتنا',
      description: 'أكثر من 5000 عميل راضٍ عن خدماتنا',
    },
    {
      icon: Wrench,
      title: 'ضمان شامل',
      description: 'ضمان على جميع المنتجات والتركيبات',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary-500" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
