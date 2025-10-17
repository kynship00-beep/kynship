-- ============================================
-- kynship - Complete Database Setup (All-in-One)
-- ============================================
-- هذا الملف يجمع جميع ملفات SQL في ملف واحد متناسق
-- يُنصح بتنفيذ هذا الملف مرة واحدة فقط لإعداد قاعدة البيانات بالكامل

-- ============================================
-- 1. SCHEMA SETUP (الأساسيات)
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums for user roles, order status, and product categories
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'editor', 'support', 'user');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE product_category AS ENUM ('kitchens', 'doors', 'windows');

-- ============================================
-- 2. USERS & PROFILES
-- ============================================

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'user' NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  )
);

-- ============================================
-- 3. SITE SETTINGS
-- ============================================

CREATE TABLE public.site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id)
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Settings are viewable by everyone"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Only admins can update settings"
  ON public.site_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor')
  )
);

-- Insert default settings
INSERT INTO public.site_settings (key, value, category) VALUES
('site_name', '{"ar": "kynship", "en": "kynship"}', 'general'),
('site_tagline', '{"ar": "الجودة والأناقة في منتجات الألوميتال", "en": "Quality and Elegance in Aluminum Products"}', 'general'),
('logo_url', '{"url": "", "enabled": true}', 'branding'),
('hero_banner', '{"title": "أفضل منتجات الألوميتال في مصر", "subtitle": "مطابخ وأبواب وشبابيك ألوميتال عصرية", "image": "", "enabled": true}', 'homepage'),
('contact_info', '{"phone": "+20 100 123 4567", "email": "info@kynship.com", "address": "القاهرة، مصر"}', 'contact'),
('intro_video', '{"url": "", "thumbnail": "", "autoplay": true, "can_skip": true, "enabled": false}', 'homepage');

-- إدراج إعدادات فيديو الترحيب الافتراضية
INSERT INTO public.site_settings (key, value) VALUES
('intro_video_enabled', false),
('intro_video_url', ''),
('intro_video_can_skip', true),
('intro_video_autoplay', true),
('intro_video_show_once', true),
('intro_video_skip_delay', 3)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 4. PRODUCTS
-- ============================================

CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category product_category NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2),
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor')
  )
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_slug ON public.products(slug);

-- ============================================
-- 5. ORDERS
-- ============================================

CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status order_status DEFAULT 'pending' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'support')
  )
);

CREATE POLICY "Users can create orders"
  ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  )
);

-- Create indexes
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

-- ============================================
-- 6. REVIEWS
-- ============================================

CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Approved reviews are viewable by everyone"
  ON public.reviews FOR SELECT USING (is_approved = true OR auth.uid() = user_id);

CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage reviews"
  ON public.reviews FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor')
  )
);

-- Create indexes
CREATE INDEX idx_reviews_product ON public.reviews(product_id);
CREATE INDEX idx_reviews_approved ON public.reviews(is_approved) WHERE is_approved = true;

-- ============================================
-- 7. CONTACT MESSAGES
-- ============================================

CREATE TABLE public.contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied_at TIMESTAMPTZ,
  replied_by UUID REFERENCES public.profiles(id),
  reply_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create contact messages"
  ON public.contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Support can view and manage messages"
  ON public.contact_messages FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'support')
  )
);

-- Create indexes
CREATE INDEX idx_messages_read ON public.contact_messages(is_read);
CREATE INDEX idx_messages_created ON public.contact_messages(created_at DESC);

-- ============================================
-- 8. FAQ
-- ============================================

CREATE TABLE public.faq (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Active FAQ viewable by everyone"
  ON public.faq FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage FAQ"
  ON public.faq FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor')
  )
);

-- Create index
CREATE INDEX idx_faq_order ON public.faq(order_index);

-- ============================================
-- 9. ACTIVITY LOGS
-- ============================================

CREATE TABLE public.activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view activity logs"
  ON public.activity_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
  )
);

-- Create indexes
CREATE INDEX idx_logs_user ON public.activity_logs(user_id);
CREATE INDEX idx_logs_created ON public.activity_logs(created_at DESC);

-- ============================================
-- 10. PAGES CONTENT
-- ============================================

CREATE TABLE public.pages_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id)
);

-- Enable RLS
ALTER TABLE public.pages_content ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Pages content is viewable by everyone"
  ON public.pages_content FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage pages content"
  ON public.pages_content FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor')
  )
);

-- Create index
CREATE INDEX idx_pages_content_key ON public.pages_content(page_key);

-- Insert default pages content
INSERT INTO public.pages_content (page_key, page_name, content) VALUES
('home', 'الصفحة الرئيسية', '{
  "hero": {
    "title": "أفضل منتجات الألوميتال في مصر",
    "subtitle": "مطابخ وأبواب وشبابيك ألوميتال عصرية بجودة عالية",
    "backgroundImage": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
    "buttonText": "تصفح المنتجات"
  },
  "about": {
    "title": "لماذا تختار kynship؟",
    "description": "نتميز بخبرة تزيد عن 15 عامًا في مجال الألوميتال",
    "features": [
      "جودة عالية مضمونة",
      "أسعار مناسبة ومنافسة",
      "ضمان شامل على جميع المنتجات"
    ]
  },
  "stats": {
    "experience": "15",
    "projects": "5000",
    "clients": "3500",
    "employees": "45"
  }
}'),
('about', 'من نحن', '{
  "hero": {
    "title": "من نحن",
    "subtitle": "شركة رائدة في مجال تصنيع وتركيب منتجات الألوميتال"
  },
  "content": {
    "text": "نحن شركة kynship متخصصة في تصنيع وتركيب مطابخ وأبواب وشبابيك الألوميتال بأعلى معايير الجودة..."
  }
}'),
('contact', 'اتصل بنا', '{
  "hero": {
    "title": "اتصل بنا",
    "subtitle": "نحن هنا للإجابة على جميع استفساراتك"
  },
  "info": {
    "phone": "+20 100 123 4567",
    "email": "info@kynship.com",
    "address": "القاهرة، مصر"
  }
}'),
('faq', 'الأسئلة الشائعة', '{
  "hero": {
    "title": "الأسئلة الشائعة",
    "subtitle": "إجابات على أكثر الأسئلة شيوعاً"
  }
}');

-- ============================================
-- 11. FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON public.faq
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products
  SET
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.reviews
      WHERE product_id = NEW.product_id AND is_approved = true
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE product_id = NEW.product_id AND is_approved = true
    )
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger for reviews
CREATE TRIGGER update_product_rating_on_review AFTER INSERT OR UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 12. STORAGE BUCKETS & POLICIES
-- ============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('products-images', 'products-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('site-assets', 'site-assets', true, 104857600, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']),
  ('user-avatars', 'user-avatars', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('pages-images', 'pages-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for products images
CREATE POLICY "Products images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'products-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can manage product images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'products-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor'))
  );

-- Storage policies for site assets
CREATE POLICY "Site assets are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can manage site assets" ON storage.objects
  FOR ALL USING (
    bucket_id = 'site-assets' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor'))
  );

-- Storage policies for user avatars
CREATE POLICY "User avatars are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar" ON storage.objects
  FOR DELETE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies for pages images
CREATE POLICY "Pages images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'pages-images');

CREATE POLICY "Admins can manage pages images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'pages-images' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor'))
  );

-- ============================================
-- 13. ADDITIONAL FUNCTIONS & INDEXES
-- ============================================

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_details JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.activity_logs (user_id, action, entity_type, entity_id, details)
  VALUES (auth.uid(), p_action, p_entity_type, p_entity_id, p_details)
  RETURNING id INTO log_id;
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to soft delete products
CREATE OR REPLACE FUNCTION soft_delete_product(p_product_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  PERFORM log_admin_action('soft_delete', 'product', p_product_id, '{"deleted": true}');
  UPDATE public.products SET is_active = false, updated_at = NOW() WHERE id = p_product_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to restore soft deleted products
CREATE OR REPLACE FUNCTION restore_product(p_product_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  PERFORM log_admin_action('restore', 'product', p_product_id, '{"restored": true}');
  UPDATE public.products SET is_active = true, updated_at = NOW() WHERE id = p_product_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock_quantity) WHERE stock_quantity > 0;
CREATE INDEX IF NOT EXISTS idx_orders_total ON public.orders(total DESC);
CREATE INDEX IF NOT EXISTS idx_settings_category ON public.site_settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.site_settings(key);

-- Additional RLS policies
CREATE POLICY "Only active products visible to public" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view own activity logs" ON public.activity_logs
  FOR SELECT USING (user_id = auth.uid());

-- ============================================
-- 14. REALTIME SETUP
-- ============================================

-- Enable realtime for key tables (تفعيل جميع الجداول المهمة في ملف واحد)
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pages_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.faq;

-- ============================================
-- 15. PERFORMANCE OPTIMIZATIONS
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
-- SETUP COMPLETE!
-- ============================================

-- استعلامات التحقق النهائية
SELECT '✅ kynship database setup completed successfully!' as status;

-- فحص عدد الجداول المُنشأة
SELECT COUNT(*) as tables_count FROM pg_tables WHERE schemaname = 'public';

-- فحص عدد الـ Policies المُنشأة
SELECT COUNT(*) as policies_count FROM pg_policies WHERE schemaname = 'public';

-- فحص Storage Buckets المُنشأة
SELECT COUNT(*) as buckets_count FROM storage.buckets;

-- فحص الجداول المُفعلة في Realtime
SELECT COUNT(*) as realtime_tables_count FROM pg_publication_tables WHERE pubname = 'supabase_realtime';

-- ============================================
-- تعليمات ما بعد التنفيذ:
-- ============================================

-- 1. اذهب إلى Supabase Dashboard -> Storage وقم بإنشاء الـ Buckets يدوياً:
--    - products-images (لصور المنتجات)
--    - site-assets (للأصول العامة)
--    - user-avatars (لصور المستخدمين)
--    - pages-images (لصور الصفحات)

-- 2. فعّل RLS على جميع الجداول في Database -> Tables

-- 3. فعّل Realtime في Database -> Replication

-- 4. اختبر الإعدادات في التطبيق

-- 5. تأكد من وجود متغيرات البيئة الصحيحة في Vercel

-- 🎉 قاعدة البيانات الآن جاهزة بالكامل!
