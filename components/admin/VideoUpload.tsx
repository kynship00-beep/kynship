'use client'

import { useState, useRef } from 'react'
import { Upload, Link as LinkIcon, Loader2, X, Play } from 'lucide-react'
import { uploadVideo } from '@/lib/upload'
import toast from 'react-hot-toast'

interface VideoUploadProps {
  value?: string
  onChange: (url: string) => void
}

export default function VideoUpload({ value, onChange }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState(value || '')
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploadMethod, setUploadMethod] = useState<'supabase' | 'url'>('url')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // رفع على Supabase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      toast.error('يرجى اختيار فيديو فقط')
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error('حجم الفيديو يجب أن يكون أقل من 100 ميجابايت')
      return
    }

    setUploading(true)

    try {
      // Show preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase
      const uploadedUrl = await uploadVideo(file)

      if (uploadedUrl) {
        onChange(uploadedUrl)
        setUrl(uploadedUrl)
        toast.success('تم رفع الفيديو بنجاح على Supabase! ✅')
      } else {
        toast.error('فشل رفع الفيديو - تأكد من إعداد Supabase Storage')
        setPreview(null)
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('حدث خطأ أثناء رفع الفيديو')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl)
    setPreview(newUrl)
    onChange(newUrl)
    if (newUrl) {
      toast.success('تم حفظ الرابط!')
    }
  }

  const handleRemove = () => {
    setUrl('')
    setPreview(null)
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* اختيار طريقة الرفع */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => setUploadMethod('supabase')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            uploadMethod === 'supabase'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📤 رفع على Supabase
        </button>
        <button
          type="button"
          onClick={() => setUploadMethod('url')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            uploadMethod === 'url'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🔗 استخدام رابط
        </button>
      </div>

      {/* رفع على Supabase */}
      {uploadMethod === 'supabase' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />

          {preview ? (
            <div className="relative group">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-black">
                <video
                  src={preview}
                  controls
                  className="w-full h-full"
                  preload="metadata"
                />
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-primary-500"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-10 w-10 animate-spin" />
                  <span>جاري الرفع على Supabase...</span>
                </>
              ) : (
                <>
                  <Upload className="h-10 w-10" />
                  <span className="text-sm font-medium">اضغط لرفع فيديو</span>
                  <span className="text-xs text-gray-400">MP4, WebM, MOV حتى 100MB</span>
                  <span className="text-xs text-green-600 font-medium">✅ سيتم الرفع على Supabase Storage</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* استخدام رابط */}
      {uploadMethod === 'url' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رابط الفيديو (YouTube أو رابط مباشر)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="input pl-10"
                placeholder="https://www.youtube.com/watch?v=... أو رابط مباشر"
              />
            </div>
            {url && (
              <button
                type="button"
                onClick={handleRemove}
                className="btn btn-outline text-red-600 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            استخدم رابط YouTube (الأفضل) أو رابط فيديو مباشر
          </p>
        </div>
      )}

      {/* روابط سريعة */}
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">📹 ارفع الفيديو على:</p>
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://www.youtube.com/upload"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:underline flex items-center gap-1 p-2 hover:bg-white rounded"
          >
            🎥 YouTube (غير محدود)
          </a>
          <a
            href="https://vimeo.com/upload"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:underline flex items-center gap-1 p-2 hover:bg-white rounded"
          >
            🎬 Vimeo (500MB/أسبوع)
          </a>
          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:underline flex items-center gap-1 p-2 hover:bg-white rounded"
          >
            📁 Google Drive (15GB)
          </a>
          <a
            href="https://www.dropbox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:underline flex items-center gap-1 p-2 hover:bg-white rounded"
          >
            📦 Dropbox (2GB)
          </a>
          <a
            href="https://cloudinary.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:underline flex items-center gap-1 p-2 hover:bg-white rounded"
          >
            ☁️ Cloudinary (25GB)
          </a>
          <a
            href="https://streamable.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:underline flex items-center gap-1 p-2 hover:bg-white rounded"
          >
            📺 Streamable (مجاني)
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 بعد الرفع، انسخ الرابط المباشر للفيديو والصقه في الحقل أعلاه
        </p>
      </div>

      {/* نصائح */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <p className="font-semibold mb-2">💡 نصائح مهمة:</p>
        <ul className="text-xs space-y-1">
          <li>• <strong>YouTube:</strong> أفضل خيار (مجاني وغير محدود)</li>
          <li>• <strong>للخصوصية:</strong> اجعل الفيديو "Unlisted" أو "Private"</li>
          <li>• <strong>Google Drive:</strong> شارك الرابط كـ "Anyone with the link"</li>
          <li>• <strong>Facebook/Instagram:</strong> انسخ رابط الفيديو من المنشور</li>
          <li>• <strong>الجودة:</strong> استخدم 1080p أو أعلى للوضوح</li>
        </ul>
      </div>
    </div>
  )
}
