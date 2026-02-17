import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { ClipboardCheck, ArrowRight, Star, Clock, Laptop, Loader2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const MOCK_ASSESSMENTS = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    description: 'Master arrays, linked lists, and trees with our comprehensive DSA mock test.',
    duration: '45 mins',
    questions: 20,
    difficulty: 'Medium',
    icon: Laptop,
    category: 'Core Technical'
  },
  {
    id: 2,
    title: 'Full Stack Development',
    description: 'Test your knowledge of React, Node.js, and database management.',
    duration: '60 mins',
    questions: 25,
    difficulty: 'Hard',
    icon: Laptop,
    category: 'Development'
  },
  {
    id: 3,
    title: 'Aptitude & Logical Reasoning',
    description: 'Improve your problem-solving speed for top product companies.',
    duration: '30 mins',
    questions: 15,
    difficulty: 'Easy',
    icon: Star,
    category: 'General'
  },
  {
    id: 4,
    title: 'System Design Basics',
    description: 'Analyze scalability, load balancing, and microservices architecture.',
    duration: '40 mins',
    questions: 10,
    difficulty: 'Hard',
    icon: ClipboardCheck,
    category: 'Architecture'
  }
]

export function Assessments() {
  const [activeTest, setActiveTest] = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'starting' | 'running'>('idle')

  const startTest = (id: number) => {
    setActiveTest(id)
    setStatus('starting')
    setTimeout(() => {
      setStatus('running')
    }, 1500)
  }

  if (status === 'running' && activeTest) {
    const test = MOCK_ASSESSMENTS.find(t => t.id === activeTest)
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{test?.title}</h2>
              <p className="text-slate-400">Environment initialized. Good luck, Anu!</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-center">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Time Left</div>
                <div className="text-xl font-mono tabular-nums">{test?.duration}</div>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-bold transition-all shadow-lg"
              >
                Exit Test
              </button>
            </div>
          </div>
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] -ml-32 -mb-32" />
        </div>

        <Card className="border-slate-200">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Laptop className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Secure Browser Active</h3>
              <p className="text-slate-500 max-w-md">Mock test logic is simulated. In a real environment, the questions would load here with proctoring enabled.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Assessments</h2>
          <p className="text-lg text-slate-600">Challenge yourself with curated mock tests and track your progress.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-sm font-bold text-slate-900">All Tests</button>
          <button className="px-4 py-1.5 text-slate-500 text-sm font-medium hover:text-slate-900 transition-colors">History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_ASSESSMENTS.map((test) => (
          <Card key={test.id} className="group hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
            <CardHeader className="border-b border-slate-50 bg-slate-50/50">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                  <test.icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${test.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  test.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  {test.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{test.category}</span>
                <CardTitle className="text-xl mt-1">{test.title}</CardTitle>
                <CardDescription className="mt-2 leading-relaxed h-12 line-clamp-2">{test.description}</CardDescription>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {test.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4" />
                  {test.questions} Questions
                </div>
              </div>

              <button
                onClick={() => startTest(test.id)}
                disabled={status !== 'idle'}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all group-hover:shadow-lg"
              >
                {status === 'starting' && activeTest === test.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Starting...
                  </>
                ) : (
                  <>Start Assessment <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </CardContent>

            {/* Success Overlay Preview */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg scale-0 group-hover:scale-100 transition-transform delay-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
