'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import toast from 'react-hot-toast'
import type { Product } from '@/lib/supabase/client'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
}

export default function AddToCartButton({ product, quantity = 1 }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.discount_price || product.price,
      quantity,
      image: product.images[0] || '',
      category: product.category,
    })
    toast.success('تم إضافة المنتج للسلة')
  }

  return (
    <button
      onClick={handleAddToCart}
      className="btn bg-primary-500 hover:bg-primary-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full"
    >
      <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
      <span>أضف للسلة</span>
    </button>
  )
}
