import React, { useState } from 'react'
import {
    Plus,
    Trash2,
    Copy,
    CheckCircle,
    FileText,
    Wand2,
    Globe,
    Github,
    Lightbulb,
    X,
    ChevronDown,
    ChevronUp,
    Palette,
    Printer
} from 'lucide-react'
import { useResume } from '../../context/ResumeContext'
import type { TemplateType } from '../../context/ResumeContext'

// --- Helpers ---

const checkBullet = (text: string) => {
    if (!text) return null
    const actionVerbs = ['Spearheaded', 'Developed', 'Managed', 'Optimized', 'Designed', 'Increased', 'Reduced', 'Led', 'Created']
    const hasVerb = actionVerbs.some(v => text.toLowerCase().includes(v.toLowerCase()))
    const hasNumber = /\d+/.test(text)

    if (!hasVerb) return "Start with an action verb (e.g., 'Spearheaded')"
    if (!hasNumber) return "Add a measurable number (e.g., 'increased revenue by 20%')"
    return null
}

function TagInput({ value, onChange, placeholder }: { value: string[], onChange: (tags: string[]) => void, placeholder: string }) {
    const [input, setInput] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault()
            if (!value.includes(input.trim())) {
                onChange([...value, input.trim()])
            }
            setInput('')
        }
    }

    const removeTag = (tag: string) => {
        onChange(value.filter(t => t !== tag))
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 bg-white border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                {value.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-blue-900"><X className="w-3 h-3" /></button>
                    </span>
                ))}
                <input
                    className="flex-1 outline-none text-sm min-w-[120px]"
                    placeholder={value.length === 0 ? placeholder : ''}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}

function SkillsSection() {
    const { resumeData, updateResumeData } = useResume()
    const [isSuggesting, setIsSuggesting] = useState(false)

    const updateSkill = (idx: number, items: string[]) => {
        const newSkills = [...resumeData.skills]
        newSkills[idx] = { ...newSkills[idx], items }
        updateResumeData({ skills: newSkills })
    }

    const suggestSkills = () => {
        setIsSuggesting(true)
        setTimeout(() => {
            updateResumeData({
                skills: [
                    { category: 'Technical Skills', items: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'] },
                    { category: 'Soft Skills', items: ['Leadership', 'Problem Solving', 'Public Speaking', 'Agile'] },
                    { category: 'Tools', items: ['Figma', 'Git', 'Jira', 'VS Code'] }
                ]
            })
            setIsSuggesting(false)
        }, 800)
    }

    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-slate-900">Skills & Expertise</h3>
                <button
                    onClick={suggestSkills}
                    disabled={isSuggesting}
                    className="text-[10px] uppercase font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 flex items-center gap-1"
                >
                    {isSuggesting ? 'Thinking...' : '✨ Suggest Skills'}
                </button>
            </div>
            <div className="space-y-6">
                {resumeData.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">{skill.category}</label>
                            <span className="text-[10px] font-bold text-slate-400">{skill.items.length} SKILLS</span>
                        </div>
                        <TagInput
                            value={skill.items}
                            onChange={(tags) => updateSkill(idx, tags)}
                            placeholder={`Add ${skill.category.toLowerCase()}...`}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

function ProjectsSection() {
    const { resumeData, updateResumeData } = useResume()
    const [openId, setOpenId] = useState<string | null>(null)

    const addProject = () => {
        const id = crypto.randomUUID()
        updateResumeData({
            projects: [...resumeData.projects, { id, name: 'New Project', techStack: [], description: '' }]
        })
        setOpenId(id)
    }

    const updateProject = (idx: number, field: string, value: any) => {
        const newProj = [...resumeData.projects]
        newProj[idx] = { ...newProj[idx], [field]: value }
        updateResumeData({ projects: newProj })
    }

    const deleteProject = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        updateResumeData({ projects: resumeData.projects.filter(p => p.id !== id) })
    }

    return (
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-bold text-slate-900">Key Projects</h3>
                <button onClick={addProject} className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"><Plus className="w-4 h-4" /></button>
            </div>

            <div className="space-y-4">
                {resumeData.projects.map((proj, idx) => {
                    const isOpen = openId === proj.id
                    const guidance = checkBullet(proj.description)

                    return (
                        <div key={proj.id} className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all shadow-sm">
                            {/* Header */}
                            <div
                                onClick={() => setOpenId(isOpen ? null : proj.id)}
                                className="flex items-center justify-between p-4 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="font-bold text-sm text-slate-800">{proj.name || 'Untitled Project'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={(e) => deleteProject(proj.id, e)} className="text-slate-300 hover:text-red-500 p-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                                </div>
                            </div>

                            {/* Body */}
                            {isOpen && (
                                <div className="p-5 space-y-5 animate-in slide-in-from-top-2 duration-200 border-t border-slate-100">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Project Name</label>
                                        <input
                                            className="w-full p-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                                            value={proj.name}
                                            onChange={(e) => updateProject(idx, 'name', e.target.value)}
                                            placeholder="e.g. Portfolio v2.0"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Tech Stack</label>
                                        <TagInput
                                            value={Array.isArray(proj.techStack) ? proj.techStack : []}
                                            onChange={(tags) => updateProject(idx, 'techStack', tags)}
                                            placeholder="React, Node.js..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Live URL</label>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                                <input
                                                    className="w-full pl-10 p-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white transition-all"
                                                    value={proj.liveUrl || ''}
                                                    onChange={(e) => updateProject(idx, 'liveUrl', e.target.value)}
                                                    placeholder="example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">GitHub URL</label>
                                            <div className="relative">
                                                <Github className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                                <input
                                                    className="w-full pl-10 p-2.5 bg-slate-50 border rounded-xl text-sm focus:bg-white transition-all"
                                                    value={proj.githubUrl || ''}
                                                    onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)}
                                                    placeholder="github.com/..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mt-2 relative">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Project Impact</label>
                                        <textarea
                                            className="w-full p-3 bg-slate-50 border rounded-xl text-sm h-28 leading-relaxed focus:bg-white transition-all"
                                            value={proj.description}
                                            maxLength={200}
                                            onChange={(e) => updateProject(idx, 'description', e.target.value)}
                                            placeholder="What did you build? What was the outcome?"
                                        />
                                        <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none">
                                            <span className={`text-[10px] font-bold ${proj.description.length >= 200 ? 'text-red-500' : 'text-slate-400'}`}>
                                                {proj.description.length}/200
                                            </span>
                                        </div>
                                    </div>
                                    {guidance && (
                                        <div className="text-xs text-orange-600 bg-orange-50 p-3 rounded-xl flex items-center gap-3 border border-orange-100 italic">
                                            <Lightbulb className="w-4 h-4" />
                                            {guidance}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

// --- Customization Tools ---

const COLORS = [
    { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
    { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
    { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
    { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
    { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
]

function ColorPicker() {
    const { selectedColor, setColor } = useResume()

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accent Color</span>
            <div className="flex gap-3">
                {COLORS.map(c => (
                    <button
                        key={c.name}
                        onClick={() => setColor(c.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.value ? 'border-slate-900 scale-110 shadow-md' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                    />
                ))}
            </div>
        </div>
    )
}

function TemplatePicker() {
    const { selectedTemplate, setTemplate } = useResume()

    const templates: { id: TemplateType, name: string, description: string }[] = [
        { id: 'classic', name: 'Classic', description: 'Serif, Traditional' },
        { id: 'modern', name: 'Modern', description: 'Two-column Sidebar' },
        { id: 'minimal', name: 'Minimal', description: 'Clean, Sans-serif' }
    ]

    return (
        <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Choose Template</span>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {templates.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        className={`relative min-w-[120px] aspect-[1/1.4] bg-white border-2 rounded-lg p-2 flex flex-col items-center justify-center gap-2 transition-all group overflow-hidden ${selectedTemplate === t.id ? 'border-blue-600 ring-2 ring-blue-100 shadow-lg' : 'border-slate-200 hover:border-slate-400'}`}
                    >
                        {/* Mockup Sketch */}
                        <div className="w-full flex-1 bg-slate-50 rounded border border-slate-100 p-1.5 space-y-1">
                            {t.id === 'modern' ? (
                                <div className="flex gap-1 h-full">
                                    <div className="w-1/3 bg-slate-200 rounded-sm"></div>
                                    <div className="w-2/3 space-y-1">
                                        <div className="h-1 bg-slate-300 w-3/4"></div>
                                        <div className="h-1 bg-slate-200 w-full"></div>
                                        <div className="h-1 bg-slate-200 w-full"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="h-1 bg-slate-300 w-1/2 mx-auto"></div>
                                    <div className="h-0.5 bg-slate-200 w-full"></div>
                                    <div className="h-1 bg-slate-200 w-full"></div>
                                    <div className="h-1 bg-slate-200 w-5/6"></div>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{t.name}</span>
                        {selectedTemplate === t.id && (
                            <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                                <CheckCircle className="w-3 h-3" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

function CircularScoreMeter({ score }: { score: number }) {
    const radius = 36
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    let color = '#ef4444' // Red
    let status = 'Needs Work'
    if (score > 40) { color = '#f59e0b'; status = 'Getting There' }
    if (score > 70) { color = '#22c55e'; status = 'Strong Resume' }

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900 leading-none">{score}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Score</span>
                </div>
            </div>
            <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full`} style={{ backgroundColor: `${color}15`, color: color }}>
                {status}
            </div>
        </div>
    )
}

// --- Main Components ---

export function ResumeDocument({ data, template = 'modern', accentColor }: { data: any, template: TemplateType, accentColor?: string }) {
    const { selectedColor } = useResume()
    const color = accentColor || selectedColor

    if (!data) return null

    // Base Typography & Spacing
    const fontClass = template === 'classic' ? 'font-serif' : 'font-sans'
    const sectionTitleClasses = `text-sm font-bold uppercase tracking-wider mb-2 border-b pb-1`

    const renderSections = (isSidebar: boolean = false) => {
        return (
            <>
                {/* Skills */}
                {data.skills.length > 0 && (
                    <div className="mb-6">
                        <h3 className={sectionTitleClasses} style={{ color: isSidebar ? 'white' : color, borderColor: isSidebar ? 'rgba(255,255,255,0.3)' : `${color}40` }}>Skills</h3>
                        <div className="space-y-2">
                            {data.skills.map((skill: any, idx: number) => (
                                <div key={idx} className="break-inside-avoid">
                                    <div className={`text-[10px] font-bold ${isSidebar ? 'opacity-60' : 'text-slate-500'} uppercase`}>{skill.category}</div>
                                    <div className={`text-xs ${isSidebar ? 'text-white' : 'text-slate-700'} font-medium`}>
                                        {Array.isArray(skill.items) ? skill.items.join(', ') : skill.items}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <div className="mb-6">
                        <h3 className={sectionTitleClasses} style={{ color: isSidebar ? 'white' : color, borderColor: isSidebar ? 'rgba(255,255,255,0.3)' : `${color}40` }}>Education</h3>
                        <div className="space-y-3">
                            {data.education.map((edu: any) => (
                                <div key={edu.id} className="break-inside-avoid">
                                    <div className={`font-bold ${isSidebar ? 'text-white' : 'text-slate-900'}`}>{edu.school}</div>
                                    <div className={`flex justify-between text-xs ${isSidebar ? 'opacity-80' : 'text-slate-600'}`}>
                                        <span>{edu.degree}</span>
                                        <span>{edu.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        )
    }

    const renderMainContent = () => {
        return (
            <>
                {/* Summary */}
                {data.summary && (
                    <div className="mb-6">
                        <h3 className={sectionTitleClasses} style={{ color, borderColor: `${color}40` }}>Professional Summary</h3>
                        <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <div className="mb-6">
                        <h3 className={sectionTitleClasses} style={{ color, borderColor: `${color}40` }}>Experience</h3>
                        <div className="space-y-5">
                            {data.experience.map((exp: any) => (
                                <div key={exp.id} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-bold text-slate-900 text-sm">{exp.role}</h4>
                                        <span className="text-xs text-slate-500">{exp.duration}</span>
                                    </div>
                                    <div className="text-xs font-semibold" style={{ color }}>{exp.company}</div>
                                    <p className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <div className="mb-6">
                        <h3 className={sectionTitleClasses} style={{ color, borderColor: `${color}40` }}>Projects</h3>
                        <div className="space-y-4">
                            {data.projects.map((proj: any) => (
                                <div key={proj.id} className="break-inside-avoid">
                                    <div className="flex justify-between items-baseline">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                                            <div className="flex gap-1.5">
                                                {proj.liveUrl && <Globe className="w-3 h-3 text-slate-400" />}
                                                {proj.githubUrl && <Github className="w-3 h-3 text-slate-400" />}
                                            </div>
                                        </div>
                                        {proj.techStack && proj.techStack.length > 0 && (
                                            <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.5 bg-slate-50 rounded border border-slate-100">
                                                {Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        )
    }

    const renderHeader = () => {
        return (
            <div className={`mb-8 ${template === 'classic' ? 'text-center' : ''}`}>
                <h1 className={`font-bold tracking-tight text-slate-900 ${template === 'classic' ? 'text-4xl uppercase' : 'text-3xl'}`} style={{ color: template === 'classic' ? color : undefined }}>
                    {data.personal.fullName || 'YOUR NAME'}
                </h1>
                <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600 font-medium ${template === 'classic' ? 'justify-center border-t border-b py-2 border-slate-200 mt-4' : ''}`}>
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.location && <span>{data.personal.location}</span>}
                    {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
                    {data.personal.github && <span>{data.personal.github}</span>}
                </div>
            </div>
        )
    }

    return (
        <div
            className={`w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl mx-auto ${fontClass}`}
            id="resume-preview"
        >
            {template === 'modern' ? (
                <div className="flex min-h-[297mm]">
                    {/* Sidebar */}
                    <div className="w-[75mm] flex-shrink-0" style={{ backgroundColor: color }}>
                        <div className="p-8 text-white">
                            <h1 className="text-2xl font-bold leading-tight mb-2 uppercase tracking-tighter">
                                {data.personal.fullName?.split(' ')[0]} <br />
                                {data.personal.fullName?.split(' ').slice(1).join(' ')}
                            </h1>
                            <div className="space-y-4 mt-8 opacity-90">
                                <div className="space-y-1">
                                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Contact</div>
                                    <div className="text-[11px] leading-relaxed break-all">
                                        {data.personal.email} <br />
                                        {data.personal.phone} <br />
                                        {data.personal.location}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Socials</div>
                                    <div className="text-[11px] leading-relaxed break-all">
                                        {data.personal.linkedin} <br />
                                        {data.personal.github}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 pt-10 border-t border-white/20">
                                {renderSections(true)}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-10 bg-white">
                        {renderMainContent()}
                    </div>
                </div>
            ) : (
                <div className={`p-[15mm] ${template === 'minimal' ? 'space-y-10' : ''}`}>
                    {renderHeader()}
                    <div className="space-y-8">
                        {renderMainContent()}
                        {renderSections(false)}
                    </div>
                </div>
            )}
        </div>
    )
}

export function ResumeBuilder() {
    const { resumeData, updateResumeData, selectedTemplate, selectedColor } = useResume()
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
    const [showToast, setShowToast] = useState(false)

    // Sync form data to context
    const handlePersonalChange = (field: string, value: string) => {
        updateResumeData({ personal: { ...resumeData.personal, [field]: value } })
    }

    const addExperience = () => {
        updateResumeData({
            experience: [...resumeData.experience, { id: crypto.randomUUID(), role: '', company: '', duration: '', description: '' }]
        })
    }

    const addEducation = () => {
        updateResumeData({
            education: [...resumeData.education, { id: crypto.randomUUID(), school: '', degree: '', year: '' }]
        })
    }

    const loadSampleData = () => {
        updateResumeData({
            personal: { fullName: 'Alex Rivera', email: 'alex.rivera@example.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', linkedin: 'linkedin.com/in/alexrivera', github: 'github.com/arivera' },
            summary: 'Ambitious Software Engineer with 5+ years of experience in building scalable web applications. Proficient in React, Node.js, and Cloud Architecture (AWS). Proven track record of reducing latency by 40% and leading cross-functional teams of 10+ engineers.',
            experience: [
                { id: '1', company: 'TechNova Solutions', role: 'Senior Frontend Engineer', duration: '2021 - Present', description: '• Spearheaded the migration from monolithic architecture to micro-frontends, improving deployment frequency by 60%.\n• Optimized React rendering cycles, resulting in a 25% improvement in Core Web Vitals across the platform.\n• Mentored a team of 4 junior developers, increasing their productivity by 30% through regular code reviews.' },
                { id: '2', company: 'CloudScale Inc.', role: 'Full Stack Developer', duration: '2018 - 2021', description: '• Developed and maintained RESTful APIs using Node.js and PostgreSQL, handling 2M+ requests daily.\n• Automated CI/CD pipelines using GitHub Actions, reducing manual deployment errors by 90%.\n• Designed and implemented a real-time collaborative editor using WebSockets and Redis.' }
            ],
            projects: [
                { id: 'p1', name: 'OpenStream Analytics', description: 'A real-time data visualization platform for streaming services, processing over 100k events per second.', techStack: ['React', 'D3.js', 'Redis', 'Node.js'], liveUrl: 'openstream-demo.com' },
                { id: 'p2', name: 'EcoTrack Mobile', description: 'Sustainability tracking app that calculates carbon footprint based on daily consumer habits.', techStack: ['React Native', 'Firebase', 'Google Maps API'] }
            ],
            skills: [
                { category: 'Technical Skills', items: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'] },
                { category: 'Soft Skills', items: ['Team Leadership', 'Agile Methodology', 'Effective Communication', 'Problem Solving'] }
            ],
            education: [
                { id: 'e1', school: 'Stanford University', degree: 'B.S. in Computer Science', year: '2018' }
            ]
        })
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header / Tabs */}
            <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm backdrop-blur-md bg-white/90 font-sans">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 tracking-tight">AI Resume Builder</h1>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Premium Career Tool v1.0</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {['editor', 'preview'].map(t => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t as any)}
                            className={`px-6 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize ${activeTab === t ? 'bg-white text-blue-600 shadow-md ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <button
                    onClick={loadSampleData}
                    className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-lg hover:bg-blue-100 flex items-center gap-2 transition-all active:scale-95"
                >
                    <Wand2 className="w-4 h-4" />
                    Load Sample Data
                </button>
            </header>

            <div className="max-w-[1600px] mx-auto px-8 py-8 flex gap-8 h-[calc(100vh-100px)]">
                {/* LEFT: Editor */}
                <div className={`flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>

                    {/* Design Customization */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-indigo-500" />
                                Customization
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <TemplatePicker />
                            <ColorPicker />
                        </div>
                    </div>

                    {/* Personal Info */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                        <h3 className="font-bold text-slate-900 border-b pb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Full Name</label>
                                <input placeholder="John Doe" className="w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-sans" value={resumeData.personal.fullName} onChange={e => handlePersonalChange('fullName', e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Email Address</label>
                                <input placeholder="john@example.com" className="w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-sans" value={resumeData.personal.email} onChange={e => handlePersonalChange('email', e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Phone Number</label>
                                <input placeholder="+1 (555) 000-0000" className="w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-sans" value={resumeData.personal.phone} onChange={e => handlePersonalChange('phone', e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Location</label>
                                <input placeholder="New York, NY" className="w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-sans" value={resumeData.personal.location} onChange={e => handlePersonalChange('location', e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">LinkedIn URL</label>
                                <input placeholder="linkedin.com/in/johndoe" className="w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-sans" value={resumeData.personal.linkedin} onChange={e => handlePersonalChange('linkedin', e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">GitHub URL</label>
                                <input placeholder="github.com/johndoe" className="w-full p-2.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm font-sans" value={resumeData.personal.github} onChange={e => handlePersonalChange('github', e.target.value)} />
                            </div>
                        </div>
                    </section>

                    {/* Summary */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="flex justify-between items-baseline border-b pb-4">
                            <h3 className="font-bold text-slate-900">Professional Summary</h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${resumeData.summary.split(/\s+/).length >= 40 ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                                {resumeData.summary.split(/\s+/).filter(w => w).length} WORDS
                            </span>
                        </div>
                        <textarea
                            placeholder="Write a powerful snapshot of your career (4-5 impactful lines)..."
                            className="w-full p-4 bg-slate-50 border rounded-2xl h-32 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm leading-relaxed font-sans"
                            value={resumeData.summary}
                            onChange={e => updateResumeData({ summary: e.target.value })}
                        />
                    </section>

                    {/* Experience, Projects, Skills, Education */}
                    <div className="space-y-8 pb-10">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h3 className="font-bold text-slate-900">Professional Experience</h3>
                                <button onClick={addExperience} className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                            </div>
                            <div className="space-y-6">
                                {resumeData.experience.map((exp, idx) => {
                                    const guidance = checkBullet(exp.description)
                                    return (
                                        <div key={exp.id} className="relative group p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white transition-all">
                                            <button onClick={() => {
                                                const newExp = resumeData.experience.filter((_, i) => i !== idx)
                                                updateResumeData({ experience: newExp })
                                            }} className="absolute -top-2 -right-2 bg-white text-slate-300 hover:text-red-500 p-1.5 rounded-full shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Company</label>
                                                    <input className="w-full p-2 bg-white border rounded-xl text-sm font-bold font-sans" value={exp.company} onChange={(e) => {
                                                        const newExp = [...resumeData.experience]; newExp[idx].company = e.target.value; updateResumeData({ experience: newExp });
                                                    }} placeholder="e.g. Google" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Duration</label>
                                                    <input className="w-full p-2 bg-white border rounded-xl text-sm font-sans" value={exp.duration} onChange={(e) => {
                                                        const newExp = [...resumeData.experience]; newExp[idx].duration = e.target.value; updateResumeData({ experience: newExp });
                                                    }} placeholder="e.g. 2021 - Present" />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Job Role</label>
                                                    <input className="w-full p-2 bg-white border rounded-xl text-sm font-medium font-sans" value={exp.role} onChange={(e) => {
                                                        const newExp = [...resumeData.experience]; newExp[idx].role = e.target.value; updateResumeData({ experience: newExp });
                                                    }} placeholder="e.g. Senior Product Designer" />
                                                </div>
                                                <div className="space-y-1 relative">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Impact & Achievements</label>
                                                    <textarea className="w-full p-3 bg-white border rounded-xl text-sm h-32 leading-relaxed font-sans" value={exp.description} onChange={(e) => {
                                                        const newExp = [...resumeData.experience]; newExp[idx].description = e.target.value; updateResumeData({ experience: newExp });
                                                    }} placeholder="Use bullet points. Start with Action Verbs. Quantify results!" />
                                                    {guidance && (
                                                        <div className="mt-2 bg-blue-50 text-blue-600 text-[10px] p-2 rounded-lg border border-blue-100 flex items-center gap-2 font-medium">
                                                            <Lightbulb className="w-3.5 h-3.5" />
                                                            {guidance}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>

                        <ProjectsSection />
                        <SkillsSection />

                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h3 className="font-bold text-slate-900">Academic Background</h3>
                                <button onClick={addEducation} className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"><Plus className="w-4 h-4" /></button>
                            </div>
                            <div className="space-y-4">
                                {resumeData.education.map((edu, idx) => (
                                    <div key={edu.id} className="relative group p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white transition-all">
                                        <button onClick={() => {
                                            const newEdu = resumeData.education.filter((_, i) => i !== idx)
                                            updateResumeData({ education: newEdu })
                                        }} className="absolute -top-2 -right-2 bg-white text-slate-300 hover:text-red-500 p-1.5 rounded-full shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">University / School</label>
                                                <input className="w-full p-2 bg-white border rounded-xl text-sm font-bold font-sans" value={edu.school} onChange={(e) => {
                                                    const newEdu = [...resumeData.education]; newEdu[idx].school = e.target.value; updateResumeData({ education: newEdu });
                                                }} placeholder="Stanford University" />
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-1 space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Degree</label>
                                                    <input className="flex-1 w-full p-2 bg-white border rounded-xl text-sm font-sans" value={edu.degree} onChange={(e) => {
                                                        const newEdu = [...resumeData.education]; newEdu[idx].degree = e.target.value; updateResumeData({ education: newEdu });
                                                    }} placeholder="B.S. Computer Science" />
                                                </div>
                                                <div className="w-24 space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Year</label>
                                                    <input className="w-full p-2 bg-white border rounded-xl text-sm font-sans" value={edu.year} onChange={(e) => {
                                                        const newEdu = [...resumeData.education]; newEdu[idx].year = e.target.value; updateResumeData({ education: newEdu });
                                                    }} placeholder="2022" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* RIGHT: Live Preview (Enhanced) */}
                <div className="hidden lg:block w-[450px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-6 ring-8 ring-slate-800/50">
                    <div className="h-full overflow-y-auto px-4 py-8 custom-scrollbar-dark bg-white rounded-2xl relative">
                        <div className="scale-[0.5] origin-top transform-gpu">
                            <ResumeDocument data={resumeData} template={selectedTemplate} accentColor={selectedColor} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Resume Preview Overlay (Mobile Friendly) */}
            {activeTab === 'preview' && (
                <div className="fixed inset-0 z-50 bg-slate-50 overflow-y-auto lg:hidden">
                    <div className="p-4 flex justify-end">
                        <button onClick={() => setActiveTab('editor')} className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold">Close Preview</button>
                    </div>
                    <ResumePreview showToast={showToast} setShowToast={setShowToast} />
                </div>
            )}
        </div>
    )
}

export function ResumePreview({ showToast: externalShowToast, setShowToast: externalSetShowToast }: { showToast?: boolean, setShowToast?: (v: boolean) => void }) {
    const [localShowToast, setLocalShowToast] = useState(false)
    const showToast = externalShowToast ?? localShowToast
    const setShowToast = externalSetShowToast ?? setLocalShowToast

    const { resumeData, selectedTemplate, selectedColor, atsScore } = useResume()
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle')

    const handlePrint = () => {
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        window.print()
    }

    const generatePlainText = () => {
        const d = resumeData
        let text = `${d.personal.fullName}\n${d.personal.email} | ${d.personal.phone} | ${d.personal.location}\n`
        if (d.personal.linkedin) text += `${d.personal.linkedin}\n`
        if (d.personal.github) text += `${d.personal.github}\n`

        text += `\nSUMMARY\n${d.summary}\n`

        if (d.experience.length > 0) {
            text += `\nEXPERIENCE\n`
            d.experience.forEach(exp => {
                text += `${exp.role} at ${exp.company} (${exp.duration})\n${exp.description}\n\n`
            })
        }

        if (d.projects.length > 0) {
            text += `\nPROJECTS\n`
            d.projects.forEach(proj => {
                text += `${proj.name} (${proj.techStack})\n${proj.description}\n\n`
            })
        }

        if (d.skills.length > 0) {
            text += `\nSKILLS\n`
            d.skills.forEach(cat => {
                text += `${cat.category}: ${cat.items.join(', ')}\n`
            })
        }

        if (d.education.length > 0) {
            text += `\nEDUCATION\n`
            d.education.forEach(edu => {
                text += `${edu.degree}, ${edu.school} (${edu.year})\n`
            })
        }

        return text
    }

    const handleCopy = () => {
        const text = generatePlainText()
        navigator.clipboard.writeText(text)
        setCopyStatus('copied')
        setTimeout(() => setCopyStatus('idle'), 2000)
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center gap-6 overflow-auto print:p-0 print:bg-white print:overflow-visible font-sans">

            {/* Print Styles Injection */}
            <style>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white; }
                    #resume-actions, #resume-warning, header, nav { display: none !important; }
                    #resume-preview { 
                        box-shadow: none !important; 
                        margin: 0 !important; 
                        width: 100% !important;
                        max-width: none !important;
                        min-height: auto !important;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    /* Hide scrollbars in print */
                    ::-webkit-scrollbar { display: none; }
                    
                    /* Page Breaks */
                    .break-inside-avoid {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }
                }
            `}</style>

            {/* ATS Score & Improvements */}
            <div className="w-full max-w-[210mm] grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                    <CircularScoreMeter score={atsScore.score} />
                </div>
                <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        Top Improvements
                    </h3>
                    <div className="space-y-3">
                        {atsScore.improvements.length > 0 ? (
                            atsScore.improvements.map((imp, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{imp}</span>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100 text-green-700">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-bold">Your resume is looking great! High ATS compatibility.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div id="resume-actions" className="w-full max-w-[210mm] flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <h2 className="font-bold text-slate-700 text-lg">Results Preview</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                    >
                        {copyStatus === 'copied' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copyStatus === 'copied' ? 'Copied' : 'Copy Text'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-md transition-all hover:shadow-lg"
                    >
                        <Printer className="w-4 h-4" />
                        Print / Save PDF
                    </button>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
                    <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">PDF export ready! Check your downloads.</span>
                    </div>
                </div>
            )}

            {/* Resume Document */}
            <div className="shadow-2xl print:shadow-none">
                <ResumeDocument data={resumeData} template={selectedTemplate} accentColor={selectedColor} />
            </div>
        </div>
    )
}

export function ResumeProof() {
    const { submission, updateSubmission, isShipped } = useResume()
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle')

    const steps = [
        "Project Initialization",
        "Resume Data Schema Design",
        "Form Implementation (Core Sections)",
        "Dynamic Skills & Projects Modules",
        "Live Preview & Template Engine",
        "Deterministic ATS Scoring v1",
        "Premium UI/UX Refinement",
        "Final Proof & Submission System"
    ]

    const handleCopySubmission = () => {
        const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${submission.lovableLink}
GitHub Repository: ${submission.githubLink}
Live Deployment: ${submission.deployedUrl}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`
        navigator.clipboard.writeText(text)
        setCopyStatus('copied')
        setTimeout(() => setCopyStatus('idle'), 2000)
    }

    return (
        <div className="min-h-screen bg-slate-50 p-12 font-sans overflow-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Final Submission Proof</h1>
                        <p className="text-slate-500 font-medium">Verify your work and collect artifacts for the final shipment.</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-700 ${isShipped ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                        Status: {isShipped ? 'Shipped' : 'In Progress'}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Step Overview */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-slate-400" />
                            Step Completion Overview
                        </h3>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-50 overflow-hidden">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Artifact Collection */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-400" />
                            Artifact Collection
                        </h3>
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Lovable Project Link</label>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                                    placeholder="https://lovable.dev/projects/..."
                                    value={submission.lovableLink}
                                    onChange={e => updateSubmission({ lovableLink: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">GitHub Repository Link</label>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                                    placeholder="https://github.com/..."
                                    value={submission.githubLink}
                                    onChange={e => updateSubmission({ githubLink: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Live Deployment URL</label>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                                    placeholder="https://your-app.vercel.app"
                                    value={submission.deployedUrl}
                                    onChange={e => updateSubmission({ deployedUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Export Button */}
                        <button
                            disabled={!isShipped}
                            onClick={handleCopySubmission}
                            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isShipped ? 'bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed cursor-not-allowed'}`}
                        >
                            {copyStatus === 'copied' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            {copyStatus === 'copied' ? 'Submission Copied' : 'Copy Final Submission'}
                        </button>
                    </div>
                </div>

                {/* Shipped Confirmation */}
                {isShipped && (
                    <div className="pt-20 pb-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100 shadow-sm">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Project 3 Shipped Successfully.</h2>
                        <p className="text-slate-400 text-sm mt-2 font-medium tracking-wide">Premium Build Complete.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResumeBuilder
