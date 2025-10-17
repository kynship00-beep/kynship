'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, ArrowLeft, Image as ImageIcon, Type, Palette } from 'lucide-react'
import toast from 'react-hot-toast'
import ImageUpload from '@/components/admin/ImageUpload'
import { usePagesContent } from '@/hooks/usePagesContent'

export default function EditPagePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const { getPageContent, updatePageContent, getPageName } = usePagesContent()

  const [pageData, setPageData] = useState(() => {
    return getPageContent(params.id) || {}
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      await updatePageContent(params.id, pageData)
      toast.success('تم حفظ التغييرات بنجاح في قاعدة البيانات! ✅')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('حدث خطأ أثناء الحفظ')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    // Save current data to localStorage
    localStorage.setItem(`page_${params.id}_preview`, JSON.stringify(pageData))
    // Open preview in new tab
    const previewUrl = params.id === 'home' ? '/' : `/${params.id}`
    window.open(previewUrl + '?preview=true', '_blank')
  }

  const updateSection = (sectionKey: string, field: string, value: any) => {
    setPageData({
      ...pageData,
      sections: {
        ...pageData.sections,
        [sectionKey]: {
          ...pageData.sections[sectionKey],
          [field]: value,
        },
      },
    })
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
            <h1 className="text-3xl font-bold text-gray-900">تعديل: {getPageName(params.id)}</h1>
            <p className="text-gray-600">عدّل محتوى الصفحة</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePreview}
            className="btn btn-outline"
          >
            <Eye className="h-5 w-5" />
            معاينة
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
          >
            <Save className="h-5 w-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Editor */}
        <div className="space-y-6">
          {Object.entries(pageData.sections).map(([sectionKey, sectionData]: [string, any]) => (
            <div key={sectionKey} className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 capitalize">{sectionKey}</h3>
              
              <div className="space-y-4">
                {Object.entries(sectionData).map(([field, value]: [string, any]) => (
                  <div key={field}>
                    <label className="label capitalize">{field}</label>
                    
                    {field.includes('Image') || field.includes('image') ? (
                      <ImageUpload
                        value={value as string}
                        onChange={(url) => updateSection(sectionKey, field, url)}
                        bucket="pages"
                      />
                    ) : Array.isArray(value) ? (
                      <div className="space-y-2">
                        {value.map((item, index) => (
                          <input
                            key={index}
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newArray = [...value]
                              newArray[index] = e.target.value
                              updateSection(sectionKey, field, newArray)
                            }}
                            className="input"
                          />
                        ))}
                      </div>
                    ) : typeof value === 'string' && value.length > 50 ? (
                      <textarea
                        value={value}
                        onChange={(e) => updateSection(sectionKey, field, e.target.value)}
                        className="input"
                        rows={4}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => updateSection(sectionKey, field, e.target.value)}
                        className="input"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Preview */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">معاينة مباشرة</h3>
            <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] space-y-4">
              {/* Preview Hero Section */}
              {pageData.sections.hero && (
                <div className="bg-primary-500 text-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-2">
                    {pageData.sections.hero.title}
                  </h2>
                  {pageData.sections.hero.subtitle && (
                    <p className="text-lg opacity-90">
                      {pageData.sections.hero.subtitle}
                    </p>
                  )}
                  {pageData.sections.hero.buttonText && (
                    <button className="mt-4 bg-white text-primary-500 px-4 py-2 rounded-lg text-sm font-semibold">
                      {pageData.sections.hero.buttonText}
                    </button>
                  )}
                </div>
              )}

              {/* Preview About Section */}
              {pageData.sections.about && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-bold text-lg mb-2">
                    {pageData.sections.about.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {pageData.sections.about.description}
                  </p>
                  {pageData.sections.about.features && (
                    <ul className="space-y-1">
                      {pageData.sections.about.features.map((feature: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700">✓ {feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Preview Stats */}
              {pageData.sections.stats && (
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(pageData.sections.stats).map(([key, value]) => (
                    <div key={key} className="bg-white p-3 rounded-lg border text-center">
                      <div className="text-2xl font-bold text-primary-500">{value as string}+</div>
                      <div className="text-xs text-gray-600 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Preview Content */}
              {pageData.sections.content && (
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-700">
                    {pageData.sections.content.text}
                  </p>
                </div>
              )}

              {/* Preview Info */}
              {pageData.sections.info && (
                <div className="bg-white p-4 rounded-lg border space-y-2">
                  {Object.entries(pageData.sections.info).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-semibold capitalize">{key}:</span>{' '}
                      <span className="text-gray-600">{value as string}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-3">إجراءات سريعة:</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 hover:bg-blue-100 rounded-lg text-sm text-blue-800 flex items-center gap-2">
                <Type className="h-4 w-4" />
                تغيير الخطوط
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-blue-100 rounded-lg text-sm text-blue-800 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                تغيير الألوان
              </button>
              <button className="w-full text-left px-3 py-2 hover:bg-blue-100 rounded-lg text-sm text-blue-800 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                إدارة الصور
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
