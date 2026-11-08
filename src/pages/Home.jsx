import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, FileCheck, Code2, Cpu, Brain, Building2, 
  Target, Bot, CheckCircle2, ChevronRight, Star, ShieldCheck, 
  HelpCircle, ChevronDown, Trophy, Users, Zap, Compass, Play
} from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';

export function Home({ setActivePage, onOpenAuth }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const featureCards = [
    {
      id: 'round1',
      title: '1. AI Resume Analysis',
      desc: 'Upload PDF or DOCX resumes. AI extracts programming languages, frameworks, tools, and experience for tailored verification.',
      icon: FileCheck,
      color: 'from-blue-500 to-cyan-500',
      action: 'Upload & Parse'
    },
    {
      id: 'round1',
      title: '2. Technical MCQ Assessment',
      desc: '10 dynamically generated multiple-choice questions strictly from your resume skills with timer and deep explanations.',
      icon: Trophy,
      color: 'from-blue-600 to-indigo-600',
      action: 'Practice MCQs'
    },
    {
      id: 'round2',
      title: '3. Programming & DSA Challenges',
      desc: 'Multi-language code execution editor (Python, JS, C++, Java, C) with test suites, time & space complexity ratings.',
      icon: Code2,
      color: 'from-indigo-600 to-purple-600',
      action: 'Open Code Editor'
    },
    {
      id: 'round3',
      title: '4. Problem-Solving Assessment',
      desc: 'Analytical thinking, system scenarios, and algorithm design puzzles with text and optional speech voice responses.',
      icon: Brain,
      color: 'from-purple-600 to-pink-600',
      action: 'Solve Scenarios'
    },
    {
      id: 'companies',
      title: '5. AI Company Recommendations',
      desc: 'Categorizes target employers into Ready to Apply, Almost Ready, and Skill Development Required with skill gap analysis.',
      icon: Building2,
      color: 'from-emerald-600 to-teal-600',
      action: 'View Matches'
    },
    {
      id: 'company-prep',
      title: '6. Company-Specific Prep',
      desc: 'Deep-dive into Google, Microsoft, Amazon, TCS, Infosys, and Accenture interview stages, past questions, and HR tips.',
      icon: Target,
      color: 'from-amber-500 to-orange-600',
      action: 'Target a Company'
    },
    {
      id: 'mock-interview',
      title: '7. AI Mock Interviews',
      desc: 'Voice & text conversational AI interviewer that asks smart follow-ups, evaluates responses, and provides comprehensive feedback.',
      icon: Bot,
      color: 'from-fuchsia-600 to-rose-600',
      action: 'Start Mock Voice'
    },
    {
      id: 'roadmap',
      title: '8. Personalized Learning Roadmap',
      desc: 'Dynamic day-by-day study roadmap addressing your exact weak areas with curated docs, videos, and practice problems.',
      icon: Compass,
      color: 'from-blue-700 to-violet-700',
      action: 'View Roadmap'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload or Select Resume',
      desc: 'Our parser extracts technical skills, projects, and languages without manual typing.'
    },
    {
      step: '02',
      title: 'Take 3 Assessment Rounds',
      desc: 'Complete Resume MCQs, Live Coding & DSA, and Analytical Problem-Solving with instant scoring.'
    },
    {
      step: '03',
      title: 'Get AI Readiness & Company Match',
      desc: 'Receive your 100-point Interview Readiness score and matched company tiers.'
    },
    {
      step: '04',
      title: 'Practice & Simulate Interviews',
      desc: 'Drill company-specific past questions and conduct live AI voice mock interviews.'
    }
  ];

  const sampleTestimonials = [
    {
      name: 'Rohan Deshmukh',
      role: 'SDE-1 at Amazon',
      tag: 'Sample Candidate Testimonial',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80',
      comment: 'The Amazon-specific preparation round and 16 Leadership Principles practice with STAR method answers helped me clear the virtual onsite loop!'
    },
    {
      name: 'Ananya Roy',
      role: 'Specialist Programmer at Infosys',
      tag: 'Sample Candidate Testimonial',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
      comment: 'InterviewMate pinpointed that my Dynamic Programming was weak. The 7-day personalized study roadmap bridged the gap right before HackWithInfy.'
    },
    {
      name: 'Vikram Joshi',
      role: 'Frontend Engineer at Startup',
      tag: 'Sample Candidate Testimonial',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=128&q=80',
      comment: 'The AI Voice Mock Interview felt shockingly realistic. Hearing natural speech questions and speaking my answers aloud cured my interview anxiety.'
    }
  ];

  const faqs = [
    {
      q: 'How does InterviewMate generate questions strictly from my resume?',
      a: 'Our resume parsing engine analyzes your Skills, Projects, and Experience sections, extracting verified technical keywords (e.g. React, Python, Docker). Round 1 MCQs are strictly matched against those identified competencies so you are assessed only on relevant topics.'
    },
    {
      q: 'Which programming languages are supported in the Round 2 coding assessment?',
      a: 'The live coding environment supports Python, JavaScript, C++, Java, and C with comprehensive unit test suites, execution timers, and automated Big-O time and space complexity evaluations.'
    },
    {
      q: 'How does the AI Mock Interview work with voice?',
      a: 'Using the browser Web Speech API, our AI interviewer speaks interview questions aloud. You can speak your answers naturally using your microphone, and our AI transcribes your speech, evaluates technical depth, asks follow-up questions, and scores your clarity.'
    },
    {
      q: 'Are the company recommendations guaranteed job offers?',
      a: 'No. Recommendations are based on your skill match percentage and assessment scores compared against verified public hiring standards. They serve as an educational readiness benchmark and do not guarantee employment.'
    },
    {
      q: 'Can freshers and experienced professionals both use InterviewMate?',
      a: 'Yes! Whether you are preparing for campus placements (TCS NQT, Infosys DSE, Capgemini) or Tier-1 product company loops (Google, Microsoft, Amazon), the platform adjusts difficulty and role expectations accordingly.'
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow ambient backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Prepare Smarter. Perform Better. Get Hired.</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.15]">
          Your AI-Powered Personal <br />
          <span className="gradient-text">Interview Coach</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Analyze your skills, practice real interview questions, discover your dream companies, and get interview-ready with AI.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActivePage('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('features-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-sm border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all shadow-sm"
          >
            Explore Features
          </button>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Simulated Readiness Gauge
              </span>
              <ScoreGauge score={82} maxScore={100} size={150} />
            </div>

            <div className="md:col-span-2 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Candidate Assessment Journey
                  </h3>
                  <p className="text-xs text-slate-500">Alex Morgan • Full Stack Target Role</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Ready to Apply
                </span>
              </div>

              {/* Progress bars preview */}
              <div className="space-y-2 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Round 1: Resume Technical MCQs</span>
                    <span className="font-bold text-blue-600">8 / 10 (80%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Round 2: Coding & DSA (Two Sum, Valid Parentheses)</span>
                    <span className="font-bold text-indigo-600">8.5 / 10 (85%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Round 3: Problem Solving & System Logic</span>
                    <span className="font-bold text-purple-600">8.0 / 10 (80%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Top Skill: React & TypeScript
                </span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Target Match: Google, Microsoft, TCS Digital
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM STATISTICS (DEMO FIGURES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-indigo-900/10 border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Platform Benchmark Statistics (Identified Demo Figures)
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">94.2%</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Candidate Placement Rate*</p>
              <span className="text-[10px] text-slate-400 italic">(Sample benchmark)</span>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">1,250+</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Verified Interview Questions</p>
              <span className="text-[10px] text-slate-400 italic">(Top tech companies)</span>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">18,500+</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">AI Mock Interviews Run</p>
              <span className="text-[10px] text-slate-400 italic">(Speech & text sessions)</span>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">45+ min</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Avg. Preparation per Day</p>
              <span className="text-[10px] text-slate-400 italic">(Targeted study roadmap)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 8 FEATURE CARDS */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            Comprehensive Platform Features
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to Ace Technical Interviews
          </p>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            From resume analysis to live code evaluation and interactive voice mock interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActivePage(feat.id)}
                    className="w-full text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center justify-between group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{feat.action}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2">
            The Candidate Journey
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            How InterviewMate Works
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div key={i} className="relative p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="text-4xl font-black text-blue-600/20 dark:text-blue-400/20 block mb-2 font-mono">
                {st.step}
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Built for Modern Tech Hiring
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Stop Guessing What Interviewers Will Ask
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard interview prep platforms give generic problem sets. InterviewMate adapts dynamically to your real resume, tests your core language fundamentals, and aligns with company-specific interview patterns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict Resume-Skill MCQ Generator</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-language live code execution</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real Web Speech Voice Mock Interviews</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3-Tier Company Match & Gap Analysis</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setActivePage('dashboard')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                <span>Launch Your Candidate Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Sample Candidate Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Loved by Students & Software Engineers
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            *Clear disclaimer: Representative sample testimonials demonstrating candidate experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTestimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            Got Questions?
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Start Your Technical Preparation Journey Today
          </h2>
          <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto">
            Upload your resume, pass the 3 assessment rounds, and unlock customized company prep for your dream career.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-8 py-3 rounded-xl bg-white text-blue-600 font-extrabold text-xs shadow-lg hover:bg-blue-50 transition-all"
            >
              Go to Candidate Dashboard
            </button>
            <button
              onClick={() => setActivePage('mock-interview')}
              className="px-8 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-sm transition-all"
            >
              Try AI Mock Interview
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
