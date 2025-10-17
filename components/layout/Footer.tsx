'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export default function Footer() {
  const { settings } = useSiteSettings()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {settings.site_logo && (
                <img
                  src={settings.site_logo}
                  alt={(() => {
                    try {
                      if (typeof settings.site_name === 'string') {
                        return settings.site_name
                      } else if (settings.site_name && typeof settings.site_name === 'object') {
                        const nameObj = settings.site_name as { ar?: string; en?: string }
                        return nameObj.ar || nameObj.en || 'kynship'
                      }
                      return 'kynship'
                    } catch {
                      return 'kynship'
                    }
                  })()}
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                />
              )}
              <div>
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: settings.primary_color || '#1a365d' }}>
                  {(() => {
                    try {
                      if (typeof settings.site_name === 'string') {
                        return settings.site_name
                      } else if (settings.site_name && typeof settings.site_name === 'object') {
                        const nameObj = settings.site_name as { ar?: string; en?: string }
                        return nameObj.ar || nameObj.en || 'kynship'
                      }
                      return 'kynship'
                    } catch {
                      return 'kynship'
                    }
                  })()}
                </h3>
                <p className="text-gray-400 text-sm hidden sm:block">
                  {(() => {
                    try {
                      if (typeof settings.site_tagline === 'string') {
                        return settings.site_tagline
                      } else if (settings.site_tagline && typeof settings.site_tagline === 'object') {
                        const taglineObj = settings.site_tagline as { ar?: string; en?: string }
                        return taglineObj.ar || taglineObj.en || 'الجودة والأناقة'
                      }
                      return 'الجودة والأناقة'
                    } catch {
                      return 'الجودة والأناقة'
                    }
                  })()}
                </p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {settings.twitter_url && (
                <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors p-2 hover:bg-gray-800 rounded-lg">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">روابط سريعة</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">منتجاتنا</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/products?category=kitchens" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  مطابخ ألوميتال
                </Link>
              </li>
              <li>
                <Link href="/products?category=doors" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  أبواب ألوميتال
                </Link>
              </li>
              <li>
                <Link href="/products?category=windows" className="text-gray-400 hover:text-white transition-colors py-1 sm:py-2 block">
                  شبابيك ألوميتال
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{typeof settings.contact_phone === 'string' ? settings.contact_phone : '+20 100 123 4567'}</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{typeof settings.contact_email === 'string' ? settings.contact_email : 'info@kynship.com'}</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-400">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="break-words">{typeof settings.contact_address === 'string' ? settings.contact_address : 'القاهرة، مصر'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p className="break-words">{typeof settings.footer_text === 'string' ? settings.footer_text : '© 2024 kynship. جميع الحقوق محفوظة.'}</p>
        </div>
      </div>
    </footer>
  )
}
