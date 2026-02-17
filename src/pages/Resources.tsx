import { Card, CardContent, CardTitle, CardDescription } from '../components/ui/card'
import { BookOpen, ExternalLink, Download, PlayCircle, Code, CheckCircle2, Loader2, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const RESOURCES = [
  {
    id: 1,
    title: 'Cracking the Coding Interview',
    description: 'The ultimate guide to DSA and technical interviews. Master 189 problems.',
    type: 'Guide',
    format: 'PDF',
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'System Design Patterns',
    description: 'Learn scalable architecture patterns for high-growth startups and enterprises.',
    type: 'Video Course',
    format: 'Link',
    icon: PlayCircle,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    id: 3,
    title: 'MERN Stack Cheat Sheet',
    description: 'Quick reference for React, Express, and MongoDB optimization techniques.',
    type: 'Cheatsheet',
    format: 'PDF',
    icon: Code,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    id: 4,
    title: 'Behavioral Interview STAR Method',
    description: 'Master HR rounds with structured storytelling and behavioral techniques.',
    type: 'Guide',
    format: 'Video',
    icon: PlayCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }
]

export function Resources() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'loading' } | null>(null)
  const [downloading, setDownloading] = useState<number | null>(null)

  useEffect(() => {
    if (toast && toast.type === 'success') {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleDownload = (id: number, title: string) => {
    setDownloading(id)
    setToast({ message: `Preparing ${title}...`, type: 'loading' })

    setTimeout(() => {
      setDownloading(null)
      setToast({ message: `${title} downloaded successfully!`, type: 'success' })
    }, 2000)
  }

  const handleOpenLink = (title: string) => {
    setToast({ message: `Opening ${title} in new tab...`, type: 'success' })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      {/* Custom Toast */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 animate-in slide-in-from-right-4">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            {toast.type === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:text-slate-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Resources</h2>
          <p className="text-lg text-slate-600">Curated study materials to accelerate your placement journey.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border px-4 py-2 rounded-xl text-sm font-bold text-slate-400 shadow-sm">
            4 Files Saved
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESOURCES.map((item) => (
          <Card key={item.id} className="hover:shadow-xl transition-all duration-300 border-slate-100 overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row h-full">
                <div className={`sm:w-32 ${item.bg} flex items-center justify-center p-6 sm:p-0`}>
                  <item.icon className={`w-12 h-12 ${item.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.type}</span>
                      <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 uppercase">{item.format}</span>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed mb-6 line-clamp-2">{item.description}</CardDescription>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => item.format === 'PDF' ? handleDownload(item.id, item.title) : handleOpenLink(item.title)}
                      disabled={downloading === item.id}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-primary transition-colors disabled:opacity-50"
                    >
                      {item.format === 'PDF' ? (
                        downloading === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />
                      ) : (
                        <ExternalLink className="w-4 h-4" />
                      )}
                      {item.format === 'PDF' ? (downloading === item.id ? 'Downloading...' : 'Download') : 'View Collection'}
                    </button>
                    {item.format === 'PDF' && (
                      <span className="text-[10px] font-bold text-slate-300">2.4 MB</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
