-- إنشاء Storage Buckets في Supabase
-- شغل هذا السكريبت في SQL Editor في Supabase Dashboard

-- إنشاء البكتات المطلوبة
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos', 'logos', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('images', 'images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('products-images', 'products-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('site-assets', 'site-assets', true, 104857600, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']),
  ('user-avatars', 'user-avatars', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('pages-images', 'pages-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']),
  ('videos', 'videos', true, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime'])
ON CONFLICT (id) DO NOTHING;

-- السماح للجميع برؤية الصور العامة
CREATE POLICY "Public images are accessible to everyone"
ON storage.objects FOR SELECT
USING (bucket_id IN ('logos', 'images', 'products-images', 'site-assets', 'pages-images', 'videos'));

-- السماح للمستخدمين المسجلين برفع الصور
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('logos', 'images', 'products-images', 'site-assets', 'user-avatars', 'pages-images', 'videos') AND
  auth.role() = 'authenticated'
);

-- السماح للأدمن بإدارة جميع الصور
CREATE POLICY "Admins can manage all images"
ON storage.objects FOR ALL
USING (
  bucket_id IN ('logos', 'images', 'products-images', 'site-assets', 'user-avatars', 'pages-images', 'videos') AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'editor')
  )
);

-- فحص النتيجة
SELECT '✅ تم إنشاء جميع Storage Buckets بنجاح!' as status;
SELECT id, name, public FROM storage.buckets WHERE id IN ('logos', 'images', 'products-images', 'site-assets', 'user-avatars', 'pages-images', 'videos');
