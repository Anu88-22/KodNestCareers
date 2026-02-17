import { BuildStep } from '../../components/BuildStep'

export function Step03_Architecture() {
    return (
        <BuildStep
            stepId="03-architecture"
            title="Step 3: System Architecture"
            description="Design the high-level system components."
            lovablePrompt={`Visualize the System Architecture.
Components:
1. Frontend Client (React)
2. Resume State Manager (Local Store)
3. PDF Generator Engine
4. AI Suggestion Service (Stub/API)
Flow: User Input -> State Update -> Preview Render -> PDF Export.`}
            nextPath="/rb/04-hld"
        />
    )
}
