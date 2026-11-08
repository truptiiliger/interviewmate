import React from 'react';
import { 
  Sparkles, FileText, ArrowRight, CheckCircle2, AlertCircle, 
  Code, Brain, Building, Compass, RotateCcw, Award, ChevronRight,
  TrendingUp, Clock, Calendar, Briefcase, Zap, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAssessment } from '../context/AssessmentContext';
import { ScoreGauge } from '../components/ScoreGauge';
import { RadarChart } from '../components/RadarChart';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

export function Dashboard({ setActivePage }) {
  const { currentUser, openAuth } = useAuth();
  const { 
    resumeData, 
    setSampleResume,
    round1, 
    round2, 
    round3, 
    overallReadinessScore, 
    strongSkills, 
    weakSkills,
    roadmapCompletedTasks
  } = useAssessment();

  // Determine next smart step
  let nextAction = { label: 'Start Round 1: Resume MCQs', page: 'round1', desc: '10 MCQs based on your extracted skills' };
  if (round1.completed && !round2.completed) {
    nextAction = { label: 'Continue Round 2: Coding & DSA', page: 'round2', desc: 'Solve live programming challenges' };
  } else if (round1.completed && round2.completed && !round3.completed) {
    nextAction = { label: 'Complete Round 3: Problem Solving', page: 'round3', desc: 'Scenario logic & optional voice input' };
  } else if (round1.completed && round2.completed && round3.completed) {
    nextAction = { label: 'Simulate AI Voice Mock Interview', page: 'mock-interview', desc: 'Live speech questions with intelligent feedback' };
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-indigo-900/10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Candidate Preparation Workspace
            </span>
            <span className="text-xs text-slate-400">• Active Session</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome back, {currentUser?.fullName || 'Candidate'}! 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Target Role: <strong className="text-slate-800 dark:text-slate-200">{currentUser?.targetJobRole || resumeData?.targetRole}</strong> • {currentUser?.education} ({currentUser?.graduationYear})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActivePage(nextAction.page)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all flex items-center gap-2 group"
          >
            <span>{nextAction.label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActivePage('round1')}
            className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Upload New Resume</span>
          </button>
        </div>
      </div>

      {/* QUICK PRE-SET RESUME SWITCHER */}
      <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Quick Persona Switcher (Instant Test):
          </span>
          <span className="text-slate-500 hidden lg:inline">
            Switch resume profile to test dynamic MCQs & company matches:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setSampleResume(sample.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold text-[11px] transition-all border ${
                resumeData?.targetRole === sample.targetRole
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {sample.title.split(' ')[0]} {sample.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* 3 CORE METRIC CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric 1: Overall Readiness Score */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between text-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Readiness Score
            </span>
            <button
              onClick={() => setActivePage('performance')}
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-2">
            <ScoreGauge score={overallReadinessScore} maxScore={100} size={170} />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-2">
            Weighted calculation across Resume Skills (30%), DSA Coding (45%), and Logical Problem Solving (25%).
          </p>
        </div>

        {/* Metric 2: Round-Wise Assessment Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Round-Wise Progress
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                3 Assessment Stages
              </span>
            </div>

            <div className="space-y-4">
              {/* Round 1 */}
              <div 
                onClick={() => setActivePage('round1')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                      R1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        AI Resume MCQs
                      </h4>
                      <p className="text-[10px] text-slate-500">10 Generated Skill Questions</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {round1.score} / {round1.maxScore} <span className="text-[11px] text-blue-600">({round1.percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${round1.percentage}%` }}></div>
                </div>
              </div>

              {/* Round 2 */}
              <div 
                onClick={() => setActivePage('round2')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-indigo-400 transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      R2
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        Programming & DSA
                      </h4>
                      <p className="text-[10px] text-slate-500">Live Code Execution & O(N)</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {round2.score} / {round2.maxScore} <span className="text-[11px] text-indigo-600">({round2.percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${round2.percentage}%` }}></div>
                </div>
              </div>

              {/* Round 3 */}
              <div 
                onClick={() => setActivePage('round3')}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-purple-400 transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                      R3
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                        Problem Solving & Logic
                      </h4>
                      <p className="text-[10px] text-slate-500">Analytical Scenarios & Speech</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {round3.score} / {round3.maxScore} <span className="text-[11px] text-purple-600">({round3.percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${round3.percentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">All 3 rounds scored</span>
            <button onClick={() => setActivePage('performance')} className="text-blue-600 font-bold hover:underline">
              Inspect Detailed Breakdown &rarr;
            </button>
          </div>
        </div>

        {/* Metric 3: Competency Radar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skill Matrix Radar
            </span>
            <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
              6 Dimensions
            </span>
          </div>

          <RadarChart size={240} />

          <div className="w-full mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-around text-center text-xs">
            <div>
              <p className="text-slate-400 text-[10px]">Top Dimension</p>
              <p className="font-bold text-blue-600">Code Quality (90%)</p>
            </div>
            <div>
              <p className="text-slate-400 text-[10px]">Improvement Target</p>
              <p className="font-bold text-purple-600">Algorithms (72%)</p>
            </div>
          </div>
        </div>
      </div>

      {/* SKILL STRENGTHS & WEAKNESSES + RESUME STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strong vs Weak Skills */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Identified Competency Profile
            </h3>
            <span className="text-xs text-slate-400 font-medium">From Assessment Diagnostics</span>
          </div>

          {/* Strong Skills */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Strongest Technical Skills (Consistently High Accuracy)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {strongSkills.map((sk, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                >
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Weak Skills */}
          <div className="pt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Areas Requiring Focus & Revision</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {weakSkills.map((sk, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                >
                  ⚠ {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Uploaded Resume Status Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Active Resume Profile
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                {resumeData?.status || 'Analyzed'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-xs text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                    {resumeData?.fileName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {resumeData?.fileSize} • Uploaded {resumeData?.uploadedAt}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePage('round1')}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-white dark:hover:bg-slate-900 transition-colors"
              >
                Change / Edit
              </button>
            </div>

            {/* Extracted Skills Preview */}
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                Verified Skills ({resumeData?.verifiedSkills?.length || 0})
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {(resumeData?.verifiedSkills || []).map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-100 dark:border-blue-900"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Questions strictly mapped to these skills</span>
            <button
              onClick={() => setActivePage('resume-improve')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Resume Optimizer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* RECOMMENDED COMPANIES & LEARNING ROADMAP SHORTCUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Companies Quick View */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Top AI Company Matches
              </h3>
            </div>
            <button
              onClick={() => setActivePage('companies')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All 9 Companies &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {/* Google */}
            <div 
              onClick={() => setActivePage('company-prep')}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 font-black flex items-center justify-center text-base">
                  G
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Google</h4>
                  <p className="text-[11px] text-slate-500">Software Engineer (L3) • Tier 1 Product</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Ready to Apply (86%)
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Missing: Graph BFS/DFS</p>
              </div>
            </div>

            {/* Microsoft */}
            <div 
              onClick={() => setActivePage('company-prep')}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 font-black flex items-center justify-center text-sm">
                  MS
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">Microsoft</h4>
                  <p className="text-[11px] text-slate-500">Software Development Engineer I (SDE 1)</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Ready to Apply (88%)
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Missing: BST In-Order</p>
              </div>
            </div>

            {/* TCS Digital */}
            <div 
              onClick={() => setActivePage('company-prep')}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-black flex items-center justify-center text-xs">
                  TCS
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">TCS Digital / Prime</h4>
                  <p className="text-[11px] text-slate-500">Systems Engineer Specialist • ₹7.5L - ₹11.5L</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Ready to Apply (94%)
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Exceeds requirements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Roadmap Quick View */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Personalized 7-Day Study Roadmap
                </h3>
              </div>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                {roadmapCompletedTasks.length} / 7 Completed
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Custom-built based on your detected Dynamic Programming and Graph gaps:
            </p>

            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="font-medium line-through text-slate-400">Day 1: Arrays & Two Pointers Revision</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">Done</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="font-medium line-through text-slate-400">Day 2: Stacks & Sliding Window Technique</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">Done</span>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                  <span className="font-bold text-blue-900 dark:text-blue-200">Day 3: Tree Traversals & LCA Algorithms</span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">Today's Focus</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Track day-by-day resources</span>
            <button
              onClick={() => setActivePage('roadmap')}
              className="text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Open Interactive Checklist</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
