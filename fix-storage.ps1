# حل مشكلة رفع الصور في Supabase - دليل شامل
Write-Host "🚀 حل مشكلة رفع الصور في Supabase" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host ""
Write-Host "🔧 المشكلة:" -ForegroundColor Red
Write-Host "===========" -ForegroundColor Red
Write-Host "رسالة الخطأ: 'فشل رفع الصورة - تأكد من إعداد Supabase Storage'" -ForegroundColor Yellow

Write-Host ""
Write-Host "📋 الحل خطوة بخطوة:" -ForegroundColor Green
Write-Host "====================" -ForegroundColor Green

Write-Host ""
Write-Host "الخطوة الأولى - إعداد Storage في Supabase:" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "1. اذهب إلى Supabase Dashboard" -ForegroundColor Gray
Write-Host "2. اختر مشروعك" -ForegroundColor Gray
Write-Host "3. اذهب إلى Storage في الشريط الجانبي" -ForegroundColor Gray
Write-Host "4. انقر على 'New Bucket'" -ForegroundColor Gray
Write-Host "5. أنشئ البكتات التالية:" -ForegroundColor Gray
Write-Host "   • logos (للشعارات)" -ForegroundColor Gray
Write-Host "   • images (للصور العامة)" -ForegroundColor Gray
Write-Host "   • products-images (لصور المنتجات)" -ForegroundColor Gray
Write-Host "   • site-assets (للأصول العامة)" -ForegroundColor Gray
Write-Host "   • user-avatars (لصور المستخدمين)" -ForegroundColor Gray
Write-Host "   • pages-images (لصور الصفحات)" -ForegroundColor Gray
Write-Host "   • videos (للفيديوهات)" -ForegroundColor Gray

Write-Host ""
Write-Host "الخطوة الثانية - شغل السكريبت في SQL Editor:" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "1. اذهب إلى SQL Editor في Supabase" -ForegroundColor Gray
Write-Host "2. انسخ محتوى setup-storage.sql" -ForegroundColor Gray
Write-Host "3. الصقه في SQL Editor" -ForegroundColor Gray
Write-Host "4. اضغط Run" -ForegroundColor Gray

Write-Host ""
Write-Host "الخطوة الثالثة - فحص النتيجة:" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "في Supabase Dashboard:" -ForegroundColor Gray
Write-Host "• اذهب إلى Storage → Buckets" -ForegroundColor Gray
Write-Host "• تأكد من وجود جميع البكتات" -ForegroundColor Gray
Write-Host "• تأكد من أنها Public" -ForegroundColor Gray

Write-Host ""
Write-Host "الخطوة الرابعة - اختبار الرفع:" -ForegroundColor Cyan
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "1. شغل المطور: npm run dev" -ForegroundColor Gray
Write-Host "2. اذهب إلى صفحة إعدادات الموقع" -ForegroundColor Gray
Write-Host "3. جرب رفع صورة للشعار" -ForegroundColor Gray
Write-Host "4. يجب أن ترى رسالة نجاح" -ForegroundColor Gray

Write-Host ""
Write-Host "🔍 استكشاف الأخطاء:" -ForegroundColor Red
Write-Host "===================" -ForegroundColor Red
Write-Host "إذا لم يعمل الرفع:" -ForegroundColor Yellow
Write-Host "1. تأكد من أن البكت عام (Public)" -ForegroundColor Gray
Write-Host "2. تأكد من تسجيل الدخول كأدمن" -ForegroundColor Gray
Write-Host "3. فحص Console في المتصفح للأخطاء" -ForegroundColor Gray
Write-Host "4. فحص Network tab للطلبات الفاشلة" -ForegroundColor Gray

Write-Host ""
Write-Host "📋 ملخص الملفات المطلوبة:" -ForegroundColor Yellow
Write-Host "==========================" -ForegroundColor Yellow

# عرض الملفات المطلوبة
$files = @("setup-complete.sql", "setup-storage.sql")
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "✅ $file موجود" -ForegroundColor Green
    } else {
        Write-Host "❌ $file غير موجود" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎯 النتيجة المتوقعة:" -ForegroundColor Green
Write-Host "====================" -ForegroundColor Green
Write-Host "✅ يمكن رفع الصور في جميع صفحات الأدمن" -ForegroundColor Green
Write-Host "✅ الصور تُحفظ في Supabase Storage" -ForegroundColor Green
Write-Host "✅ الصور تُعرض بشكل صحيح في الموقع" -ForegroundColor Green
Write-Host "✅ لا توجد رسائل خطأ في الرفع" -ForegroundColor Green

Write-Host ""
Write-Host "🔗 روابط مفيدة:" -ForegroundColor Blue
Write-Host "================" -ForegroundColor Blue
Write-Host "📚 Supabase Storage Docs:" -ForegroundColor Gray
Write-Host "   https://supabase.com/docs/guides/storage" -ForegroundColor Gray
Write-Host ""
Write-Host "🎨 مواقع رفع الصور المجانية:" -ForegroundColor Gray
Write-Host "   • https://imgur.com" -ForegroundColor Gray
Write-Host "   • https://cloudinary.com" -ForegroundColor Gray
Write-Host "   • https://imgbb.com" -ForegroundColor Gray
Write-Host "   • https://postimages.org" -ForegroundColor Gray

Write-Host ""
Write-Host "💡 نصيحة مهمة:" -ForegroundColor Yellow
Write-Host "===============" -ForegroundColor Yellow
Write-Host "إذا لم يعمل الرفع، جرب طريقة الرابط بدلاً من الرفع المباشر" -ForegroundColor Gray
Write-Host "يمكنك رفع الصور على Imgur ثم نسخ الرابط" -ForegroundColor Gray
