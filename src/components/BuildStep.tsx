import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy, AlertCircle, ArrowRight, ExternalLink, Hammer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'

interface BuildStepProps {
    stepId: string
    title: string
    description: string
    lovablePrompt: string
    onStepComplete?: () => void
    nextPath?: string
    isLastStep?: boolean
}

export function BuildStep({
    stepId,
    title,
    description,
    lovablePrompt,
    nextPath,
    isLastStep
}: BuildStepProps) {
    const navigate = useNavigate()
    const [artifact, setArtifact] = useState('')
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending')

    const storageKey = `rb_${stepId}_artifact`

    useEffect(() => {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
            setArtifact(saved)
            setStatus('success')
        }
    }, [stepId])

    const handleCopy = () => {
        navigator.clipboard.writeText(lovablePrompt)
        alert('Prompt copied!')
    }

    const saveArtifact = (type: 'success' | 'error') => {
        // For Build Track, the "Artifact" is often just a confirmation or a link/text.
        // We'll require at least SOME text input for "It Worked" to verify.
        if (type === 'success' && !artifact.trim()) {
            alert('Please add a screenshot link or note about what worked.')
            return
        }

        setStatus(type)
        if (type === 'success') {
            localStorage.setItem(storageKey, artifact || 'Completed')
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Left: Context & Instructions (Workspace) */}
            <div className="flex-1 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                    <p className="text-lg text-slate-600 mt-2">{description}</p>
                </div>

                {/* Build Panel - Embed here for now as requested "Secondary build panel (30%)" 
                    Actually, the prompt requested 70% workspace, 30% build panel. 
                    I'll put the "Copy" and "Lovable" stuff in the right column.
                */}
                <div className="prose prose-slate max-w-none">
                    <h3>Detailed Instructions</h3>
                    <p>
                        Follow the build panel instructions on the right to implement this step in Lovable.
                        Once you have verified the output, paste the result/screenshot below to unlock the next step.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Step Verification</h3>

                    <div className="space-y-4">
                        <textarea
                            value={artifact}
                            onChange={(e) => setArtifact(e.target.value)}
                            placeholder="Paste result, screenshot link, or notes here..."
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                        />

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => saveArtifact('success')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-medium transition-all ${status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                            >
                                <Check className="w-4 h-4" />
                                It Worked
                            </button>
                            <button
                                onClick={() => saveArtifact('error')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border font-medium transition-all ${status === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                            >
                                <AlertCircle className="w-4 h-4" />
                                Error / Issues
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="flex justify-end pt-4">
                    {!isLastStep && nextPath && (
                        <button
                            onClick={() => navigate(nextPath)}
                            disabled={status !== 'success'}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Right: Build Panel (30%) */}
            <div className="lg:w-[350px] flex-shrink-0 space-y-6">
                <Card className="bg-slate-900 text-white border-none shadow-xl sticky top-24">
                    <CardHeader className="border-b border-white/10 pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Hammer className="w-5 h-5 text-blue-400" />
                            Build in Lovable
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Copy this prompt logic
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative bg-slate-800 p-4 rounded-lg font-mono text-xs text-slate-300 min-h-[150px] max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                                {lovablePrompt}
                            </div>
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 p-1.5 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors"
                                title="Copy"
                            >
                                <Copy className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                        >
                            <Copy className="w-4 h-4" /> Copy Prompt
                        </button>

                        <a
                            href="https://lovable.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                        >
                            Open Lovable <ExternalLink className="w-4 h-4" />
                        </a>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
