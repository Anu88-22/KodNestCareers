import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import type { HistoryEntry } from '../lib/history'
import { getHistoryEntryById, getHistory, updateHistoryEntry } from '../lib/history'
import { Check, Copy, Download, BookOpen, Building2, Users, Target, Briefcase, CircleDashed, ArrowRight } from 'lucide-react'

const circleSize = 120
const strokeWidth = 12
const radius = (circleSize - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

function ReadinessCircle({ score }: { score: number }) {
  const dashOffset = circumference * (1 - score / 100)

  // Color transition based on score
  const getColor = (s: number) => {
    if (s >= 80) return "hsl(142, 71%, 45%)" // Green
    if (s >= 50) return "hsl(245, 58%, 51%)" // Blue
    return "hsl(35, 92%, 55%)" // Orange
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={circleSize * 1.2}
        height={circleSize * 1.2}
        className="transform -rotate-90"
        aria-hidden
      >
        <circle
          cx={circleSize * 0.6}
          cy={circleSize * 0.6}
          r={radius}
          fill="none"
          stroke="hsl(220 13% 91%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={circleSize * 0.6}
          cy={circleSize * 0.6}
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.6s ease-in-out, stroke 0.6s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900 transition-all duration-300">{Math.round(score)}</span>
        <span className="text-xs font-medium text-slate-500 mt-0.5">Readiness Score</span>
      </div>
    </div>
  )
}

// Re-defining for local usage if import is tricky with strict changes
const DISPLAY_CATEGORIES: Record<string, string> = {
  coreCS: 'Core CS & Fundamentals',
  languages: 'Languages',
  web: 'Web & Mobile',
  data: 'Data & Databases',
  cloud: 'Cloud & DevOps',
  testing: 'Testing',
  other: 'Tools & Others'
}

export function Results() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [entry, setEntry] = useState<HistoryEntry | null>(null)
  const [notFound, setNotFound] = useState(false)

  // State for skills and score
  const [skillConfidence, setSkillConfidence] = useState<Record<string, 'know' | 'practice'>>({})
  const [liveScore, setLiveScore] = useState(0)

  useEffect(() => {
    if (id) {
      const e = getHistoryEntryById(id)
      if (e) {
        setEntry(e)
        setSkillConfidence(e.skillConfidenceMap || {})
        setLiveScore(e.finalScore || e.baseScore) // Use finalScore if available
      } else {
        setNotFound(true)
      }
    } else {
      // Fallback to latest
      const list = getHistory()
      if (list.length > 0) {
        const e = list[0]
        setEntry(e)
        setSkillConfidence(e.skillConfidenceMap || {})
        setLiveScore(e.finalScore || e.baseScore)
      } else {
        setNotFound(true)
      }
    }
  }, [id])

  // Compute live score whenever confidence changes
  useEffect(() => {
    if (!entry) return

    let knows = 0
    let practices = 0

    Object.values(skillConfidence).forEach(status => {
      if (status === 'know') knows++
      if (status === 'practice') practices++
    })

    // Calculated score logic based on Base Score
    // finalScore = baseScore + (knows * 2) - (practices * 2)
    // Clamp 0-100
    let score = entry.baseScore + (knows * 2) - (practices * 2)
    score = Math.max(0, Math.min(100, score))

    setLiveScore(score)

    // Debounce save
    const timer = setTimeout(() => {
      if (entry.id) {
        updateHistoryEntry(entry.id, {
          skillConfidenceMap: skillConfidence,
          finalScore: score
        })
      }
    }, 1000)

    return () => clearTimeout(timer)

  }, [skillConfidence, entry])

  const toggleSkill = (skill: string) => {
    setSkillConfidence(prev => {
      const current = prev[skill] || 'practice' // Default is practice
      return {
        ...prev,
        [skill]: current === 'practice' ? 'know' : 'practice'
      }
    })
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const handleDownload = () => {
    if (!entry) return
    const content = `
PLACEMENT PREPARATION PLAN
--------------------------
Company: ${entry.companyIntel?.name || entry.company || 'N/A'}
Role: ${entry.role || 'N/A'}
Date: ${new Date(entry.createdAt).toLocaleDateString()}
Readiness Score: ${liveScore}

COMPANY INTEL
-------------
Industry: ${entry.companyIntel?.industry || 'N/A'}
Size: ${entry.companyIntel?.size || 'N/A'}
Hiring Focus: ${entry.companyIntel?.hiringFocus || 'N/A'}

I. SKILLS CHECKLIST
${Object.entries(entry.extractedSkills).map(([cat, skills]) => {
      if (!Array.isArray(skills)) return '' // Safety check
      return skills.length ? `${DISPLAY_CATEGORIES[cat] || cat}: ${skills.map(s =>
        `${s} [${skillConfidence[s] === 'know' ? 'READY' : 'PRACTICE'}]`
      ).join(', ')}` : ''
    }).filter(Boolean).join('\n')}

II. 7-DAY PLAN
${entry.plan7Days.map(p => `[Day ${p.day}] ${p.title}\n${p.tasks.map(t => `    - ${t}`).join('\n')}`).join('\n\n')}

III. RECRUITMENT PROCESS
${entry.roundMapping.map(r => `[ ] ${r.roundTitle}\n    Rationale: ${r.whyItMatters}\n    Focus: ${r.focusAreas.map(f => f).join(', ')}`).join('\n\n')}

IV. INTERVIEW QUESTIONS
${entry.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `placement-plan-${entry.company || 'analysis'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Get weak skills for "Action Next"
  const weakSkills = useMemo(() => {
    if (!entry) return []
    // Flatten skills from strict schema
    const allSkills = Object.values(entry.extractedSkills).flat().filter(s => typeof s === 'string')
    return allSkills.filter(s => (skillConfidence[s] || 'practice') === 'practice').slice(0, 3)
  }, [entry, skillConfidence])

  if (notFound) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Results</h2>
        <Card>
          <CardContent className="py-10 text-center text-slate-600">
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8 text-orange-500" />
              <p>One saved entry couldn't be loaded or no analysis found.</p>
              <div className="mt-4">
                <Link to="/dashboard/analyze" className="text-primary font-medium hover:underline">
                  Create a new analysis
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Results</h2>
        <Card>
          <CardContent className="py-10 text-center text-slate-600">
            Loading...
          </CardContent>
        </Card>
      </div>
    )
  }

  const { extractedSkills, roundMapping, plan7Days, questions, company, role, createdAt, companyIntel } = entry

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Analysis results</h2>
          <p className="text-slate-600 text-sm">
            {company || 'Unknown Company'} · {role || 'General Role'} · {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            <Download className="w-4 h-4" /> TXT
          </button>
          <Link
            to="/dashboard/analyze"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            New analysis
          </Link>
        </div>
      </div>

      {/* Company Intel Card */}
      {companyIntel && (
        <Card className="bg-slate-900 text-white border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold">{companyIntel.name || 'Company Profile'}</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-300 mb-4">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {companyIntel.industry}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {companyIntel.size}</span>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">
                    <Target className="w-4 h-4" /> Typical Hiring Focus
                  </h4>
                  <p className="text-sm text-slate-200">
                    {companyIntel.hiringFocus}
                  </p>
                </div>
              </div>
              <div className="md:w-px md:bg-white/20" />
              <div className="md:w-1/4 flex flex-col justify-center text-xs text-slate-500">
                <p className="italic">
                  "Demo Mode: Company intel generated heuristically."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Score & Skills */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Key skills extracted</CardTitle>
              <CardDescription>Click to toggle: <span className="text-green-600 font-medium">I know this</span> vs <span className="text-orange-500 font-medium">Need practice</span></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(extractedSkills).map(([key, skills]) => {
                  if (!Array.isArray(skills) || skills.length === 0) return null
                  const label = DISPLAY_CATEGORIES[key] || key
                  return (
                    <div key={key} className="space-y-2">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        {label}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((s) => {
                          const status = skillConfidence[s] || 'practice'
                          const isKnown = status === 'know'
                          return (
                            <button
                              key={s}
                              onClick={() => toggleSkill(s)}
                              className={`
                                            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                                            ${isKnown
                                  ? 'bg-green-100 text-green-700 border-green-200 border hover:bg-green-200'
                                  : 'bg-orange-50 text-orange-700 border-orange-200 border border-dashed hover:bg-orange-100'
                                }
                                        `}
                            >
                              {isKnown ? <Check className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5" />}
                              {s}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Round Mapping Engine / Timeline */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recruitment Process & Prep</CardTitle>
                <CardDescription>Predicted flow based on {companyIntel?.size || 'company'} patterns</CardDescription>
              </div>
              <button
                onClick={() => handleCopy(roundMapping.map(r => `${r.roundTitle}\nRationale: ${r.whyItMatters}\n${r.focusAreas.join(', ')}`).join('\n\n'))}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Copy rounds"
              >
                <Copy className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent className="relative py-8">
              <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-slate-200" />
              <div className="space-y-10">
                {roundMapping.map((round, idx) => (
                  <div key={idx} className="relative pl-14">
                    {/* Number Circle */}
                    <div className="absolute left-2 top-0 w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center font-bold text-slate-500 z-10 shadow-sm">
                      {idx + 1}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{round.roundTitle.split(':')[1] || round.roundTitle}</h3>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{round.roundTitle.split(':')[0]}</p>

                      <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-100">
                        <p className="text-sm text-slate-600 italic">
                          "{round.whyItMatters}"
                        </p>
                      </div>

                      <ul className="space-y-2">
                        {/* Removed unused isLocked check to clean up build warnings */}
                        {round.focusAreas.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>7-day plan</CardTitle>
                <CardDescription>Adapted to your skills</CardDescription>
              </div>
              <button
                onClick={() => handleCopy(plan7Days.map(d => `Day ${d.day}: ${d.title}\n${d.tasks.map(t => `- ${t}`).join('\n')}`).join('\n\n'))}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Copy plan"
              >
                <Copy className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              {plan7Days.map((day) => (
                <div key={day.day} className="relative pl-4 border-l-2 border-slate-100">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-200" />
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Day {day.day}: {day.title}</h3>
                  <ul className="space-y-1.5">
                    {day.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Readiness & Extras */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-center">Overall Readiness</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
              <ReadinessCircle score={liveScore} />
              <p className="text-xs text-center text-slate-500 mt-4 px-4">
                Update your skills on the left to see this score change in real-time.
              </p>
            </CardContent>
          </Card>

          {/* Action Next */}
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-none shadow-lg">
            <CardContent className="pt-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Action Next
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    {weakSkills.length > 0 ? "Focus on your weak areas:" : "You're all set! Start reviewing."}
                  </p>
                </div>

                {weakSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {weakSkills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white/20 rounded text-xs backdrop-blur-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                <button className="w-full bg-white text-primary font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                  Start Day 1 plan now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Interview Qs</CardTitle>
              <button
                onClick={() => handleCopy(questions.map((q, i) => `${i + 1}. ${q}`).join('\n'))}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Copy questions"
              >
                <Copy className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
                {questions.slice(0, 5).map((q, i) => (
                  <li key={i} className="line-clamp-2">{q}</li>
                ))}
                {questions.length > 5 && (
                  <li className="list-none text-xs text-slate-400 italic pt-1">+{questions.length - 5} more questions...</li>
                )}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
// Helper component import
import { AlertCircle } from 'lucide-react'
