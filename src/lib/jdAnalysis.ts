import type { HistoryEntry } from './history'

// Define the shape of our analysis result to match HistoryEntry's needs
export interface AnalysisResult {
  extractedSkills: HistoryEntry['extractedSkills']
  roundMapping: HistoryEntry['roundMapping']
  checklist: HistoryEntry['checklist']
  plan: HistoryEntry['plan7Days']
  questions: string[]
  readinessScore: number
  companyIntel: CompanyIntel
}

export interface CompanyIntel {
  name: string
  industry: string
  size: string
  hiringFocus: string
}

const SKILL_KEYWORDS: Record<keyof HistoryEntry['extractedSkills'], string[]> = {
  coreCS: ['dsa', 'data structures', 'algorithm', 'system design', 'oop', 'os', 'dbms', 'operating systems', 'computer networks', 'hld', 'lld', 'normalization', 'concurrency', 'multithreading'],
  languages: ['java', 'python', 'c++', 'c#', 'javascript', 'typescript', 'golang', 'ruby', 'swift', 'kotlin', 'rust', 'php', 'c'],
  web: ['react', 'angular', 'vue', 'node', 'express', 'html', 'css', 'tailwind', 'next.js', 'redux', 'flutter', 'android', 'ios', 'shadcn', 'radix', 'framer motion', 'vite', 'webpack'],
  data: ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'kafka', 'spark', 'hadoop', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'warehouse', 'etl'],
  cloud: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'ci/cd', 'terraform', 'ansible', 'serverless', 'lambda', 's3', 'ec2'],
  testing: ['selenium', 'jest', 'junit', 'cypress', 'mocha', 'manual testing', 'playwright', 'unit testing', 'integration testing', 'qa'],
  other: ['git', 'agile', 'scrum', 'jira', 'figma', 'postman', 'swagger', 'graphql', 'rest api', 'microservices']
}

export const SKILL_CATEGORIES = {
  coreCS: { label: 'Core CS' },
  languages: { label: 'Languages' },
  web: { label: 'Web / App' },
  data: { label: 'Data / Cloud' },
  cloud: { label: 'DevOps / Cloud' },
  testing: { label: 'Testing' },
  other: { label: 'Other/Tools' }
}

const KNOWN_ENTERPRISES = [
  'tcs', 'infosys', 'wipro', 'hcl', 'accenture', 'capgemini', 'cognizant', 'ibm', 'deloitte',
  'amazon', 'google', 'microsoft', 'adobe', 'salesforce', 'oracle', 'cisco', 'intel', 'samsung'
]

export function generateCompanyIntel(companyName: string): CompanyIntel {
  const normalized = companyName.toLowerCase().trim()
  if (!normalized) {
    return {
      name: '',
      industry: 'Technology Services',
      size: 'Startup',
      hiringFocus: 'Practical problem solving + stack depth'
    }
  }

  const isEnterprise = KNOWN_ENTERPRISES.some(k => normalized.includes(k))

  let industry = 'Technology Services'
  if (normalized.includes('bank') || normalized.includes('financial')) industry = 'FinTech'
  else if (normalized.includes('health') || normalized.includes('pharma')) industry = 'HealthTech'
  else if (normalized.includes('retail') || normalized.includes('commerce')) industry = 'E-commerce'
  else if (normalized.includes('auto')) industry = 'Automotive'

  if (isEnterprise) {
    return {
      name: companyName,
      industry,
      size: 'Enterprise',
      hiringFocus: 'Structured DSA + Core CS fundamentals + System Design basics'
    }
  }

  return {
    name: companyName,
    industry,
    size: 'Startup',
    hiringFocus: 'Practical coding, Framework depth, and Culture fit'
  }
}

export function runAnalysis(inputs: { jdText: string; company?: string; role?: string }): AnalysisResult {
  const { jdText, company = '' } = inputs
  const lowerJd = jdText.toLowerCase()

  const extractedSkills: HistoryEntry['extractedSkills'] = {
    coreCS: [],
    languages: [],
    web: [],
    data: [],
    cloud: [],
    testing: [],
    other: []
  }

  let totalSkills = 0

    ; (Object.keys(SKILL_KEYWORDS) as Array<keyof typeof extractedSkills>).forEach(category => {
      const keywords = SKILL_KEYWORDS[category]
      keywords.forEach(kw => {
        if (lowerJd.includes(kw)) {
          if (!extractedSkills[category].includes(kw)) {
            extractedSkills[category].push(kw)
            totalSkills++
          }
        }
      })
    })

  if (totalSkills === 0) {
    extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"]
  }

  const companyIntel = generateCompanyIntel(company)
  const isEnterprise = companyIntel.size === 'Enterprise'

  const roundMapping: HistoryEntry['roundMapping'] = []

  if (isEnterprise) {
    roundMapping.push({
      roundTitle: "Round 1: Online Assessment",
      whyItMatters: "Filters thousands of candidates. Speed and accuracy in aptitude/DSA is key.",
      focusAreas: ["Quantitative Aptitude", "Verbal Ability", "Basic Coding (Arrays/Strings)", "Core CS MCQs"]
    })
    roundMapping.push({
      roundTitle: "Round 2: Technical Interview I (DSA)",
      whyItMatters: "Validates problem-solving depth. Expect standard LeetCode Medium problems.",
      focusAreas: ["Linked Lists", "Trees/Graphs", "Stacks/Queues", "Time Complexity Analysis"]
    })
    roundMapping.push({
      roundTitle: "Round 3: Technical Interview II (Core CS + System Design)",
      whyItMatters: "Deep dive into technical knowledge and architectural understanding.",
      focusAreas: ["DBMS Normalization", "OS Concurrency", "Low Level Design", "Project Deep Dive"]
    })
    roundMapping.push({
      roundTitle: "Round 4: Managerial / HR",
      whyItMatters: "Assess long-term fit, stability, and behavioral alignment.",
      focusAreas: ["Team conflicts", "Weaknesses/Strengths", "Why this company?", "Relocation"]
    })
  } else {
    roundMapping.push({
      roundTitle: "Round 1: Practical / Screening",
      whyItMatters: "Validates if you can write code that works. Often a take-home or live pair programming.",
      focusAreas: ["Build a small feature", "Debug existing code", "Basic DSA", "Resume walkthrough"]
    })
    roundMapping.push({
      roundTitle: "Round 2: Technical Deep Dive",
      whyItMatters: "Tests your mastery of the specific stack and engineering decision making.",
      focusAreas: ["Framework internals", "API Design", "Database Modeling", "Code Quality"]
    })
    roundMapping.push({
      roundTitle: "Round 3: Founder/Culture Fit",
      whyItMatters: "Startups need ownership. They check if you are a 'doer' and match the pace.",
      focusAreas: ["Product thinking", "Ownership examples", "Career runway", "Cultural alignment"]
    })
  }

  const checklist = roundMapping.map(r => ({
    round: r.roundTitle,
    items: r.focusAreas,
    rationale: r.whyItMatters
  }))

  const plan: HistoryEntry['plan7Days'] = [
    { day: 1, title: 'Input & Research', tasks: ['Analyze notification details', 'Research company culture', 'Review role requirements'] },
    { day: 2, title: 'Core Concepts (DSA/Logic)', tasks: ['Practice arrays/strings', 'Review time complexity', 'Solve Medium problems'] },
    { day: 3, title: 'Framework/System Depth', tasks: ['Review specific framework docs', 'Build a small POC', 'Read engineering blogs'] },
    { day: 4, title: 'CS Fundamentals', tasks: ['Revise OS/DBMS keywords', 'Practice SQL queries', 'Review networking basics'] },
    { day: 5, title: 'Mock Interviews', tasks: ['Self-record answers', 'Peer mock interview', 'Review past projects'] },
    { day: 6, title: 'Behavioral Prep', tasks: ['Prepare STAR stories', 'Research interviewers', 'Prepare questions for them'] },
    { day: 7, title: 'Final Revision', tasks: ['Review cheat sheets', 'Rest & mental prep', 'Logistics check'] }
  ]

  const questions = [
    "Tell me about a challenging bug you fixed.",
    "Why do you want to work here?",
    "Explain your project architecture.",
    "What are your strengths and weaknesses?"
  ]
  if (extractedSkills.web.length > 0) questions.push(`What is the lifecycle of a ${extractedSkills.web[0]} component?`)

  const baseScore = Math.min(95, 45 + (totalSkills * 4))

  return {
    extractedSkills,
    roundMapping,
    checklist,
    plan,
    questions,
    readinessScore: baseScore,
    companyIntel
  }
}
