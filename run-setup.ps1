# تشغيل سكريبت إعداد قاعدة البيانات الكامل
Write-Host "🚀 تشغيل سكريبت إعداد قاعدة البيانات الكامل..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

Write-Host ""
Write-Host "📋 تعليمات التشغيل:" -ForegroundColor Yellow
Write-Host "==================" -ForegroundColor Yellow
Write-Host "1. اذهب إلى Supabase Dashboard" -ForegroundColor Gray
Write-Host "2. اذهب إلى SQL Editor" -ForegroundColor Gray
Write-Host "3. انسخ محتوى setup-complete.sql" -ForegroundColor Gray
Write-Host "4. الصقه في SQL Editor واضغط Run" -ForegroundColor Gray
Write-Host ""
Write-Host "📄 محتوى setup-complete.sql:" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

# عرض محتوى الملف
if (Test-Path "setup-complete.sql") {
    Write-Host "✅ ملف setup-complete.sql موجود" -ForegroundColor Green
    Write-Host ""
    Write-Host "💡 للحصول على محتوى الملف الكامل:" -ForegroundColor Yellow
    Write-Host "• افتح setup-complete.sql في المحرر" -ForegroundColor Gray
    Write-Host "• انسخ المحتوى بالكامل" -ForegroundColor Gray
    Write-Host "• الصقه في Supabase SQL Editor" -ForegroundColor Gray
} else {
    Write-Host "❌ ملف setup-complete.sql غير موجود" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔍 فحص سريع للبيانات:" -ForegroundColor Yellow
Write-Host "========================" -ForegroundColor Yellow

# فحص ما إذا كانت البيانات موجودة في قاعدة البيانات
Write-Host "💡 اذهب إلى Supabase Dashboard وفحص:" -ForegroundColor Yellow
Write-Host "• Table Editor → pages_content → فحص البيانات" -ForegroundColor Gray
Write-Host "• Table Editor → site_settings → فحص البيانات" -ForegroundColor Gray

Write-Host ""
Write-Host "🎯 بعد تشغيل السكريبت:" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host "✅ جميع الجداول والصلاحيات ستُنشأ" -ForegroundColor Green
Write-Host "✅ البيانات الافتراضية ستُدرج" -ForegroundColor Green
Write-Host "✅ صفحات الأدمن ستعمل بشكل طبيعي" -ForegroundColor Green
Write-Host "✅ المعاينة المباشرة ستظهر المحتوى" -ForegroundColor Green

Write-Host ""
Write-Host "🔧 استكشاف الأخطاء:" -ForegroundColor Red
Write-Host "===================" -ForegroundColor Red
Write-Host "إذا لم تظهر البيانات:" -ForegroundColor Yellow
Write-Host "1. تأكد من تشغيل setup-complete.sql بالكامل" -ForegroundColor Gray
Write-Host "2. فحص Console في المتصفح للأخطاء" -ForegroundColor Gray
Write-Host "3. فحص Network tab في DevTools" -ForegroundColor Gray
Write-Host "4. تشغيل: .\database-tools.ps1 -CheckConnection" -ForegroundColor Gray
