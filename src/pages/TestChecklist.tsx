import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckSquare, Square, RefreshCcw, Lock, Unlock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const CHECKLIST_STORAGE_KEY = 'prp-test-checklist'

const TEST_ITEMS = [
    { id: 'jd-validation', label: 'JD required validation works', hint: 'Go to Analyze, try empty JD.' },
    { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Type "hello world", verify red warning.' },
    { id: 'skills-extraction', label: 'Skills extraction groups correctly', hint: 'Verify Output has "Core CS", "Web", etc.' },
    { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Compare "TCS" vs "Startup" output.' },
    { id: 'score-calc', label: 'Score calculation is deterministic', hint: 'Same JD should yield same score always.' },
    { id: 'skill-toggles', label: 'Skill toggles update score live', hint: 'Click skills on Results page, watch score circle.' },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Toggle skills, reload, verify state keeps.' },
    { id: 'history-load', label: 'History saves and loads correctly', hint: 'Check /dashboard/history for saved entries.' },
    { id: 'export-btn', label: 'Export buttons copy the correct content', hint: 'Click Copy/Download, paste to Notepad.' },
    { id: 'console-errors', label: 'No console errors on core pages', hint: 'F12 -> Console. Should be clean.' },
]

export function TestChecklist() {
    const [checkedItems, setCheckedItems] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY)
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse checklist', e)
            }
        }
    }, [])

    const toggleItem = (id: string) => {
        setCheckedItems(prev => {
            const next = prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]

            localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next))
            return next
        })
    }

    const handleReset = () => {
        if (confirm('Reset all progress?')) {
            setCheckedItems([])
            localStorage.removeItem(CHECKLIST_STORAGE_KEY)
        }
    }

    const passedCount = checkedItems.length
    const totalCount = TEST_ITEMS.length
    const isComplete = passedCount === totalCount
    const progress = (passedCount / totalCount) * 100

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Test Checklist</h1>
                    <p className="text-slate-600">pre-ship validation sequence</p>
                </div>
                <div className="flex items-center gap-4">
                    {!isComplete && (
                        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
                            <AlertTriangle className="w-4 h-4" />
                            Fix issues before shipping
                        </div>
                    )}
                    <button
                        onClick={handleReset}
                        className="text-slate-400 hover:text-slate-600 flex items-center gap-1.5 text-sm transition-colors"
                    >
                        <RefreshCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
                    <div className="flex justify-between items-end mb-2">
                        <CardTitle className="text-xl">
                            Tests Passed: <span className={isComplete ? "text-green-600" : "text-slate-900"}>{passedCount}</span> / {totalCount}
                        </CardTitle>
                        <span className="text-sm font-medium text-slate-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ease-out ${isComplete ? 'bg-green-500' : 'bg-primary'}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {TEST_ITEMS.map((item) => {
                            const checked = checkedItems.includes(item.id)
                            return (
                                <div
                                    key={item.id}
                                    className={`
                    flex items-start gap-4 p-4 transition-colors hover:bg-slate-50 cursor-pointer select-none
                    ${checked ? 'bg-green-50/50' : ''}
                  `}
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <div className={`mt-1 transition-colors ${checked ? 'text-green-600' : 'text-slate-300'}`}>
                                        {checked ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-medium ${checked ? 'text-slate-700 line-through decoration-slate-300' : 'text-slate-900'}`}>
                                            {item.label}
                                        </h3>
                                        <p className="text-sm text-slate-400 mt-1">
                                            Hint: {item.hint}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Link
                    to="/prp/08-ship"
                    className={`
            inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all transform
            ${isComplete
                            ? 'bg-green-600 hover:bg-green-700 shadow-lg hover:-translate-y-0.5'
                            : 'bg-slate-300 cursor-not-allowed'
                        }
          `}
                    onClick={(e) => !isComplete && e.preventDefault()}
                >
                    {isComplete ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    Proceed to Ship
                </Link>
            </div>
        </div>
    )
}
