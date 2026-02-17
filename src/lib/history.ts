const STORAGE_KEY = 'placement-prep-jd-history'

export interface RoundMapping {
  roundTitle: string
  focusAreas: string[]
  whyItMatters: string
}

export interface DayPlan {
  day: number
  title: string
  tasks: string[]
}

export interface HistoryEntry {
  id: string
  createdAt: string
  updatedAt: string
  company: string
  role: string
  jdText: string // Full JD

  // Flat structure as requested
  extractedSkills: {
    coreCS: string[]
    languages: string[]
    web: string[]
    data: string[]
    cloud: string[]
    testing: string[]
    other: string[]
  }

  // Schema v2 fields
  plan7Days: DayPlan[]
  checklist: { round: string; items: string[]; rationale?: string }[]
  roundMapping: RoundMapping[]
  questions: string[]

  // Scores
  baseScore: number
  finalScore: number
  skillConfidenceMap?: Record<string, 'know' | 'practice'>

  // Intel
  companyIntel?: {
    name: string
    industry: string
    size: string
    hiringFocus: string
  }
}

export function saveToHistory(data: Omit<HistoryEntry, 'id' | 'createdAt' | 'updatedAt'>): HistoryEntry {
  const entry: HistoryEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...data
  }

  const list = getHistory()
  list.unshift(entry)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.warn('LocalStorage save failed', e)
  }

  return entry
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    // Robust filtering: Skip entries that don't match new schema
    return parsed.filter((item: any) => {
      // Check for required v2 fields
      return (
        item.id &&
        item.extractedSkills &&
        Array.isArray(item.extractedSkills.coreCS) && // Check if flat structure exists
        Array.isArray(item.roundMapping)
      )
    })
  } catch (e) {
    console.warn('Failed to load history', e)
    return []
  }
}

export function getHistoryEntryById(id: string): HistoryEntry | undefined {
  return getHistory().find((e) => e.id === id)
}

export function updateHistoryEntry(id: string, updates: Partial<HistoryEntry>): HistoryEntry | null {
  const list = getHistory()
  const index = list.findIndex((e) => e.id === id)
  if (index === -1) return null

  const updatedEntry = {
    ...list[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }

  list[index] = updatedEntry

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.warn('LocalStorage update failed', e)
  }
  return updatedEntry
}
