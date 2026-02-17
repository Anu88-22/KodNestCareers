import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Wand2 } from 'lucide-react'

export function ResumeLanding() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in mt-20">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl rotate-3">
                <FileText className="w-8 h-8" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-3xl">
                Build a Resume That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400">Gets Read.</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl">
                Clean, ATS-friendly, and professionally designed.
                Start building your career story in minutes, not hours.
            </p>

            <div className="flex gap-4 pt-4">
                <Link
                    to="/resume/builder"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-transform hover:-translate-y-1 shadow-lg"
                >
                    <Wand2 className="w-5 h-5" />
                    Start Building
                </Link>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors"
                >
                    Dashboard
                </Link>
            </div>

            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl w-full">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">ATS Friendly</h3>
                    <p className="text-slate-500 text-sm">Optimized structure for robotic parsers.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">Live Preview</h3>
                    <p className="text-slate-500 text-sm">See your changes in real-time as you type.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">Premium Design</h3>
                    <p className="text-slate-500 text-sm">Minimalist aesthetics that look professional.</p>
                </div>
            </div>
        </div>
    )
}
