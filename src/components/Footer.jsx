import React from 'react';
import { Sparkles, Globe, Mail, ShieldCheck, Heart, Share2, Compass } from 'lucide-react';

export function Footer({ setActivePage }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Sparkles className="w-4 h-4 fill-white/20" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Interview<span className="text-blue-400">Mate</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              Prepare Smarter. Perform Better. Get Hired. The modern, AI-powered interview assessment and career preparation assistant for students, freshers, and experienced software engineers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors" title="GitHub">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors" title="Professional Network">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="mailto:support@interviewmate.ai" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors" title="Contact Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 1: Assessment Journey */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
              Assessment Rounds
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('round1')} className="hover:text-blue-400 transition-colors">
                  Round 1: Resume MCQ
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('round2')} className="hover:text-blue-400 transition-colors">
                  Round 2: Coding & DSA
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('round3')} className="hover:text-blue-400 transition-colors">
                  Round 3: Problem Solving
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('performance')} className="hover:text-blue-400 transition-colors">
                  Overall Performance Report
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('mock-interview')} className="hover:text-blue-400 transition-colors">
                  Live AI Mock Interview
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Dream Companies */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
              Company Tracks
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('companies')} className="hover:text-blue-400 transition-colors">
                  Google SDE Preparation
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('companies')} className="hover:text-blue-400 transition-colors">
                  Microsoft Interview Loop
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('companies')} className="hover:text-blue-400 transition-colors">
                  Amazon 16 LP Simulator
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('companies')} className="hover:text-blue-400 transition-colors">
                  TCS Digital / Prime
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('companies')} className="hover:text-blue-400 transition-colors">
                  Infosys Specialist Programmer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Tools */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
              Career Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActivePage('resume-improve')} className="hover:text-blue-400 transition-colors">
                  AI Resume Keyword Optimizer
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('resume-improve')} className="hover:text-blue-400 transition-colors">
                  Job Description Matcher
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('roadmap')} className="hover:text-blue-400 transition-colors">
                  Personalized Study Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-blue-400 transition-colors">
                  Candidate Readiness Gauge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              Disclaimer: InterviewMate is an educational assessment platform. Company names and logos are trademarks of their respective holders. Recommendations and mock scores do not guarantee hiring or employment.
            </span>
          </p>
          <p className="shrink-0 flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for tech candidates worldwide. &copy; {new Date().getFullYear()} InterviewMate.
          </p>
        </div>
      </div>
    </footer>
  );
}
