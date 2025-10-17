-- ============================================
-- kynship - Storage Policies & Additional Setup
-- ============================================

-- ============================================
-- STORAGE BUCKET POLICIES
-- ============================================

-- 1. products-images bucket (public read, authenticated upload)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products-images',
  'products-images',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- 2. site-assets bucket (public read, admin upload)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  104857600, -- 100MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 3. user-avatars bucket (public read, authenticated upload)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-avatars',
  'user-avatars',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 5. pages-images bucket (public read, admin upload)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pages-images',
  'pages-images',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Products images policies
CREATE POLICY "Products images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'products-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'products-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can manage product images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'products-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'editor')
    )
  );

-- Site assets policies
CREATE POLICY "Site assets are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can manage site assets" ON storage.objects
  FOR ALL USING (
    bucket_id = 'site-assets' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'editor')
    )
  );

-- User avatars policies
CREATE POLICY "User avatars are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar" ON storage.objects
  FOR DELETE USING (bucket_id = 'user-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Pages images policies
CREATE POLICY "Pages images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'pages-images');

CREATE POLICY "Admins can manage pages images" ON storage.objects
  FOR ALL USING (
    bucket_id = 'pages-images' AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'editor')
    )
  );

-- ============================================
-- ADDITIONAL REALTIME SETUP
-- ============================================

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

-- ============================================
-- ADDITIONAL FUNCTIONS
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

-- Function to soft delete products (instead of hard delete)
CREATE OR REPLACE FUNCTION soft_delete_product(p_product_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Log the action
  PERFORM log_admin_action('soft_delete', 'product', p_product_id, '{"deleted": true}');

  -- Soft delete the product
  UPDATE public.products
  SET is_active = false, updated_at = NOW()
  WHERE id = p_product_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to restore soft deleted products
CREATE OR REPLACE FUNCTION restore_product(p_product_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Log the action
  PERFORM log_admin_action('restore', 'product', p_product_id, '{"restored": true}');

  -- Restore the product
  UPDATE public.products
  SET is_active = true, updated_at = NOW()
  WHERE id = p_product_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ADDITIONAL INDEXES FOR PERFORMANCE
-- ============================================

-- Additional indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock_quantity) WHERE stock_quantity > 0;
CREATE INDEX IF NOT EXISTS idx_orders_total ON public.orders(total DESC);
CREATE INDEX IF NOT EXISTS idx_settings_category ON public.site_settings(category);
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.site_settings(key);

-- ============================================
-- ROW LEVEL SECURITY ADDITIONS
-- ============================================

-- Additional RLS policies for better security

-- Ensure only active products are shown in public queries
CREATE POLICY "Only active products visible to public" ON public.products
  FOR SELECT USING (is_active = true);

-- Users can only see their own activity logs
CREATE POLICY "Users can view own activity logs" ON public.activity_logs
  FOR SELECT USING (user_id = auth.uid());

-- ============================================
-- SETUP COMPLETE
-- ============================================

-- To complete the setup, run these commands in your Supabase Dashboard:
-- 1. Enable Row Level Security on all tables (already done in schema)
-- 2. Create storage buckets as defined above
-- 3. Set up the storage policies as defined above
-- 4. Enable realtime for the tables listed above
-- 5. Test the admin panel functionality

-- The schema is now complete with:
-- ✅ Full RLS policies for all tables
-- ✅ Storage bucket definitions and policies
-- ✅ Realtime subscriptions for live updates
-- ✅ Additional utility functions for admin actions
-- ✅ Performance optimizations with proper indexes
