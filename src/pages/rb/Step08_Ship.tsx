import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Rocket, Home } from 'lucide-react'
import { Card, CardContent } from '../../components/ui/card'

const CHECKLIST_STORAGE_KEY = 'rb-checklist'

export function Step08_Ship() {
    const [locked, setLocked] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY)
        if (saved) {
            try {
                const checked = JSON.parse(saved)
                if (Array.isArray(checked) && checked.length === 10) {
                    setLocked(false)
                }
            } catch (e) { }
        }
    }, [])

    if (locked) {
        return <div className="p-10 text-center text-slate-500">Locked. Complete Step 7 first.</div>
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Rocket className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Project 3 Ready!</h1>
            <p className="text-xl text-slate-600 max-w-lg">
                You have successfully designed, built, and tested the AI Resume Builder.
            </p>

            <Link
                to="/rb/proof"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover shadow-lg transition-all"
            >
                View Final Proof
            </Link>
        </div>
    )
}
