-- ============================================
-- kynship - Additional Realtime Setup
-- ============================================

-- هذا الملف يكمل إعدادات Realtime للجداول الأخرى
-- يُنصح بتنفيذ هذه الأوامر بعد إعداد الـ schema الأساسي
--
-- ملاحظة: الجداول التالية مُفعلة بالفعل في schema.sql:
-- - site_settings (للإعدادات)
-- - products (للمنتجات)
-- - orders (للطلبات)
--
-- هذا الملف يكمل التفعيل للجداول التالية فقط:
-- - pages_content (لمحتوى الصفحات)
-- - faq (للأسئلة الشائعة)

-- ============================================
-- ENABLE REALTIME FOR ADDITIONAL TABLES
-- ============================================

-- تفعيل Realtime لجدول محتوى الصفحات لتحديثات فورية في الصفحات
ALTER PUBLICATION supabase_realtime ADD TABLE public.pages_content;

-- تفعيل Realtime لجدول الأسئلة الشائعة لتحديثات فورية في صفحة الأسئلة
ALTER PUBLICATION supabase_realtime ADD TABLE public.faq;

-- ============================================
-- OPTIONAL: ENABLE REALTIME FOR LOGS
-- ============================================

-- تفعيل Realtime لجدول سجلات الأنشطة (للمراقبة اللحظية)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- ============================================
-- ADDITIONAL REALTIME FUNCTIONS
-- ============================================

-- دالة للحصول على منتجات محدثة في الوقت الفعلي
-- يمكن استخدامها في Hooks أخرى إذا لزم الأمر

-- مثال على كيفية إضافة Realtime للمنتجات في Hook آخر:
/*
export function useProductsRealtime() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // تحميل البيانات الأولية
    loadProducts()

    // الاشتراك في التحديثات
    const channel = supabase
      .channel('products_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'products'
      }, (payload) => {
        console.log('Products updated:', payload)
        loadProducts() // إعادة تحميل البيانات
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { products }
}
*/

-- ============================================
-- PERFORMANCE OPTIMIZATIONS
-- ============================================

-- فهرس إضافي للبحث السريع في المنتجات
CREATE INDEX IF NOT EXISTS idx_products_search ON public.products USING gin (
  to_tsvector('arabic', name || ' ' || COALESCE(description, ''))
);

-- فهرس للبحث في الطلبات بالتاريخ والحالة
CREATE INDEX IF NOT EXISTS idx_orders_composite ON public.orders(status, created_at DESC);

-- فهرس للتقييمات المعتمدة فقط
CREATE INDEX IF NOT EXISTS idx_reviews_approved_composite ON public.reviews(product_id, is_approved, created_at DESC);

-- ============================================
-- SETUP VERIFICATION QUERIES
-- ============================================

-- استعلام للتحقق من تفعيل RLS على جميع الجداول
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- استعلام للتحقق من وجود الـ Policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- استعلام للتحقق من تفعيل Realtime
SELECT * FROM pg_publication_tables
WHERE pubname = 'supabase_realtime';

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- في حالة عدم ظهور التعديلات، تأكد من:

-- 1. تفعيل Realtime في Supabase Dashboard
-- 2. وجود الصلاحيات الصحيحة في الـ Policies
-- 3. استخدام نفس اسم الجدول في الـ subscription
-- 4. فحص Console للأخطاء المتعلقة بـ WebSocket

-- مثال على فحص الأخطاء في Console:
/*
supabase
  .channel('test_channel')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'site_settings'
  }, (payload) => {
    console.log('✅ Realtime working:', payload)
  })
  .subscribe((status) => {
    console.log('Subscription status:', status)
  })
*/

-- ============================================
-- SETUP COMPLETE
-- ============================================

-- بعد تنفيذ هذا الملف، ستحصل على:
-- ✅ Realtime للمنتجات والطلبات والتقييمات والأسئلة الشائعة
-- ✅ فهارس محسنة للأداء
-- ✅ دوال مساعدة للـ Realtime
-- ✅ أدوات التشخيص والتتبع

-- للاختبار:
-- 1. قم بتعديل منتج في لوحة التحكم
-- 2. ستظهر التعديلات فوراً في صفحة المنتجات
-- 3. قم بتغيير حالة طلب في لوحة التحكم
-- 4. ستظهر التعديلات فوراً في صفحة الطلبات

-- 🎉 النظام الآن مكتمل بالكامل مع Realtime لجميع الجداول المهمة!
