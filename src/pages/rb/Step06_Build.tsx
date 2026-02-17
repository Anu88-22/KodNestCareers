import { BuildStep } from '../../components/BuildStep'

export function Step06_Build() {
    return (
        <BuildStep
            stepId="06-build"
            title="Step 6: Build & Integration"
            description="Assemble the full resume builder application."
            lovablePrompt={`Build the Core Resume Builder.
Layout: Split screen (Left: Forms, Right: A4 Preview).
Features:
- Add/Remove Experience blocks
- Real-time updates in Preview
- Draggable sections (optional)
- "Download PDF" button using html2pdf or window.print().`}
            nextPath="/rb/07-test"
        />
    )
}
