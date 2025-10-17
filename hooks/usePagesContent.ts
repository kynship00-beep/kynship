'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export interface PageContent {
  id: string
  page_key: string
  page_name: string
  content: any
  is_active: boolean
  created_at: string
  updated_at: string
}

const defaultPagesContent: Record<string, any> = {
  home: {
    hero: {
      title: 'أفضل منتجات الألوميتال في مصر',
      subtitle: 'مطابخ وأبواب وشبابيك ألوميتال عصرية بجودة عالية',
      backgroundImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      buttonText: 'تصفح المنتجات'
    },
    about: {
      title: 'لماذا تختار kynship؟',
      description: 'نتميز بخبرة تزيد عن 15 عامًا في مجال الألوميتال',
      features: [
        'جودة عالية مضمونة',
        'أسعار مناسبة ومنافسة',
        'ضمان شامل على جميع المنتجات'
      ]
    },
    stats: {
      experience: '15',
      projects: '5000',
      clients: '3500',
      employees: '45'
    }
  },
  about: {
    hero: {
      title: 'من نحن',
      subtitle: 'شركة رائدة في مجال تصنيع وتركيب منتجات الألوميتال'
    },
    content: {
      text: 'نحن شركة kynship متخصصة في تصنيع وتركيب مطابخ وأبواب وشبابيك الألوميتال بأعلى معايير الجودة...'
    }
  },
  contact: {
    hero: {
      title: 'اتصل بنا',
      subtitle: 'نحن هنا للإجابة على جميع استفساراتك'
    },
    info: {
      phone: '+20 100 123 4567',
      email: 'info@kynship.com',
      address: 'القاهرة، مصر'
    }
  },
  faq: {
    hero: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات على أكثر الأسئلة شيوعاً'
    }
  }
}

export function usePagesContent() {
  const [pagesContent, setPagesContent] = useState<Record<string, any>>(defaultPagesContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPagesContent()

    // Subscribe to realtime changes
    const channel = supabase
      .channel('pages_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pages_content'
        },
        (payload) => {
          console.log('Pages content updated:', payload)
          loadPagesContent() // Reload content when changes occur
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function loadPagesContent() {
    try {
      const { data, error } = await supabase
        .from('pages_content')
        .select('*')
        .eq('is_active', true)

      if (error) {
        console.error('Error loading pages content:', error)
        return
      }

      if (data && data.length > 0) {
        // Convert array to object with page_key as key
        const contentObj: Record<string, any> = {}

        data.forEach((item: any) => {
          try {
            // Parse JSON content if it's stored as string
            let content = item.content
            if (typeof content === 'string') {
              content = JSON.parse(content)
            }
            contentObj[item.page_key] = content
          } catch (error) {
            console.error(`Error parsing content for page ${item.page_key}:`, error)
            contentObj[item.page_key] = defaultPagesContent[item.page_key] || {}
          }
        })

        console.log('Loaded pages content from Supabase:', contentObj)
        setPagesContent({ ...defaultPagesContent, ...contentObj })
      }
    } catch (error) {
      console.error('Error loading pages content:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updatePageContent(pageKey: string, content: any) {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not authenticated')
      }

      const { error } = await supabase
        .from('pages_content')
        .upsert(
          {
            page_key: pageKey,
            page_name: getPageName(pageKey),
            content: content,
            updated_by: user.id,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'page_key'
          }
        )

      if (error) {
        console.error('Error updating page content:', error)
        throw error
      }

      // Update local state immediately
      setPagesContent(prev => ({
        ...prev,
        [pageKey]: content
      }))

      return true
    } catch (error) {
      console.error('Error updating page content:', error)
      throw error
    }
  }

  function getPageContent(pageKey: string) {
    return pagesContent[pageKey] || defaultPagesContent[pageKey] || {}
  }

  function getPageName(pageKey: string) {
    const names: Record<string, string> = {
      home: 'الصفحة الرئيسية',
      about: 'من نحن',
      contact: 'اتصل بنا',
      faq: 'الأسئلة الشائعة'
    }
    return names[pageKey] || pageKey
  }

  return {
    pagesContent,
    loading,
    updatePageContent,
    getPageContent,
    getPageName
  }
}
