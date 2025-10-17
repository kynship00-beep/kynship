'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingCart, User, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useCartStore } from '@/lib/store/cartStore'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, profile, signOut, isAdmin } = useAuth()
  const itemsCount = useCartStore((state) => state.getItemsCount())
  const { settings } = useSiteSettings()

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/products', label: 'المنتجات' },
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'اتصل بنا' },
    { href: '/faq', label: 'أسئلة شائعة' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {settings.site_logo && settings.site_logo !== '' && settings.site_logo !== '/logo.svg' && (
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
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  console.error('Logo image failed to load:', settings.site_logo)
                  e.currentTarget.style.display = 'none'
                }}
                onLoad={(e) => {
                  console.log('Logo image loaded successfully:', settings.site_logo)
                }}
                key={settings.site_logo} // Force re-render when URL changes
              />
            )}
            <div className="flex flex-col">
              <span className="text-xl font-bold" style={{ color: settings.primary_color || '#1a365d' }}>
                {(() => {
                  try {
                    if (typeof settings.site_name === 'string') {
                      // If it's already a string, use it directly
                      return settings.site_name
                    } else if (settings.site_name && typeof settings.site_name === 'object') {
                      // If it's a JSON object, try to get Arabic value
                      const nameObj = settings.site_name as { ar?: string; en?: string }
                      return nameObj.ar || nameObj.en || 'kynship'
                    }
                    return 'kynship'
                  } catch {
                    return 'kynship'
                  }
                })()}
              </span>
              <span className="text-xs" style={{ color: settings.secondary_color || '#2d3748' }}>
                {(() => {
                  try {
                    if (typeof settings.site_tagline === 'string') {
                      // If it's already a string, use it directly
                      return settings.site_tagline
                    } else if (settings.site_tagline && typeof settings.site_tagline === 'object') {
                      // If it's a JSON object, try to get Arabic value
                      const taglineObj = settings.site_tagline as { ar?: string; en?: string }
                      return taglineObj.ar || taglineObj.en || 'الجودة والأناقة'
                    }
                    return 'الجودة والأناقة'
                  } catch {
                    return 'الجودة والأناقة'
                  }
                })()}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - Desktop only */}
            <button className="hidden sm:flex items-center gap-2 rounded-lg bg-gray-100 px-3 sm:px-4 py-2 text-sm hover:bg-gray-200 transition-colors">
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">بحث...</span>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-accent-500 text-xs text-white">
                  {itemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-2 sm:px-3 py-2 hover:bg-gray-200 transition-colors"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  {profile?.full_name ? profile.full_name.split(' ')[0] : 'الحساب'}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 sm:w-64 rounded-lg bg-white shadow-lg border z-50">
                  {user ? (
                    <>
                      <div className="border-b px-4 py-3">
                        <p className="text-sm font-medium truncate">{profile?.full_name || 'مستخدم'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        حسابي
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        طلباتي
                      </Link>
                      {isAdmin() && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 border-t transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          لوحة التحكم
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut()
                          setUserMenuOpen(false)
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t transition-colors"
                      >
                        تسجيل الخروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        تسجيل الدخول
                      </Link>
                      <Link
                        href="/auth/register"
                        className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        إنشاء حساب
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t py-4 bg-white">
            <div className="space-y-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50 rounded-lg px-3 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="px-4 py-3 border-t mt-4">
              <button className="w-full flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-sm hover:bg-gray-200 transition-colors">
                <Search className="h-5 w-5" />
                <span>البحث في المنتجات...</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
