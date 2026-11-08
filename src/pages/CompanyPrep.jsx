import React, { useState } from 'react';
import { 
  Building, BookOpen, CheckCircle2, AlertCircle, ArrowRight, 
  ExternalLink, HelpCircle, Code2, Users, Star, Compass, ShieldCheck, 
  ChevronRight, Award, Zap, FileText
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { COMPANIES_DATA } from '../data/companiesData';

export function CompanyPrep({ setActivePage }) {
  const { selectedCompanyId, setSelectedCompanyId, resumeData } = useAssessment();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  // Active company
  const company = COMPANIES_DATA.find(c => c.id === selectedCompanyId) || COMPANIES_DATA[0];
  const activeRole = company.roles[selectedRoleIndex] || company.roles[0];

  // Tab views: 'overview' | 'rounds' | 'questions' | 'hr' | 'roadmap'
  const [prepTab, setPrepTab] = useState('overview');

  const candidateSkills = (resumeData?.verifiedSkills || []).map(s => s.toLowerCase());
  const matchingSkills = activeRole.requiredSkills.filter(req => 
    candidateSkills.some(cs => req.toLowerCase().includes(cs) || cs.includes(req.toLowerCase()))
  );
  const missingSkills = activeRole.requiredSkills.filter(req => 
    !candidateSkills.some(cs => req.toLowerCase().includes(cs) || cs.includes(req.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Company Switcher Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Round 5: Company-Specific Prep
            </span>
            <span className="text-xs text-slate-400">Targeted Research & Question Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {company.name} Interview Preparation Hub
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Stage-by-stage hiring process, verified past technical questions, and leadership evaluation for {company.name}.
          </p>
        </div>

        {/* Company Quick Dropdown Selector */}
        <div className="flex items-center gap-3">
          <select
            value={company.id}
            onChange={(e) => {
              setSelectedCompanyId(e.target.value);
              setSelectedRoleIndex(0);
            }}
            className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {COMPANIES_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.tier.split(' ')[0]})
              </option>
            ))}
          </select>

          <button
            onClick={() => setActivePage('mock-interview')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <span>Mock Interview for {company.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Role Selector Tabs */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-300">
          Target Role at {company.name}:
        </span>
        <div className="flex flex-wrap gap-2">
          {company.roles.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRoleIndex(idx)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                selectedRoleIndex === idx
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      {/* Prep Section Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold">
        <button
          onClick={() => setPrepTab('overview')}
          className={`px-4 py-2 rounded-xl transition-all ${
            prepTab === 'overview'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Company Overview & Skills
        </button>
        <button
          onClick={() => setPrepTab('rounds')}
          className={`px-4 py-2 rounded-xl transition-all ${
            prepTab === 'rounds'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Interview Rounds ({company.interviewProcess.length})
        </button>
        <button
          onClick={() => setPrepTab('questions')}
          className={`px-4 py-2 rounded-xl transition-all ${
            prepTab === 'questions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Verified Past Questions ({company.pastQuestions.length})
        </button>
        <button
          onClick={() => setPrepTab('hr')}
          className={`px-4 py-2 rounded-xl transition-all ${
            prepTab === 'hr'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          HR & Leadership Principles
        </button>
      </div>

      {/* TAB 1: OVERVIEW & SKILL GAP ANALYSIS */}
      {prepTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Company Brief (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {company.tier} • Rating: ★ {company.rating} / 5
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  About {company.name} Hiring Standards
                </h3>
                <p className="text-xs text-slate-500">{company.headquarters}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {company.overview}
              </p>

              {/* Selected Role Highlights */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{activeRole.title}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    {activeRole.salaryRange}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Typical Experience: {activeRole.experience}</p>
              </div>

              {/* Public Research Sources (Requirement: provide public sources) */}
              <div className="pt-2">
                <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider mb-2">
                  Public Research & Verification Sources
                </span>
                <div className="space-y-1.5">
                  {company.sources?.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>{src.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skill Gap Analysis (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Skill Gap Analysis for {activeRole.title}
              </h3>

              {/* Match Stats */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-center">
                <span className="text-3xl font-black text-blue-600">
                  {Math.round((matchingSkills.length / activeRole.requiredSkills.length) * 100)}%
                </span>
                <p className="text-xs text-slate-500 mt-1">Direct Skill Match</p>
              </div>

              {/* Matching Skills */}
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-2">
                  ✓ What You Already Know ({matchingSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              {missingSkills.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-2">
                    ⚠ Skills to Study Before Interview ({missingSkills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missingSkills.map((sk, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERVIEW ROUNDS */}
      {prepTab === 'rounds' && (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Official Interview Stages & Selection Process for {company.name}
            </h3>
            <p className="text-xs text-slate-500">
              Clear distinction: Verified company stages and timing.
            </p>
          </div>

          <div className="space-y-4">
            {company.interviewProcess.map((round, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                  {round.step}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{round.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Duration: {round.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {round.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIED PAST QUESTIONS */}
      {prepTab === 'questions' && (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Publicly Reported & Verified Past Questions ({company.name})
            </h3>
            <p className="text-xs text-slate-500">
              Sourced from Glassdoor, LeetCode Discuss, and GeeksforGeeks Candidate Archives.
            </p>
          </div>

          <div className="space-y-4">
            {company.pastQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{q.category}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 italic">
                    Source: {q.source}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {q.title}
                </h4>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.question}
                </p>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs">
                  <strong className="text-blue-900 dark:text-blue-300">Solution Approach / Hint: </strong>
                  <span className="text-blue-800 dark:text-blue-200">{q.hint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: HR & LEADERSHIP */}
      {prepTab === 'hr' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {company.name} Cultural Fit & Behavioral Questions (STAR Method)
            </h3>
            <p className="text-xs text-slate-500">
              Top tech companies value culture alignment as much as DSA. Structure answers using Situation, Task, Action, and Result.
            </p>

            <div className="space-y-3 pt-2">
              {company.hrQuestions.map((hrQ, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                    Question {idx + 1}
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">"{hrQ}"</p>
                </div>
              ))}
            </div>

            {/* Preparation Tips */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                Insider Preparation Tips for {company.name}:
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                {company.preparationTips?.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
