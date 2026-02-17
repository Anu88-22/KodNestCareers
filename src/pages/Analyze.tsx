import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../components/ui/card'
import { runAnalysis } from '../lib/jdAnalysis'
import { saveToHistory } from '../lib/history'
import { AlertCircle } from 'lucide-react'

export function Analyze() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleAnalyze = () => {
    const text = jdText.trim()
    if (!text) return

    // Validation
    if (text.length < 200) {
      setShowWarning(true)
      return
    }
    setShowWarning(false)

    setIsAnalyzing(true)
    try {
      const result = runAnalysis({
        jdText: text,
        company: company.trim() || undefined,
        role: role.trim() || undefined,
      })

      const entry = saveToHistory({
        company: company.trim() || '',
        role: role.trim() || '',
        jdText: text,
        extractedSkills: result.extractedSkills,
        plan7Days: result.plan,
        checklist: result.checklist,
        roundMapping: result.roundMapping,
        questions: result.questions,
        baseScore: result.readinessScore,
        skillConfidenceMap: {},
        finalScore: result.readinessScore,
      })
      navigate(`/dashboard/results?id=${entry.id}`)
    } catch (e) {
      console.error("Analysis failed", e)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Job Notification Tracker</h2>
        <p className="text-slate-600 text-sm">
          Paste a job notification or JD to get a readiness plan and track your status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job details</CardTitle>
          <CardDescription>Company and role help improve your readiness score.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
              Company (optional)
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
              Role (optional)
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. SDE 1, Frontend Developer"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="jd" className="block text-sm font-medium text-slate-700 mb-1.5">
              Job description (required)
            </label>
            <textarea
              id="jd"
              value={jdText}
              onChange={(e) => {
                setJdText(e.target.value)
                if (showWarning && e.target.value.length >= 200) setShowWarning(false)
              }}
              placeholder="Paste the full job description here..."
              rows={12}
              className={`w-full px-3 py-2 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y ${showWarning ? 'border-red-500' : 'border-slate-200'}`}
            />
            {showWarning && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <p>This notification is too short for a deep analysis. Paste the full description for better output.</p>
              </div>
            )}
            <div className="text-xs text-slate-400 mt-1 text-right">
              {jdText.length} / 200 required
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!jdText.trim() || isAnalyzing}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {isAnalyzing ? 'Analyzing…' : 'Analyze'}
          </button>
        </CardFooter>
      </Card>
    </div>
  )
}
