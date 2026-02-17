import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from './pages/DashboardLayout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { Practice } from './pages/Practice'
import { Assessments } from './pages/Assessments'
import { Resources } from './pages/Resources'
import { Profile } from './pages/Profile'
import { Analyze } from './pages/Analyze'
import { Results } from './pages/Results'
import { History } from './pages/History'
import { TestChecklist } from './pages/TestChecklist'
import { Ship } from './pages/Ship'
import { Proof } from './pages/Proof'

// RB Imports
import { BuildTrackLayout } from './layouts/BuildTrackLayout'
import { Step01_Problem } from './pages/rb/Step01_Problem'
import { Step02_Market } from './pages/rb/Step02_Market'
import { Step03_Architecture } from './pages/rb/Step03_Architecture'
import { Step04_HLD } from './pages/rb/Step04_HLD'
import { Step05_LLD } from './pages/rb/Step05_LLD'
import { Step06_Build } from './pages/rb/Step06_Build'
import { Step07_Test } from './pages/rb/Step07_Test'
import { Step08_Ship } from './pages/rb/Step08_Ship'
import { ProofRB } from './pages/rb/ProofRB'

// Resume App Imports
import { ResumeLayout } from './layouts/ResumeLayout'
import { ResumeLanding } from './pages/resume/ResumeLanding'
import { ResumeBuilder, ResumePreview, ResumeProof } from './pages/resume/ResumeBuilder'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/prp/07-test" element={<TestChecklist />} />
      <Route path="/prp/08-ship" element={<Ship />} />
      <Route path="/prp/proof" element={<Proof />} />

      {/* RB Build Track */}
      <Route path="/rb" element={<BuildTrackLayout />}>
        <Route path="01-problem" element={<Step01_Problem />} />
        <Route path="02-market" element={<Step02_Market />} />
        <Route path="03-architecture" element={<Step03_Architecture />} />
        <Route path="04-hld" element={<Step04_HLD />} />
        <Route path="05-lld" element={<Step05_LLD />} />
        <Route path="06-build" element={<Step06_Build />} />
        <Route path="07-test" element={<Step07_Test />} />
        <Route path="08-ship" element={<Step08_Ship />} />
        <Route path="proof" element={<ProofRB />} />
      </Route>

      {/* Resume Application */}
      <Route path="/resume" element={<ResumeLayout />}>
        <Route index element={<ResumeLanding />} />
        <Route path="builder" element={<ResumeBuilder />} />
        <Route path="preview" element={<ResumePreview />} />
        <Route path="proof" element={<ResumeProof />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="practice" element={<Practice />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="resources" element={<Resources />} />
        <Route path="profile" element={<Profile />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="results" element={<Results />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}
