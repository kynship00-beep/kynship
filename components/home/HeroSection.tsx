'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { usePagesContent } from '@/hooks/usePagesContent'

export default function HeroSection() {
  const { settings } = useSiteSettings()
  const { getPageContent } = usePagesContent()

  const [content, setContent] = useState({
    title: 'أفضل منتجات الألوميتال في مصر',
    subtitle: 'مطابخ وأبواب وشبابيك ألوميتال عصرية بجودة عالية',
    buttonText: 'تصفح المنتجات',
  })

  useEffect(() => {
    const pageContent = getPageContent('home')
    if (pageContent.sections?.hero) {
      setContent({
        title: pageContent.sections.hero.title || content.title,
        subtitle: pageContent.sections.hero.subtitle || content.subtitle,
        buttonText: pageContent.sections.hero.buttonText || content.buttonText,
      })
    }
  }, [getPageContent])

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 text-white overflow-hidden">
      {/* Background Image */}
      {settings.hero_background && (
        <div className="absolute inset-0">
          <img
            src={settings.hero_background}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/80 to-primary-700/80" />
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 animate-fade-in leading-tight">
            {content.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 text-white/90 animate-fade-in-delay max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center animate-fade-in-delay-2">
            <Link
              href="/products"
              className="btn bg-white text-primary-500 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {content.buttonText}
            </Link>
            <Link
              href="/contact"
              className="btn bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white/20 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
