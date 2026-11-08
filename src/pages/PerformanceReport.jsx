import React from 'react';
import { 
  Award, TrendingUp, CheckCircle2, AlertCircle, ArrowRight, 
  RotateCcw, Download, Share2, Sparkles, Compass, Building, Briefcase
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { ScoreGauge } from '../components/ScoreGauge';
import { RadarChart } from '../components/RadarChart';

export function PerformanceReport({ setActivePage }) {
  const { 
    round1, 
    round2, 
    round3, 
    overallReadinessScore, 
    strongSkills, 
    weakSkills,
    resumeData 
  } = useAssessment();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header & Export Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Verified Candidate Report
            </span>
            <span className="text-xs text-slate-400">Post-Assessment Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Overall Interview Readiness Analysis
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Holistic report synthesizing Round 1 Resume MCQs, Round 2 Programming & DSA, and Round 3 Analytical Problem Solving.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Report (PDF)</span>
          </button>

          <button
            onClick={() => setActivePage('companies')}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:opacity-95 flex items-center gap-2 group transition-all"
          >
            <span>Proceed to Company Recommendations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* TOP COMPOSITE READINESS BANNER */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Circular Gauge (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Overall Readiness Index
            </span>
            <ScoreGauge score={overallReadinessScore} maxScore={100} size={200} strokeWidth={16} />
            <p className="text-[11px] text-slate-500 text-center mt-3 max-w-xs">
              Calculated across 30% Skill MCQ + 45% DSA Coding + 25% Logical Scenarios
            </p>
          </div>

          {/* Assessment Breakdown Summary (8 cols) */}
          <div className="md:col-span-8 space-y-5">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase tracking-wider">
                Candidate Profile: {resumeData?.candidateName}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Competitive Ready for Tier-1 Product & IT Services Roles
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Candidate demonstrated strong programming fundamentals, solid Big-O time and space optimization, and clear analytical articulation under time limits.
              </p>
            </div>

            {/* Round by Round Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Round 1: Resume MCQs</span>
                <p className="text-2xl font-extrabold text-blue-600 mt-1">{round1.score} <span className="text-xs text-slate-400">/ 10</span></p>
                <p className="text-[11px] text-slate-500 mt-0.5">80% Skill Accuracy</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Round 2: Coding & DSA</span>
                <p className="text-2xl font-extrabold text-indigo-600 mt-1">{round2.score} <span className="text-xs text-slate-400">/ 10</span></p>
                <p className="text-[11px] text-slate-500 mt-0.5">Optimal Time/Space</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Round 3: Problem Solving</span>
                <p className="text-2xl font-extrabold text-purple-600 mt-1">{round3.score} <span className="text-xs text-slate-400">/ 10</span></p>
                <p className="text-[11px] text-slate-500 mt-0.5">High Clarity Logic</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RADAR CHART & SKILLS PROFILE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Radar Matrix (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              6-Dimensional Competency Matrix
            </h3>
            <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Diagnostic Radar</span>
          </div>

          <RadarChart size={280} />

          <p className="text-[11px] text-slate-500 text-center mt-2">
            Solid strengths in Code Quality (90%) and Data Structures (85%). Priority revision in Algorithms (72%).
          </p>
        </div>

        {/* Strong vs Weak Skills Detailed Analysis (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
              Strengths & Improvement Areas Diagnostics
            </h3>

            {/* Strengths */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Strong Technical Competencies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Recommended Skill Focus Areas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {weakSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    ⚠ {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs space-y-2">
            <span className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Preparation Action Plan:</span>
            </span>
            <ul className="text-blue-800 dark:text-blue-200 text-xs space-y-1 list-disc pl-4">
              <li>Review Graph BFS/DFS traversal patterns to qualify for Tier-1 Product onsite loops.</li>
              <li>Practice Dynamic Programming memoization (Knapsack & Longest Subsequence).</li>
              <li>Simulate live AI Voice Mock Interviews to sharpen verbal articulation of edge cases.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
