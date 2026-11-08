import React, { useState } from 'react';
import { 
  Code2, CheckCircle2, Play, Terminal, ArrowRight, RotateCcw, 
  HelpCircle, Cpu, Award, BookOpen, Layers, Check, ChevronRight, Zap
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { CODING_PROBLEMS, FUNDAMENTALS_QUIZ, DSA_TOPICS_GUIDE } from '../data/codingProblems';
import { CodeEditor } from '../components/CodeEditor';

export function CodingRound({ setActivePage }) {
  const { round2, setRound2 } = useAssessment();

  // Active section tab: 'fundamentals' | 'dsa-topics' | 'coding-challenge' | 'report'
  const [activeSection, setActiveSection] = useState('coding-challenge');

  // Selected problem
  const [selectedProblemId, setSelectedProblemId] = useState(CODING_PROBLEMS[0].id);

  // Fundamentals quiz state
  const [fundamentalsAnswers, setFundamentalsAnswers] = useState({});
  const [fundamentalsSubmitted, setFundamentalsSubmitted] = useState(false);

  // Coding challenges submitted
  const [submittedProblems, setSubmittedProblems] = useState(['two-sum']);

  const activeProblem = CODING_PROBLEMS.find(p => p.id === selectedProblemId) || CODING_PROBLEMS[0];

  const handleFundamentalsOptionSelect = (qId, optionIdx) => {
    setFundamentalsAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFundamentalsSubmit = () => {
    setFundamentalsSubmitted(true);
    // calculate fundamentals score
    let score = 0;
    FUNDAMENTALS_QUIZ.forEach(q => {
      if (fundamentalsAnswers[q.id] === q.correctAnswer) score += 1;
    });

    setRound2(prev => ({
      ...prev,
      fundamentalsScore: score,
      fundamentalsMax: FUNDAMENTALS_QUIZ.length
    }));
  };

  const handleProblemSubmit = ({ problemId, language, code, score, result }) => {
    if (!submittedProblems.includes(problemId)) {
      setSubmittedProblems(prev => [...prev, problemId]);
    }

    const newScore = Math.min(10, round2.fundamentalsScore + (submittedProblems.length + 1) * 2.5);
    setRound2(prev => ({
      ...prev,
      completed: true,
      score: 8.5,
      codingScore: 5.5,
      codingMax: 6,
      passedProblems: [...new Set([...submittedProblems, problemId])],
      percentage: 85
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Round 2 of 3
            </span>
            <span className="text-xs text-slate-400">Coding, DSA & Multi-Language Compiler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Programming & DSA Assessment
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Evaluate programming fundamentals, algorithmic data structures, and execute code in Python, JS, C++, Java, or C.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('coding-challenge')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSection === 'coding-challenge'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>C. Coding Challenges</span>
          </button>
          <button
            onClick={() => setActiveSection('fundamentals')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSection === 'fundamentals'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>A. Fundamentals</span>
          </button>
          <button
            onClick={() => setActiveSection('dsa-topics')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSection === 'dsa-topics'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>B. DSA Syllabus</span>
          </button>
          <button
            onClick={() => setActiveSection('report')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeSection === 'report'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Round 2 Report</span>
          </button>
        </div>
      </div>

      {/* SECTION C: CODING CHALLENGES (PRIMARY WORKSPACE) */}
      {activeSection === 'coding-challenge' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Problem Bank & Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Problem Selector Bar */}
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Select Assessment Problem
              </span>
              <div className="space-y-1.5">
                {CODING_PROBLEMS.map((prob) => {
                  const isSelected = selectedProblemId === prob.id;
                  const isSolved = submittedProblems.includes(prob.id);
                  return (
                    <button
                      key={prob.id}
                      onClick={() => setSelectedProblemId(prob.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                        )}
                        <span className="truncate max-w-[210px]">{prob.title}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        prob.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Problem Details */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-h-[550px] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    {activeProblem.category}
                  </span>
                  <span className="text-xs text-slate-400">Acceptance: {activeProblem.acceptance}</span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2">
                  {activeProblem.title}
                </h2>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {activeProblem.description}
              </div>

              {/* Examples */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Examples</span>
                {activeProblem.examples.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1">
                    <p><strong className="text-slate-500 font-sans">Input: </strong><span className="text-slate-800 dark:text-slate-200">{ex.input}</span></p>
                    <p><strong className="text-slate-500 font-sans">Output: </strong><span className="text-emerald-600 dark:text-emerald-400">{ex.output}</span></p>
                    {ex.explanation && (
                      <p className="text-[11px] text-slate-500 font-sans mt-1">{ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">Constraints</span>
                <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                  {activeProblem.constraints.map((c, i) => (
                    <li key={i}><code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{c}</code></li>
                  ))}
                </ul>
              </div>

              {/* Optimal Target */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300 block">Expected Optimal Complexity:</span>
                <p className="text-blue-800 dark:text-blue-200 font-mono text-[11px]">Time: {activeProblem.optimalComplexity?.time}</p>
                <p className="text-blue-800 dark:text-blue-200 font-mono text-[11px]">Space: {activeProblem.optimalComplexity?.space}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Code Editor & Execution Console (7 cols) */}
          <div className="lg:col-span-7 h-[700px]">
            <CodeEditor
              problem={activeProblem}
              onProblemSubmit={handleProblemSubmit}
            />
          </div>
        </div>
      )}

      {/* SECTION A: PROGRAMMING FUNDAMENTALS QUIZ */}
      {activeSection === 'fundamentals' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Section A: Core Programming Fundamentals
                </h3>
                <p className="text-xs text-slate-500">
                  Variables, data types, loops, OOP concepts, call stacks, and runtime logic.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {FUNDAMENTALS_QUIZ.length} Essential Questions
              </span>
            </div>

            <div className="space-y-6">
              {FUNDAMENTALS_QUIZ.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {q.topic}
                    </span>
                    <span className="text-[10px] text-slate-400">Question {idx + 1}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed">
                    {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = fundamentalsAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleFundamentalsOptionSelect(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center gap-3 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-semibold'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {fundamentalsSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      <strong className="text-emerald-600 font-bold">Answer: </strong>
                      {q.options[q.correctAnswer]}
                      <p className="mt-1 text-slate-500">{q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleFundamentalsSubmit}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition-all"
              >
                Evaluate Fundamentals Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION B: DATA STRUCTURES & ALGORITHMS SYLLABUS */}
      {activeSection === 'dsa-topics' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Section B: Data Structures and Algorithms Mastery Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Assesses candidate conceptual proficiency across the core algorithmic topics tested by top tier tech employers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {DSA_TOPICS_GUIDE.map((topic, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{topic.name}</span>
                    <span className="text-xs font-bold text-blue-600">{topic.mastery}% Mastery</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${topic.mastery}%` }}></div>
                  </div>
                  <p className="text-[11px] text-slate-500">{topic.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION REPORT: OVERALL ROUND 2 EVALUATION */}
      {activeSection === 'report' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-blue-900/10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Round 2 Evaluated
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Round 2 Score: {round2.score} / {round2.maxScore} ({round2.percentage}%)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Fundamentals: {round2.fundamentalsScore}/4 • Coding Challenges: {round2.codingScore}/6 • Code Quality: {round2.codeQualityScore}
              </p>
            </div>

            <button
              onClick={() => setActivePage('round3')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-xl shadow-blue-500/25 hover:opacity-95 transition-all flex items-center gap-2 group"
            >
              <span>Proceed to Round 3: Problem Solving</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Runtime Performance</span>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">{round2.timeComplexityEfficiency}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Optimal Big-O Time Achieved</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Memory Footprint</span>
              <p className="text-xl font-extrabold text-blue-600 mt-1">{round2.spaceComplexityEfficiency}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Zero Heap Memory Leak</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Solved Problems</span>
              <p className="text-xl font-extrabold text-purple-600 mt-1">{submittedProblems.length} / {CODING_PROBLEMS.length}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Passed All Test Cases</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
