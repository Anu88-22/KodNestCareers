import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { getHistory } from '../lib/history'

export function History() {
  const entries = getHistory()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">History</h2>
        <p className="text-slate-600 text-sm">Past JD analyses. Click one to view full results.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved analyses</CardTitle>
          <CardDescription>Stored in this browser (localStorage). Persists after refresh.</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-slate-600 py-4">
              No analyses yet. Run an analysis from the Analyze page.
            </p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {entries.map((e) => (
                <li key={e.id}>
                  <Link
                    to={`/dashboard/results?id=${e.id}`}
                    className="block py-3 first:pt-0 last:pb-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-slate-900">{e.company}</span>
                        <span className="text-slate-500 mx-2">·</span>
                        <span className="text-slate-700">{e.role}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-500">
                          {new Date(e.createdAt).toLocaleDateString()}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-primary-light text-primary">
                          Score: {e.baseScore}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div>
        <Link
          to="/dashboard/analyze"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-hover transition-colors"
        >
          New analysis
        </Link>
      </div>
    </div>
  )
}
