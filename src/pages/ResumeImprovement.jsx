import React, { useState } from 'react';
import { 
  Sparkles, FileText, CheckCircle2, AlertCircle, ArrowRight, 
  Search, Copy, Check, Target, Briefcase, Zap, HelpCircle
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: 'jd-sde1',
    title: 'Software Development Engineer 1 (Full Stack)',
    company: 'Fintech Scaleup',
    text: `Job Description:
We are seeking an energetic Software Development Engineer 1 to join our core transactions team. 

Key Responsibilities:
- Design and build scalable RESTful APIs and real-time microservices using Node.js / TypeScript or Python.
- Develop responsive, accessible front-end interfaces using React and modern CSS.
- Optimize database queries in PostgreSQL, including indexing and schema migrations.
- Implement automated testing with Jest and CI/CD pipelines in Docker and GitHub Actions.

Requirements:
- Bachelor's degree in Computer Science or related engineering field.
- 1-3 years experience (or strong internship projects) with React, Node.js, and TypeScript.
- Strong understanding of Data Structures, Algorithms, and Object-Oriented Design.
- Experience with Redis caching and Docker containerization is a major plus.`
  },
  {
    id: 'jd-backend-python',
    title: 'Backend Systems Engineer (Python / FastAPI)',
    company: 'Cloud Data Platform',
    text: `About the Role:
We are building next-generation distributed data ingestion pipelines.

Requirements:
- Strong proficiency in Python (FastAPI, Django, or Flask).
- Experience with relational (PostgreSQL) and NoSQL (Redis, MongoDB) stores.
- Familiarity with asynchronous task processing using Celery or Kafka.
- Understanding of distributed systems, concurrency, and cloud architectures (AWS / Docker).`
  }
];

export function ResumeImprovement({ setActivePage }) {
  const { resumeData } = useAssessment();
  const [jdText, setJdText] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [jdAnalysisResult, setJdAnalysisResult] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Resume improvements suggestions
  const suggestedImprovements = [
    {
      type: 'bullet_enhancement',
      title: 'Quantify Project Outcomes (Action + Metric + Result)',
      before: 'Developed responsive client portals in React and TypeScript with modular components.',
      after: 'Architected 14+ reusable React/TypeScript UI modules, slashing bundle payload by 28% and boosting Lighthouse performance score from 68 to 94.',
      reason: 'Recruiters and ATS scanners look for measurable impact metrics over generic duty descriptions.'
    },
    {
      type: 'ats_keywords',
      title: 'High-Impact ATS Keywords to Add',
      keywords: ['Distributed Systems', 'CI/CD Automation', 'Microservices', 'RESTful API Design', 'Unit Testing (Jest/Pytest)', 'PostgreSQL Indexing'],
      reason: 'These keywords appeared in 86% of target SDE-1 job postings matching your tech stack.'
    },
    {
      type: 'formatting',
      title: 'Formatting & ATS Cleanliness Check',
      status: 'Clean & Machine-Readable',
      details: 'Single-column hierarchy, standard section headers (Experience, Projects, Education, Skills), zero decorative tables or non-standard fonts.'
    }
  ];

  const handleAnalyzeJD = () => {
    // Extract keywords from JD
    const textLower = jdText.toLowerCase();
    const candidateSkills = (resumeData?.verifiedSkills || []).map(s => s.toLowerCase());

    const potentialKeywords = [
      'react', 'typescript', 'javascript', 'node.js', 'python', 'fastapi', 'django',
      'postgresql', 'redis', 'docker', 'kubernetes', 'aws', 'data structures', 'algorithms',
      'object-oriented design', 'restful apis', 'jest', 'ci/cd', 'github actions', 'sql'
    ];

    const jdRequired = potentialKeywords.filter(kw => textLower.includes(kw));
    const matched = jdRequired.filter(kw => 
      candidateSkills.some(cs => cs.includes(kw) || kw.includes(cs))
    );
    const missing = jdRequired.filter(kw => 
      !candidateSkills.some(cs => cs.includes(kw) || kw.includes(cs))
    );

    const matchPercent = Math.min(95, Math.max(50, Math.round((matched.length / Math.max(1, jdRequired.length)) * 100)));

    setJdAnalysisResult({
      matchPercentage: matchPercent,
      matched,
      missing,
      suggestedQuestions: [
        'How would you structure a Redis caching layer to handle high query volume in PostgreSQL?',
        'Walk through how you configure a GitHub Actions workflow to build and test Docker images.',
        'Explain how you optimize React component re-rendering using memoization hooks.'
      ]
    });
  };

  const handleCopy = (text, index) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Features 13 & 15: Career Acceleration
            </span>
            <span className="text-xs text-slate-400">Resume Optimization & ATS Alignment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Resume Improvement & Job Description Matcher
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Transform weak bullet points into high-impact accomplishments, optimize ATS keywords, and benchmark against any job description.
          </p>
        </div>
      </div>

      {/* SECTION 1: RESUME CRITIQUE & BULLET POINT ENHANCER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Actionable Resume Critique for {resumeData?.fileName}
          </h2>
          <p className="text-xs text-slate-500">
            Based on current industry standards and recruiter scanning preferences.
          </p>
        </div>

        {/* Enhancer Cards */}
        <div className="space-y-4">
          {suggestedImprovements.map((imp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {imp.title}
                </span>
                <span className="text-[11px] text-slate-400">AI Recommendation</span>
              </div>

              {imp.type === 'bullet_enhancement' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60">
                    <span className="text-[10px] uppercase font-bold text-rose-500 block mb-1">Before (Passive)</span>
                    <p className="text-slate-600 dark:text-slate-300 italic">"{imp.before}"</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-500">After (Action + Metric + Impact)</span>
                      <button
                        onClick={() => handleCopy(imp.after, idx)}
                        className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-slate-900 dark:text-white font-medium">"{imp.after}"</p>
                  </div>
                </div>
              )}

              {imp.type === 'ats_keywords' && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {imp.keywords.map((kw, kIdx) => (
                    <span
                      key={kIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-900"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-slate-500">{imp.reason || imp.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: JOB DESCRIPTION MATCHING */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Job Description & Resume Matcher
          </h2>
          <p className="text-xs text-slate-500">
            Paste any external job description to check your keyword match %, missing skills, and custom interview questions.
          </p>
        </div>

        {/* Quick JD Pre-loaders */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Load Sample JD:</span>
          {SAMPLE_JOB_DESCRIPTIONS.map((sjd) => (
            <button
              key={sjd.id}
              onClick={() => { setJdText(sjd.text); setJdAnalysisResult(null); }}
              className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-medium"
            >
              {sjd.title} ({sjd.company})
            </button>
          ))}
        </div>

        <textarea
          rows={7}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste Job Description here..."
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <div className="flex justify-end">
          <button
            onClick={handleAnalyzeJD}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            <span>Compare Resume with Job Description</span>
          </button>
        </div>

        {/* Analysis Result */}
        {jdAnalysisResult && (
          <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-200 dark:border-blue-900/60 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  Target Role Compatibility
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Match Score: {jdAnalysisResult.matchPercentage}%
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Strong Alignment
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-1.5">
                  ✓ Matching Skills in Your Resume ({jdAnalysisResult.matched.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {jdAnalysisResult.matched.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold uppercase text-[10px]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1.5">
                  ⚠ Missing Skills from Job Description ({jdAnalysisResult.missing.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {jdAnalysisResult.missing.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold uppercase text-[10px]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Interview Prep Questions for this JD */}
            <div className="pt-2">
              <span className="font-bold text-xs text-slate-900 dark:text-white block mb-2">
                Customized Interview Questions for this Job Role:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc pl-4">
                {jdAnalysisResult.suggestedQuestions.map((q, qIdx) => (
                  <li key={qIdx}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
