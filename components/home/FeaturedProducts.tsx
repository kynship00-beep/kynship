import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/supabase/queries'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Star, ShoppingCart } from 'lucide-react'
import AddToCartButton from '@/components/products/AddToCartButton'

export default async function FeaturedProducts() {
  let products: any[] = []
  
  try {
    const fetchedProducts = await getFeaturedProducts(6)
    products = fetchedProducts || []
  } catch (error) {
    console.error('Error fetching featured products:', error)
    products = []
  }

  // إذا مفيش منتجات، استخدم منتجات افتراضية للعرض
  if (!products || products.length === 0) {
    products = [
      {
        id: '1',
        name: 'نافذة ألوميتال عصرية',
        slug: 'modern-aluminum-window',
        description: 'نافذة ألوميتال بتصميم عصري وجودة عالية',
        category: 'نوافذ',
        price: 2500,
        discount_price: 2000,
        images: ['https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=400&fit=crop'],
        features: [],
        specifications: {},
        is_featured: true,
        is_active: true,
        stock_quantity: 10,
        rating: 4.5,
        reviews_count: 12,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: null
      },
      {
        id: '2',
        name: 'باب ألوميتال فاخر',
        slug: 'luxury-aluminum-door',
        description: 'باب ألوميتال فاخر بتشطيبات راقية',
        category: 'أبواب',
        price: 5000,
        discount_price: null,
        images: ['https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=400&fit=crop'],
        features: [],
        specifications: {},
        is_featured: true,
        is_active: true,
        stock_quantity: 5,
        rating: 5,
        reviews_count: 8,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: null
      },
      {
        id: '3',
        name: 'مطبخ ألوميتال كامل',
        slug: 'complete-aluminum-kitchen',
        description: 'مطبخ ألوميتال كامل بتصميم عصري',
        category: 'مطابخ',
        price: 15000,
        discount_price: 12000,
        images: ['https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop'],
        features: [],
        specifications: {},
        is_featured: true,
        is_active: true,
        stock_quantity: 3,
        rating: 4.8,
        reviews_count: 15,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: null
      }
    ]
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            منتجات مميزة
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            اكتشف أجود المنتجات من مجموعتنا المتميزة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => {
            const discount = product.discount_price
              ? calculateDiscount(product.price, product.discount_price)
              : 0

            return (
              <div key={product.id} className="card group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] mb-4 overflow-hidden">
                  <Image
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discount > 0 && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      خصم {discount}%
                    </div>
                  )}
                </Link>

                <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                  <span className="inline-block text-xs sm:text-sm text-primary-600 bg-primary-50 px-2 sm:px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </span>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-bold text-lg sm:text-xl hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">
                      {formatPrice(product.discount_price || product.price)}
                    </span>
                    {product.discount_price && (
                      <span className="text-sm sm:text-base text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      ({product.reviews_count} تقييم)
                    </span>
                  </div>

                  <AddToCartButton product={product} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <Link
            href="/products"
            className="btn bg-primary-500 hover:bg-primary-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            عرض جميع المنتجات
          </Link>
        </div>
      </div>
    </section>
  )
}
