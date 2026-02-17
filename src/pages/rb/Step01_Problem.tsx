import { BuildStep } from '../../components/BuildStep'

export function Step01_Problem() {
    return (
        <BuildStep
            stepId="01-problem"
            title="Step 1: Problem Definition"
            description="Define the core value proposition of the AI Resume Builder."
            lovablePrompt={`Create a Landing Page for "AI Resume Builder".
Headline: "Craft a ATS-Friendly Resume in Seconds"
Subheadline: "Powered by AI. Optimized for Recruiters."
Features: "Smart Formatting", "Keyword Optimization", "Instant PDF Export".
Call to Action: "Build My Resume".
Style: Clean, professional, minimal blue/slate palette.`}
            nextPath="/rb/02-market"
        />
    )
}
