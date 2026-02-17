import { BuildStep } from '../../components/BuildStep'

export function Step04_HLD() {
    return (
        <BuildStep
            stepId="04-hld"
            title="Step 4: High Level Design (HLD)"
            description="Define major modules and data flow."
            lovablePrompt={`Create a HLD Diagram representation.
Module A: Personal Info Form
Module B: Experience & Education Timeline
Module C: Skills Tagger
Module D: Live Preview Split-Pane
Show directional arrows for data flow from Forms to Preview.`}
            nextPath="/rb/05-lld"
        />
    )
}
