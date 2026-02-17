import { Link } from 'react-router-dom'
import { Code2, FileText, Search, GraduationCap, Briefcase, Sparkles } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-4">
            <Sparkles className="w-3.5 h-3.5" />
            Unified Career Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            KodNest <span className="text-blue-600">Premium</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate ecosystem for job seekers. Analyze job descriptions, build premium resumes, and master your technical interviews in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Modules Grid */}
      <section className="flex-1 px-6 py-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Module 1: Job Notification Tracker */}
          <Link to="/dashboard/analyze" className="group">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Job Notification Tracker</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Paste job notifications to extract skills, generate checklists, and track your application readiness.
              </p>
              <div className="flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest gap-2">
                Analyze JD <Code2 className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Module 2: AI Resume Builder */}
          <Link to="/resume" className="group">
            <div className="h-full bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm transition-all hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">AI Resume Builder</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Create high-impact, ATS-optimized resumes with real-time scoring, tailored suggestions, and professional PDF templates.
              </p>
              <div className="flex items-center text-indigo-600 font-bold text-xs uppercase tracking-widest gap-2">
                Build Resume <Code2 className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Module 3: Placement Readiness */}
          <Link to="/dashboard" className="group">
            <div className="h-full bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm transition-all hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Placement Prep</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Practice DSA problems, simulate mock interviews, and track your readiness across all technical domains to land your dream job.
              </p>
              <div className="flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest gap-2">
                Ready to Ship <Briefcase className="w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6 text-center">
        <div className="mb-4 flex justify-center gap-6 text-slate-400">
          <GraduationCap className="w-5 h-5" />
          <Code2 className="w-5 h-5" />
          <Briefcase className="w-5 h-5" />
        </div>
        <p className="text-slate-500 text-sm font-medium">
          © {new Date().getFullYear()} KodNest Careers. Built for the next generation of engineers.
        </p>
      </footer>
    </div>
  )
}
