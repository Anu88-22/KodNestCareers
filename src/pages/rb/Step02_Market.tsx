import { BuildStep } from '../../components/BuildStep'

export function Step02_Market() {
    return (
        <BuildStep
            stepId="02-market"
            title="Step 2: Market Analysis"
            description="Identify target users and competitors."
            lovablePrompt={`Create a "Market Analysis" section.
Target Audience: Freshers, Job Switchers, Tech Professionals.
Competitors: Canva (Design focus), LinkedIn (Network focus).
Our Edge: "Content + Context". We analyze JDs to tailor the resume.
Visuals: Comparison table showing "Us vs Them".`}
            nextPath="/rb/03-architecture"
        />
    )
}
