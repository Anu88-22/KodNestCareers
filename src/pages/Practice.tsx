import { Card, CardContent, CardTitle, CardDescription } from '../components/ui/card'
import { Code2, Brain, Layout, ArrowRight, CheckCircle2, Trophy, Clock, Search } from 'lucide-react'
import { useState } from 'react'

const PRACTICE_CATEGORIES = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamentals of problem solving.',
    icon: Code2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    stats: '120+ Problems',
    progress: 35
  },
  {
    id: 'aptitude',
    title: 'Aptitude & Reasoning',
    description: 'Sharpen your logical and quantitative skills.',
    icon: Brain,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    stats: '80+ Tests',
    progress: 15
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Learn to build scalable and robust systems.',
    icon: Layout,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    stats: '25 Case Studies',
    progress: 0
  }
]

const RECENT_PROBLEMS = [
  { title: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '2 days ago' },
  { title: 'Longest Palindromic Substring', difficulty: 'Medium', status: 'Attempted', time: '1 week ago' },
  { title: 'Merge K Sorted Lists', difficulty: 'Hard', status: 'Solved', time: '3 weeks ago' }
]

export function Practice() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Practice</h2>
          <p className="text-lg text-slate-600">Solve challenges, track progress, and level up your skills.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white border-none">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,240</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Points Earned</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">42</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Problems Solved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">12h</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Time Spent</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Filtered Content Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRACTICE_CATEGORIES.map((cat) => (
              <Card key={cat.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="mb-2">{cat.title}</CardTitle>
                  <CardDescription className="mb-4">{cat.description}</CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-400 uppercase tracking-tighter">{cat.stats}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000"
                      style={{ width: `${cat.progress}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {RECENT_PROBLEMS.map((prob, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 truncate">{prob.title}</div>
                      <div className="text-xs text-slate-500">{prob.time}</div>
                    </div>
                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      prob.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                      {prob.difficulty}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
