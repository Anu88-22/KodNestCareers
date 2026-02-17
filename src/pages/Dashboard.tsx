import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../components/ui/card'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const READINESS_SCORE = 72
const READINESS_MAX = 100
const circleSize = 120
const strokeWidth = 12
const radius = (circleSize - strokeWidth) / 2
const circumference = 2 * Math.PI * radius
const dashOffset = circumference * (1 - READINESS_SCORE / READINESS_MAX)

const skillData = [
  { subject: 'DSA', value: 75, fullMark: 100 },
  { subject: 'System Design', value: 60, fullMark: 100 },
  { subject: 'Communication', value: 80, fullMark: 100 },
  { subject: 'Resume', value: 85, fullMark: 100 },
  { subject: 'Aptitude', value: 70, fullMark: 100 },
]

const weekDays = [
  { label: 'Mon', active: true },
  { label: 'Tue', active: true },
  { label: 'Wed', active: true },
  { label: 'Thu', active: true },
  { label: 'Fri', active: false },
  { label: 'Sat', active: false },
  { label: 'Sun', active: false },
]

const assessments = [
  { title: 'DSA Mock Test', when: 'Tomorrow, 10:00 AM' },
  { title: 'System Design Review', when: 'Wed, 2:00 PM' },
  { title: 'HR Interview Prep', when: 'Friday, 11:00 AM' },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Dashboard</h2>
        <p className="text-slate-600 text-sm">Your placement readiness at a glance.</p>
      </div>

      <Link
        to="/dashboard/analyze"
        className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-primary/30 hover:shadow transition-colors"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">Track a new job notification</h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Extract skills, generate checklists, and add it to your tracking history.
            </p>
          </div>
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors">
            Track Job
          </span>
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Overall Readiness */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
            <CardDescription>Your current readiness score</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
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
                  stroke="hsl(245, 58%, 51%)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{
                    transition: 'stroke-dashoffset 0.6s ease-in-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">
                  {READINESS_SCORE}
                </span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">
                  Readiness Score
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
            <CardDescription>Scores across key areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="hsl(220 13% 91%)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'hsl(215 16% 47%)', fontSize: 11 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: 'hsl(215 16% 47%)', fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(245, 58%, 51%)"
                    fill="hsl(245, 58%, 51%)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 3. Continue Practice */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-slate-900 mb-2">Dynamic Programming</p>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: '30%' }}
                />
              </div>
              <span className="text-sm text-slate-500 whitespace-nowrap">3/10 completed</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link
              to="/dashboard/practice"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors"
            >
              Continue
            </Link>
          </CardFooter>
        </Card>

        {/* 4. Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
            <CardDescription>This week&apos;s progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-1">
                Problems Solved: 12/20 this week
              </p>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              {weekDays.map((day) => (
                <div
                  key={day.label}
                  className="flex flex-col items-center gap-1.5"
                  title={day.active ? 'Activity' : 'No activity'}
                >
                  <div
                    className={`w-9 h-9 rounded-full border-2 shrink-0 ${day.active
                        ? 'bg-primary border-primary'
                        : 'bg-white border-slate-200'
                      }`}
                  />
                  <span className="text-xs text-slate-500">{day.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Upcoming Assessments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Assessments</CardTitle>
          <CardDescription>Scheduled tests and reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-slate-200">
            {assessments.map((item) => (
              <li
                key={item.title}
                className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
              >
                <span className="font-medium text-slate-900">{item.title}</span>
                <span className="text-sm text-slate-500">{item.when}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
