import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { User, Mail, Shield, Settings, Bell, LogOut, CheckCircle2, Loader2, Camera, MapPin } from 'lucide-react'
import { useState } from 'react'

export function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('Anu')
  const [role, setRole] = useState('Full Stack Developer aspirant')

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-slate-200">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-white shadow-2xl relative overflow-hidden group/avatar">
              <User className="w-16 h-16 group-hover/avatar:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-lg border border-slate-100">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
          </div>

          <div className="text-center md:text-left flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold border border-green-200 uppercase tracking-wider">Active Learner</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold border border-blue-200 uppercase tracking-wider">Pro Member</span>
              </div>
            </div>
            <p className="text-slate-500 text-lg font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
              {role}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Bangalore, IN
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-500" /> 1,240 pts
              </div>
            </div>
          </div>

          <div className="flex md:flex-col gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm border ${isEditing ? 'bg-white text-slate-400 border-slate-200' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className={`md:col-span-2 shadow-sm border-slate-100 transition-all ${isEditing ? 'ring-2 ring-primary/20 bg-primary/5 border-primary/20' : ''}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              Information Details
            </CardTitle>
            <CardDescription>Manage your primary contact and career information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                {isEditing ? (
                  <input
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-slate-700 font-bold text-lg bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {name}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Professional Role</label>
                {isEditing ? (
                  <input
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-slate-400 font-medium p-3 rounded-xl">
                    {role}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                <div className="flex items-center gap-3 text-slate-700 font-medium p-3 bg-slate-50/50 rounded-xl border border-dotted border-slate-200 opacity-60">
                  <Mail className="w-4 h-4 text-slate-300" />
                  anu@example.com
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Plan</label>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 text-blue-700 font-bold">
                    <Shield className="w-4 h-4" /> Premium
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-8 flex justify-end gap-4 border-t border-slate-100">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-sm border-slate-100 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-slate-700 font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Bell className="w-4 h-4" />
                    </div>
                    Notifications
                  </div>
                  <Settings className="w-4 h-4 text-slate-200" />
                </button>
                <button className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-slate-700 font-bold group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Shield className="w-4 h-4" />
                    </div>
                    Security & Privacy
                  </div>
                  <Settings className="w-4 h-4 text-slate-200" />
                </button>
                <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors text-red-500 font-extrabold group/logout">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-300 group-hover/logout:bg-red-500 group-hover/logout:text-white transition-colors">
                      <LogOut className="w-4 h-4" />
                    </div>
                    Account Sign Out
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 bg-slate-900 rounded-3xl text-center text-white relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="font-bold text-xl mb-1">KodNest Pro</h4>
              <p className="text-xs text-slate-400 mb-6">Unlimited path access active until Dec 2026</p>
              <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Manage Billing</button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

const Trophy = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)
