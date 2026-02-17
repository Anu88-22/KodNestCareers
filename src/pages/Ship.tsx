import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Rocket, Home } from 'lucide-react'
import { Card, CardContent } from '../components/ui/card'

const CHECKLIST_STORAGE_KEY = 'prp-test-checklist'
const TOTAL_TESTS = 10 // Must match TestChecklist.tsx

export function Ship() {
    const [locked, setLocked] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY)
        if (saved) {
            try {
                const checked = JSON.parse(saved)
                if (Array.isArray(checked) && checked.length === TOTAL_TESTS) {
                    setLocked(false)
                }
            } catch (e) {
                // ignore
            }
        }
    }, [])

    if (locked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <Lock className="w-10 h-10" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Shipment Locked</h1>
                        <p className="text-slate-600">
                            You must complete the pre-ship verification checklist before accessing this page.
                        </p>
                    </div>
                    <Link
                        to="/prp/07-test"
                        className="inline-block bg-primary text-white font-medium px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors"
                    >
                        Go to Checklist
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl w-full text-center space-y-8 animate-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full shadow-2xl shadow-green-500/50 mb-4 animate-bounce">
                    <Rocket className="w-12 h-12 text-white" />
                </div>

                <div>
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                        Ready to Ship!
                    </h1>
                    <p className="text-xl text-slate-300">
                        All 10 validation tests passed. The Placement Readiness Platform is stable and verified.
                    </p>
                </div>

                <Card className="bg-white/10 border-white/10 backdrop-blur-md">
                    <CardContent className="p-8">
                        <div className="grid grid-cols-2 gap-8 text-left">
                            <div>
                                <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-xs mb-1">Status</h3>
                                <p className="text-green-400 font-bold text-lg">VERIFIED GREEN</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-xs mb-1">Version</h3>
                                <p className="text-white font-bold text-lg">v1.0.0-rc1</p>
                            </div>
                            <div className="col-span-2">
                                <h3 className="font-semibold text-slate-200 uppercase tracking-wider text-xs mb-1">Next Steps</h3>
                                <p className="text-slate-300 text-sm">
                                    Deploy to production environment. Note: Ensure environment variables for production are set.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="pt-8 flex justify-center gap-4">
                    <Link to="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                        <Home className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
