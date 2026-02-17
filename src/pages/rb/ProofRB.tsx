import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

const STORAGE_STEPS = [
    '01-problem',
    '02-market',
    '03-architecture',
    '04-hld',
    '05-lld',
    '06-build',
    '07-test',
    '08-ship'
]

const STORAGE_KEY_SUBMISSION = 'rb_final_submission'

export function ProofRB() {
    const [completedSteps, setCompletedSteps] = useState<string[]>([])
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' })
    const [isShipped, setIsShipped] = useState(false)

    useEffect(() => {
        const done = STORAGE_STEPS.filter((id) => {
            if (id === '07-test') {
                const c = localStorage.getItem('rb-checklist')
                return c && JSON.parse(c).length === 10
            }
            if (id === '08-ship') return true
            return localStorage.getItem(`rb_${id}_artifact`)
        })

        setCompletedSteps(done)

        const savedLinks = localStorage.getItem(STORAGE_KEY_SUBMISSION)
        if (savedLinks) {
            try {
                setLinks(JSON.parse(savedLinks))
            } catch {
                // ignore parse errors
            }
        }
    }, [])

    useEffect(() => {
        const allLinks = Boolean(
            links.lovable && links.github && links.deployed
        )

        const allSteps = completedSteps.length >= 7

        setIsShipped(allLinks && allSteps)
    }, [completedSteps, links])

    const updateLink = (field: keyof typeof links, value: string) => {
        const next = { ...links, [field]: value }
        setLinks(next)
        localStorage.setItem(STORAGE_KEY_SUBMISSION, JSON.stringify(next))
    }

    const handleCopy = () => {
        const text = `
------------------------------------------
Project 3: AI Resume Builder — Final Submission

Steps Completed: ${completedSteps.length} / 8

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}
------------------------------------------
`.trim()

        navigator.clipboard.writeText(text)
        alert('Copied!')
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="text-center space-y-4">
                <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase border ${isShipped
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                >
                    {isShipped ? 'Shipped' : 'Build In Progress'}
                </div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Proof of Work
                </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Build Steps</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {STORAGE_STEPS.map((step) => {
                            const isDone =
                                completedSteps.includes(step) ||
                                (step === '08-ship' &&
                                    completedSteps.includes('07-test'))

                            return (
                                <div
                                    key={step}
                                    className="flex items-center justify-between p-2 border-b last:border-0 border-slate-100"
                                >
                                    <span className="text-sm font-medium capitalize">
                                        {step.replace(/-/g, ' ')}
                                    </span>

                                    {isDone ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <span className="text-xs text-slate-400">
                                            Pending
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Submission Artifacts</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <input
                            placeholder="Lovable Link"
                            value={links.lovable}
                            onChange={(e) =>
                                updateLink('lovable', e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded"
                        />

                        <input
                            placeholder="GitHub Link"
                            value={links.github}
                            onChange={(e) =>
                                updateLink('github', e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded"
                        />

                        <input
                            placeholder="Deployed Link"
                            value={links.deployed}
                            onChange={(e) =>
                                updateLink('deployed', e.target.value)
                            }
                            className="w-full px-3 py-2 border rounded"
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-center gap-4">
                <Link
                    to="/"
                    className="px-4 py-2 text-slate-500 hover:text-slate-900"
                >
                    Home
                </Link>

                <button
                    onClick={handleCopy}
                    className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold"
                >
                    Copy Final Submission
                </button>
            </div>
        </div>
    )
}

