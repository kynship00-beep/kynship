'use client'

import { Package, ShoppingBag, Users, DollarSign, TrendingUp, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/supabase/queries'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch products count
      const products = await getProducts()
      const totalProducts = products.length

      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (ordersError) throw ordersError

      // Calculate stats
      const totalOrders = orders.length
      const pendingOrders = orders.filter(order => order.status === 'pending').length
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

      setStats({
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
      })

      setRecentOrders(orders || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('خطأ في تحميل بيانات لوحة التحكم')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة'
      case 'confirmed': return 'مؤكد'
      case 'shipped': return 'تم الشحن'
      case 'delivered': return 'تم التسليم'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="mr-3">جاري تحميل بيانات لوحة التحكم...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
        <p className="text-gray-600">مرحباً بك في لوحة تحكم kynship</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4" />
              جديد
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalProducts}</h3>
          <p className="text-gray-600 text-sm">إجمالي المنتجات</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4" />
              جديد
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalOrders}</h3>
          <p className="text-gray-600 text-sm">إجمالي الطلبات</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <span className="flex items-center gap-1 text-sm text-orange-600 font-semibold">
              <TrendingUp className="h-4 w-4" />
              قيد المراجعة
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingOrders}</h3>
          <p className="text-gray-600 text-sm">طلبات قيد المراجعة</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600 font-semibold">
              <TrendingUp className="h-4 w-4" />
              جديد
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {stats.totalRevenue.toLocaleString('ar-EG')} ج.م
          </h3>
          <p className="text-gray-600 text-sm">إجمالي المبيعات</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">أحدث الطلبات</h2>
            <a href="/admin/orders" className="text-primary-500 hover:text-primary-600 text-sm font-semibold">
              عرض الكل
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد طلبات حديثة
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">رقم الطلب</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">العميل</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">المبلغ</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">الحالة</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.order_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                      {order.total.toLocaleString('ar-EG')} ج.م
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('ar-EG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
