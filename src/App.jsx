import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './pages/AuthModal';

// Pages
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { ResumeAnalysisRound } from './pages/ResumeAnalysisRound';
import { CodingRound } from './pages/CodingRound';
import { ProblemSolvingRound } from './pages/ProblemSolvingRound';
import { PerformanceReport } from './pages/PerformanceReport';
import { CompanyRecommendations } from './pages/CompanyRecommendations';
import { CompanyPrep } from './pages/CompanyPrep';
import { MockInterview } from './pages/MockInterview';
import { ResumeImprovement } from './pages/ResumeImprovement';
import { LearningRoadmap } from './pages/LearningRoadmap';

export function App() {
  const [activePage, setActivePage] = useState('home');

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'round1':
        return <ResumeAnalysisRound setActivePage={setActivePage} />;
      case 'round2':
        return <CodingRound setActivePage={setActivePage} />;
      case 'round3':
        return <ProblemSolvingRound setActivePage={setActivePage} />;
      case 'performance':
        return <PerformanceReport setActivePage={setActivePage} />;
      case 'companies':
        return <CompanyRecommendations setActivePage={setActivePage} />;
      case 'company-prep':
        return <CompanyPrep setActivePage={setActivePage} />;
      case 'mock-interview':
        return <MockInterview setActivePage={setActivePage} />;
      case 'resume-improve':
        return <ResumeImprovement setActivePage={setActivePage} />;
      case 'roadmap':
        return <LearningRoadmap setActivePage={setActivePage} />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <AuthProvider>
      <AssessmentProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Navbar activePage={activePage} setActivePage={setActivePage} />

          <main className="flex-1">
            {renderActivePage()}
          </main>

          <Footer setActivePage={setActivePage} />
          <AuthModal />
        </div>
      </AssessmentProvider>
    </AuthProvider>
  );
}

export default App;
