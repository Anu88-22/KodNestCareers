import { BuildStep } from '../../components/BuildStep'

export function Step05_LLD() {
    return (
        <BuildStep
            stepId="05-lld"
            title="Step 5: Low Level Design (LLD)"
            description="Specify component hierarchy and state schemas."
            lovablePrompt={`Define TypeScript Interfaces for the Resume.
interface ResumeData {
  personal: { name, email, phone, links };
  experience: { company, role, duration, bullets[] }[];
  education: { school, degree, year }[];
  skills: { category, items[] }[];
}
Visualize this schema as a data tree.`}
            nextPath="/rb/06-build"
        />
    )
}
