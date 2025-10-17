'use client'

import { useEffect, useState, useRef } from 'react'
import { TrendingUp, Users, Award, Briefcase } from 'lucide-react'
import { usePagesContent } from '@/hooks/usePagesContent'

export default function StatsSection() {
  const { getPageContent } = usePagesContent()

  const [statsData, setStatsData] = useState({
    experience: '15',
    projects: '5000',
    clients: '3500',
    employees: '45',
  })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const pageContent = getPageContent('home')
    if (pageContent.sections?.stats) {
      setStatsData({
        experience: pageContent.sections.stats.experience || statsData.experience,
        projects: pageContent.sections.stats.projects || statsData.projects,
        clients: pageContent.sections.stats.clients || statsData.clients,
        employees: pageContent.sections.stats.employees || statsData.employees,
      })
    }
  }, [getPageContent])

  const stats = [
    { icon: TrendingUp, label: 'سنوات الخبرة', value: parseInt(statsData.experience), suffix: '+' },
    { icon: Briefcase, label: 'مشروع مكتمل', value: parseInt(statsData.projects), suffix: '+' },
    { icon: Users, label: 'عميل راضٍ', value: parseInt(statsData.clients), suffix: '+' },
    { icon: Award, label: 'موظف محترف', value: parseInt(statsData.employees), suffix: '+' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-primary-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
                <stat.icon className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 lg:mb-3">
                {isVisible ? (
                  <CountUp end={stat.value} suffix={stat.suffix} />
                ) : (
                  '0'
                )}
              </div>
              <div className="text-sm sm:text-base lg:text-lg opacity-90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return <>{count}{suffix}</>
}
