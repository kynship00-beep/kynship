'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, ArrowLeft, Play, X } from 'lucide-react'
import toast from 'react-hot-toast'
import VideoUpload from '@/components/admin/VideoUpload'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { supabase } from '@/lib/supabase/client'

export default function IntroVideoSettingsPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const { settings: dbSettings, loading } = useSiteSettings()

  const [settings, setSettings] = useState({
    intro_video_enabled: false,
    intro_video_url: '',
    intro_video_can_skip: true,
    intro_video_autoplay: true,
    intro_video_show_once: true,
    intro_video_skip_delay: 3,
  })

  // Load settings from database
  useEffect(() => {
    if (!loading && dbSettings) {
      setSettings({
        intro_video_enabled: dbSettings.intro_video_enabled || false,
        intro_video_url: dbSettings.intro_video_url || '',
        intro_video_can_skip: dbSettings.intro_video_can_skip || true,
        intro_video_autoplay: dbSettings.intro_video_autoplay || true,
        intro_video_show_once: dbSettings.intro_video_show_once || true,
        intro_video_skip_delay: dbSettings.intro_video_skip_delay || 3,
      })
    }
  }, [dbSettings, loading])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        toast.error('يجب تسجيل الدخول أولاً')
        setSaving(false)
        return
      }

      // Update intro video settings in site_settings
      const updates = [
        { setting_key: 'intro_video_enabled', setting_value: settings.intro_video_enabled },
        { setting_key: 'intro_video_url', setting_value: settings.intro_video_url },
        { setting_key: 'intro_video_can_skip', setting_value: settings.intro_video_can_skip },
        { setting_key: 'intro_video_autoplay', setting_value: settings.intro_video_autoplay },
        { setting_key: 'intro_video_show_once', setting_value: settings.intro_video_show_once },
        { setting_key: 'intro_video_skip_delay', setting_value: settings.intro_video_skip_delay },
      ]

      for (const update of updates) {
        await supabase
          .from('site_settings')
          .upsert(
            {
              setting_key: update.setting_key,
              setting_value: update.setting_value,
              updated_by: user.id,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'setting_key' }
          )
      }

      toast.success('تم حفظ إعدادات الفيديو في قاعدة البيانات بنجاح! ✅')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    window.open('/', '_blank')
  }

  const getVideoId = (url: string) => {
    // Extract YouTube video ID
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    return match ? match[1] : null
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">فيديو الترحيب</h1>
            <p className="text-gray-600">إعدادات فيديو الترحيب الذي يظهر عند دخول الموقع</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={handlePreview} className="btn btn-outline">
            <Eye className="h-5 w-5" />
            معاينة
          </button>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            <Save className="h-5 w-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Settings */}
        <div className="space-y-6">
          {/* Enable/Disable */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">تفعيل فيديو الترحيب</h3>
                <p className="text-sm text-gray-600">عرض الفيديو عند دخول الزوار للموقع</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.intro_video_enabled}
                  onChange={(e) => setSettings({ ...settings, intro_video_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>

          {/* Video URL */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">الفيديو</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">رابط YouTube</label>
                <input
                  type="url"
                  value={settings.intro_video_url}
                  onChange={(e) => setSettings({ ...settings, intro_video_url: e.target.value })}
                  className="input"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  أدخل رابط YouTube
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">أو</span>
                </div>
              </div>

              <div>
                <label className="label">رفع فيديو من جهازك</label>
                <VideoUpload
                  value={settings.intro_video_url}
                  onChange={(url) => setSettings({ ...settings, intro_video_url: url })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  ارفع فيديو من جهازك (MP4, WebM, MOV حتى 50MB)
                </p>
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">خيارات العرض</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">تشغيل تلقائي</label>
                  <p className="text-sm text-gray-600">تشغيل الفيديو تلقائياً عند الفتح</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.intro_video_autoplay}
                  onChange={(e) => setSettings({ ...settings, intro_video_autoplay: e.target.checked })}
                  className="w-5 h-5 text-primary-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">السماح بالتخطي</label>
                  <p className="text-sm text-gray-600">إظهار زر تخطي الفيديو</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.intro_video_can_skip}
                  onChange={(e) => setSettings({ ...settings, intro_video_can_skip: e.target.checked })}
                  className="w-5 h-5 text-primary-500 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium">عرض مرة واحدة</label>
                  <p className="text-sm text-gray-600">عرض الفيديو مرة واحدة فقط لكل زائر</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.intro_video_show_once}
                  onChange={(e) => setSettings({ ...settings, intro_video_show_once: e.target.checked })}
                  className="w-5 h-5 text-primary-500 rounded"
                />
              </div>

              {settings.intro_video_can_skip && (
                <div>
                  <label className="label">وقت ظهور زر التخطي (بالثواني)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={settings.intro_video_skip_delay}
                    onChange={(e) => setSettings({ ...settings, intro_video_skip_delay: parseInt(e.target.value) })}
                    className="input"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    الوقت قبل ظهور زر التخطي (0 = يظهر فوراً)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">معاينة</h3>
            
            {settings.intro_video_enabled && settings.intro_video_url ? (
              <div className="space-y-4">
                {/* Video Preview */}
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {getVideoId(settings.intro_video_url) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getVideoId(settings.intro_video_url)}?autoplay=${settings.intro_video_autoplay ? 1 : 0}&controls=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={settings.intro_video_url}
                      controls
                      autoPlay={settings.intro_video_autoplay}
                      className="w-full h-full"
                    />
                  )}
                  
                  {settings.intro_video_can_skip && (
                    <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                      <X className="h-4 w-4" />
                      تخطي
                    </button>
                  )}
                </div>

                {/* Settings Summary */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الحالة:</span>
                    <span className="font-medium text-green-600">مفعّل</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">تشغيل تلقائي:</span>
                    <span className="font-medium">{settings.intro_video_autoplay ? 'نعم' : 'لا'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">يمكن التخطي:</span>
                    <span className="font-medium">{settings.intro_video_can_skip ? 'نعم' : 'لا'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">عرض مرة واحدة:</span>
                    <span className="font-medium">{settings.intro_video_show_once ? 'نعم' : 'لا'}</span>
                  </div>
                  {settings.intro_video_can_skip && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">وقت التخطي:</span>
                      <span className="font-medium">{settings.intro_video_skip_delay} ثانية</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400">
                <Play className="h-16 w-16 mb-4" />
                <p className="text-sm">
                  {!settings.intro_video_enabled ? 'الفيديو غير مفعّل' : 'أدخل رابط الفيديو'}
                </p>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-3">💡 نصائح:</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• استخدم فيديو قصير (15-30 ثانية)</li>
              <li>• تأكد من جودة الفيديو عالية</li>
              <li>• اجعل الرسالة واضحة ومباشرة</li>
              <li>• اختبر الفيديو على أجهزة مختلفة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
