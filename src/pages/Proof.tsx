import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, Copy, ShieldCheck, AlertCircle, Home, Hammer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

const STORAGE_KEY_STEPS = 'prp_steps_completion'
const STORAGE_KEY_SUBMISSION = 'prp_final_submission'
const CHECKLIST_STORAGE_KEY = 'prp-test-checklist' // To check if 10/10 passed

// The 8 Steps of the Project
const PROJECT_STEPS = [
    { id: 'step-1', label: 'Project Setup & Routing' },
    { id: 'step-2', label: 'JD Analysis Logic' },
    { id: 'step-3', label: 'Mock Data & Heuristics' },
    { id: 'step-4', label: 'Results Dashboard UI' },
    { id: 'step-5', label: 'Interactive Features (Skills)' },
    { id: 'step-6', label: 'Hardening & Validation' },
    { id: 'step-7', label: 'Test Checklist Verification' },
    { id: 'step-8', label: 'Final Polish & Ship' }
]

export function Proof() {
    // Step State
    const [completedSteps, setCompletedSteps] = useState<string[]>([])

    // Artifact Inputs
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    })

    // Computed State
    const [checklistPassed, setChecklistPassed] = useState(false)
    const [isShipped, setIsShipped] = useState(false)

    // Load Data
    useEffect(() => {
        // 1. Load Steps
        const savedSteps = localStorage.getItem(STORAGE_KEY_STEPS)
        if (savedSteps) {
            try { setCompletedSteps(JSON.parse(savedSteps)) } catch (e) { }
        }

        // 2. Load Links
        const savedLinks = localStorage.getItem(STORAGE_KEY_SUBMISSION)
        if (savedLinks) {
            try { setLinks(JSON.parse(savedLinks)) } catch (e) { }
        }

        // 3. Load Checklist Status
        const savedChecklist = localStorage.getItem(CHECKLIST_STORAGE_KEY)
        if (savedChecklist) {
            try {
                const parsed = JSON.parse(savedChecklist)
                if (Array.isArray(parsed) && parsed.length === 10) {
                    setChecklistPassed(true)
                }
            } catch (e) { }
        }
    }, [])

    // Derived Shipping Status
    useEffect(() => {
        // Rule: 8 steps + 10 checklist + 3 links
        const allStepsDone = PROJECT_STEPS.every(s => completedSteps.includes(s.id))
        const allLinksPresent = Boolean(links.lovable && links.github && links.deployed)

        setIsShipped(allStepsDone && checklistPassed && allLinksPresent)
    }, [completedSteps, checklistPassed, links])

    const toggleStep = (id: string) => {
        setCompletedSteps(prev => {
            const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            localStorage.setItem(STORAGE_KEY_STEPS, JSON.stringify(next))
            return next
        })
    }

    const updateLink = (field: 'lovable' | 'github' | 'deployed', value: string) => {
        const next = { ...links, [field]: value }
        setLinks(next)
        localStorage.setItem(STORAGE_KEY_SUBMISSION, JSON.stringify(next))
    }

    const handleCopySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim()
        navigator.clipboard.writeText(text)
        alert('Submission copied to clipboard!')
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase border ${isShipped ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        {isShipped ? <ShieldCheck className="w-4 h-4" /> : <Hammer className="w-4 h-4" />}
                        {isShipped ? 'Shipped' : 'In Progress'}
                    </div>

                    {isShipped && (
                        <div className="space-y-2 animate-in slide-in-from-bottom-4 duration-700">
                            <h1 className="text-3xl font-bold text-slate-900">You built a real product.</h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Not a tutorial. Not a clone. A structured tool that solves a real problem.<br />
                                This is your proof of work.
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Col: Steps */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Steps</CardTitle>
                            <CardDescription>Track your build journey</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {PROJECT_STEPS.map(step => {
                                    const isDone = completedSteps.includes(step.id)
                                    return (
                                        <div
                                            key={step.id}
                                            onClick={() => toggleStep(step.id)}
                                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${isDone ? 'bg-green-50 border-green-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                                        >
                                            <span className={`text-sm font-medium ${isDone ? 'text-green-800' : 'text-slate-600'}`}>
                                                {step.label}
                                            </span>
                                            {isDone && <Check className="w-4 h-4 text-green-600" />}
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Col: Artifacts & Validation */}
                    <div className="space-y-6">

                        {/* Checklist Status */}
                        <Card className={checklistPassed ? 'border-green-200 bg-green-50/50' : 'border-orange-200 bg-orange-50/50'}>
                            <CardContent className="pt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${checklistPassed ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {checklistPassed ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold ${checklistPassed ? 'text-green-900' : 'text-orange-900'}`}>
                                            Test Checklist
                                        </h3>
                                        <p className={`text-sm ${checklistPassed ? 'text-green-700' : 'text-orange-700'}`}>
                                            {checklistPassed ? 'All 10 tests passed' : 'Pending verification'}
                                        </p>
                                    </div>
                                </div>
                                {!checklistPassed && (
                                    <Link to="/prp/07-test" className="text-sm font-medium text-orange-700 hover:underline">
                                        Go to tests &rarr;
                                    </Link>
                                )}
                            </CardContent>
                        </Card>

                        {/* Submissions Inputs */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Submission Artifacts</CardTitle>
                                <CardDescription>Required for 'Shipped' status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Lovable Project Link</label>
                                    <input
                                        type="url"
                                        placeholder="https://lovable.dev/..."
                                        value={links.lovable}
                                        onChange={e => updateLink('lovable', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">GitHub Repository</label>
                                    <input
                                        type="url"
                                        placeholder="https://github.com/..."
                                        value={links.github}
                                        onChange={e => updateLink('github', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Live Deployment</label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        value={links.deployed}
                                        onChange={e => updateLink('deployed', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-500">
                        {!isShipped ? (
                            <span className="flex items-center gap-2 text-orange-600">
                                <AlertCircle className="w-4 h-4" />
                                Complete all steps, pass tests, and add links to ship.
                            </span>
                        ) : (
                            <span className="text-green-600 font-medium">
                                Ready for submission!
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-slate-500 hover:text-slate-900 text-sm font-medium px-4 py-2">
                            <Home className="w-4 h-4 inline mr-2" />
                            Home
                        </Link>
                        <button
                            onClick={handleCopySubmission}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                        >
                            <Copy className="w-4 h-4" />
                            Copy Final Submission
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
