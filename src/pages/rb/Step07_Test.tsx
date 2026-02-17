import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckSquare, Square, RefreshCcw, Lock, Unlock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

// Separate key for RB
const CHECKLIST_STORAGE_KEY = 'rb-checklist'

const TEST_ITEMS = [
    { id: 'rb-basic-info', label: 'Basic Info renders correctly', hint: 'Name, Email, Phone appear on preview.' },
    { id: 'rb-exp-add', label: 'Can add multiple experience entries', hint: 'Add 2 jobs, verify both show up.' },
    { id: 'rb-exp-delete', label: 'Can delete experience entries', hint: 'Remove a job, verify it disappears.' },
    { id: 'rb-skills', label: 'Skills group by category', hint: 'Technical vs Soft skills separation.' },
    { id: 'rb-pdf', label: 'PDF Export triggers print', hint: 'Click Download, check print dialog.' },
    { id: 'rb-layout', label: 'Layout holds on A4 size', hint: 'Check margins and overflow handling.' },
    { id: 'rb-persist', label: 'Data persists on refresh', hint: 'Reload page, resume data stays.' },
    { id: 'rb-clear', label: 'Clear All button works', hint: 'Reset form, preview clears.' },
    { id: 'rb-responsive', label: 'Mobile responsive forms', hint: 'Check form usability on mobile view.' },
    { id: 'rb-ats', label: 'ATS friendly structure (text selectable)', hint: 'Verify PDF text is copy-pasteable.' },
]

export function Step07_Test() {
    const [checkedItems, setCheckedItems] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY)
        if (saved) {
            try { setCheckedItems(JSON.parse(saved)) } catch (e) { }
        }
    }, [])

    const toggleItem = (id: string) => {
        setCheckedItems(prev => {
            const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next))
            return next
        })
    }

    const handleReset = () => {
        if (confirm('Reset checklist?')) {
            setCheckedItems([])
            localStorage.removeItem(CHECKLIST_STORAGE_KEY)
        }
    }

    const isComplete = checkedItems.length === TEST_ITEMS.length

    return (
        <div className="space-y-8 animate-in fade-in">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900">Step 7: Testing</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleReset} className="text-sm text-slate-500 hover:text-slate-900">Reset</button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Resume Builder Verification</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {TEST_ITEMS.map(item => {
                            const isChecked = checkedItems.includes(item.id)
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => toggleItem(item.id)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border ${isChecked ? 'bg-green-50 border-green-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                                >
                                    {isChecked ? <CheckSquare className="w-5 h-5 text-green-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                                    <span className={isChecked ? 'text-slate-700 line-through' : 'text-slate-900'}>{item.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Link
                    to="/rb/08-ship"
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all ${isComplete ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-300 pointer-events-none'}`}
                >
                    {isComplete ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    Proceed to Ship
                </Link>
            </div>
        </div>
    )
}
