import { Link, Outlet, useLocation } from 'react-router-dom'
import { FileText, Edit3, Eye, ShieldCheck, Home } from 'lucide-react'
import { ResumeProvider } from '../context/ResumeContext'

export function ResumeLayout() {
    const location = useLocation()
    const path = location.pathname

    const navLinks = [
        { to: '/resume/builder', label: 'Builder', icon: Edit3 },
        { to: '/resume/preview', label: 'Preview', icon: Eye },
        { to: '/resume/proof', label: 'Proof', icon: ShieldCheck },
    ]

    return (
        <ResumeProvider>
            <div className="min-h-screen bg-white flex flex-col">
                {/* Top Nav */}
                <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white sticky top-0 z-50">
                    <Link to="/resume" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
                        <FileText className="w-6 h-6 text-slate-900" />
                        AI Resume Builder
                    </Link>

                    <nav className="flex items-center bg-slate-100 p-1 rounded-lg">
                        {navLinks.map(({ to, label, icon: Icon }) => {
                            const isActive = path === to
                            return (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isActive
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>

                    <Link to="/" className="text-slate-400 hover:text-slate-900">
                        <Home className="w-5 h-5" />
                    </Link>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </ResumeProvider>
    )
}
