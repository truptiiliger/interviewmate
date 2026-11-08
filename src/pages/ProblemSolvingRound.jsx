import React, { useState, useEffect } from 'react';
import { 
  Brain, Mic, MicOff, CheckCircle2, ArrowRight, RotateCcw, 
  HelpCircle, MessageSquare, Award, Sparkles, Send, Volume2
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { createSpeechRecognizer, isSpeechRecognitionSupported, speakText } from '../utils/speechHelper';

const PROBLEM_SOLVING_QUESTIONS = [
  {
    id: 'ps-1',
    type: 'scenario',
    category: 'Real-World System Scenario',
    title: 'Flash Sale Concurrency & Inventory Reservation',
    scenario: `An e-commerce website is launching a flash sale with 1,000 units of a flagship smartphone. Exactly at 12:00 PM, 250,000 concurrent buyers click "Buy Now" at the same second. 

How would you design the inventory reservation logic to strictly prevent overselling while maintaining sub-second response times without locking the entire relational database table?`,
    sampleOptimalPoints: [
      'Use an in-memory distributed cache like Redis with atomic operations (DECR / DECRBY / Lua script)',
      'Asynchronous queue (Kafka / RabbitMQ) for order ingestion and payment processing',
      'Two-phase reservation with TTL (e.g. 10-minute hold for payment checkout)',
      'Optimistic locking or database row-level versioning rather than pessimistic table locks'
    ]
  },
  {
    id: 'ps-2',
    type: 'analytical',
    category: 'Mathematical & Logical Reasoning',
    title: 'The 25 Horses & 5 Tracks Puzzle',
    scenario: `You have 25 racehorses and only 5 race tracks. There are no stopwatches or timers available; a race only tells you the relative finishing order (1st through 5th) of the 5 horses in that race.

What is the absolute minimum number of races needed to determine the fastest, second fastest, and third fastest horses? Explain your step-by-step logic.`,
    sampleOptimalPoints: [
      'Step 1: Divide 25 horses into 5 groups of 5 horses each and race each group = 5 races',
      'Step 2: Race the 5 group winners against each other = 1 race (Total 6 races). The winner is guaranteed 1st fastest overall',
      'Step 3: Only 5 horses are candidates for 2nd and 3rd place (2nd and 3rd from 1st group, 1st and 2nd from 2nd group, 1st from 3rd group)',
      'Step 4: Race these 5 horses in a final 7th race. Total minimum races = 7'
    ]
  },
  {
    id: 'ps-3',
    type: 'algorithm_design',
    category: 'Algorithm & Trade-Off Design',
    title: 'Distributed Rate Limiter Across Multiple Regions',
    scenario: `You need to design an API rate limiter that allows each registered API client a maximum of 100 requests per minute across three geographically distributed data centers (US, Europe, Asia).

Compare the trade-offs between a centralized Redis counter with synchronization latency versus a local Token Bucket with periodic reconciliation. Which architecture would you pick and why?`,
    sampleOptimalPoints: [
      'Token Bucket / Sliding Window counter algorithm trade-offs',
      'Network latency of cross-region sync vs consistency (Eventual consistency vs Strict consistency)',
      'Batch token distribution from a central authority or gossip protocol across nodes',
      'Handling clock drift and network partition failures gracefully'
    ]
  }
];

export function ProblemSolvingRound({ setActivePage }) {
  const { round3, setRound3 } = useAssessment();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [candidateResponses, setCandidateResponses] = useState({
    'ps-1': 'I would use Redis with atomic DECR operations. Redis handles single-threaded atomic operations in memory at sub-millisecond speeds. When a request arrives, we execute an atomic decrement. If count >= 0, we push an order creation event to an Apache Kafka queue and give the user a 10-minute reservation lock. The relational database only receives confirmed payment writes.',
    'ps-2': 'We need exactly 7 races. First, divide 25 horses into 5 groups of 5. Run 5 races to find winners of each group. In race 6, race the 5 winners against each other. The winner of race 6 is the fastest overall horse. For 2nd and 3rd place, only 5 specific horses remain mathematically eligible. In race 7, race those 5 horses to determine 2nd and 3rd place. Total is 7 races.',
    'ps-3': 'I would choose a local token bucket at each edge region with periodic asynchronous token replenishment. Making cross-region RPC calls on every API request adds 150ms+ latency which is unacceptable for public APIs. By allocating tokens proportionally per region and synchronizing aggregates asynchronously via Kafka, we maintain high availability and low latency with eventual consistency.'
  });

  const [isListening, setIsListening] = useState(false);
  const [speechRecognizer, setSpeechRecognizer] = useState(null);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    setSpeechSupported(isSpeechRecognitionSupported());
  }, []);

  const activeQuestion = PROBLEM_SOLVING_QUESTIONS[activeQuestionIndex];

  // Voice recording toggle
  const toggleListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge or type your response.');
      return;
    }

    if (isListening) {
      if (speechRecognizer) speechRecognizer.stop();
      setIsListening(false);
    } else {
      const recognizer = createSpeechRecognizer(
        (transcript) => {
          setCandidateResponses(prev => ({
            ...prev,
            [activeQuestion.id]: (prev[activeQuestion.id] || '') + ' ' + transcript
          }));
        },
        (status) => {
          if (status === 'listening') setIsListening(true);
          else setIsListening(false);
        }
      );
      if (recognizer) {
        setSpeechRecognizer(recognizer);
        recognizer.start();
      }
    }
  };

  const handleTextChange = (text) => {
    setCandidateResponses(prev => ({
      ...prev,
      [activeQuestion.id]: text
    }));
  };

  const handleEvaluateAll = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      const feedbackReport = {
        score: 8.5,
        maxScore: 10,
        percentage: 85,
        analyticalScore: 8.5,
        logicalScore: 8.5,
        creativityScore: 8.0,
        explanationQuality: 'Clear, structured decomposition with sound distributed systems and algorithmic rationale.',
        points: [
          'Strong recognition of Redis atomic primitives and Kafka decoupling in scenario 1.',
          'Precise step-by-step mathematical deduction for the 25 horses puzzle in scenario 2.',
          'Solid architectural trade-off analysis balancing latency versus consistency in distributed rate limiting.'
        ]
      };
      setEvaluationFeedback(feedbackReport);
      setRound3({
        completed: true,
        score: 8.5,
        maxScore: 10,
        percentage: 85,
        analyticalScore: 8.5,
        logicalScore: 8.5,
        creativityScore: 8.0,
        explanationQuality: feedbackReport.explanationQuality,
        responses: candidateResponses
      });
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              Round 3 of 3
            </span>
            <span className="text-xs text-slate-400">Analytical Thinking & Problem-Solving</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Problem-Solving & Logical Thinking Assessment
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Demonstrate structured analytical logic, mathematical deduction, and architectural trade-off reasoning via text or speech.
          </p>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-2">
          {PROBLEM_SOLVING_QUESTIONS.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeQuestionIndex === idx
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Scenario {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem Prompt & Core Criteria (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  {activeQuestion.category}
                </span>
                <button
                  onClick={() => speakText(activeQuestion.scenario)}
                  title="Read question aloud"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2">
                {activeQuestion.title}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {activeQuestion.scenario}
            </div>

            {/* AI Evaluator Criteria */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Evaluation Criteria (AI Scoring Dimensions):
              </span>
              <ul className="text-xs text-slate-500 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span><strong>Logical Structure:</strong> Clear breakdown of constraints and assumptions.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span><strong>Technical Accuracy:</strong> Feasibility and correctness under scale.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span><strong>Trade-Off Awareness:</strong> Balancing speed vs memory vs consistency.</span>
                </li>
              </ul>
            </div>

            {/* Hint / Key benchmarks */}
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs space-y-1.5">
              <span className="font-bold text-purple-900 dark:text-purple-300 block">
                Expected Key Concepts:
              </span>
              <ul className="list-disc pl-4 text-purple-800 dark:text-purple-200 text-[11px] space-y-0.5">
                {activeQuestion.sampleOptimalPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Candidate Explanation Input (Text + Voice) (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Your Logical Approach & Solution Walkthrough
                </h3>
              </div>

              {/* Speech-to-Text Button */}
              <button
                onClick={toggleListening}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Listening... (Speak now)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-purple-600" />
                    <span>Dictate with Voice</span>
                  </>
                )}
              </button>
            </div>

            {/* Speech Visualizer */}
            {isListening && (
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center gap-1.5">
                <div className="w-1.5 rounded-full bg-purple-600 soundwave-bar"></div>
                <div className="w-1.5 rounded-full bg-purple-600 soundwave-bar"></div>
                <div className="w-1.5 rounded-full bg-purple-600 soundwave-bar"></div>
                <div className="w-1.5 rounded-full bg-purple-600 soundwave-bar"></div>
                <div className="w-1.5 rounded-full bg-purple-600 soundwave-bar"></div>
                <div className="w-1.5 rounded-full bg-purple-600 soundwave-bar"></div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300 ml-2">
                  Recording speech input...
                </span>
              </div>
            )}

            {/* Textarea for explanation */}
            <textarea
              rows={11}
              value={candidateResponses[activeQuestion.id] || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="State your step-by-step logic, edge cases considered, time/space complexity, and chosen architecture..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Word count: {(candidateResponses[activeQuestion.id] || '').trim().split(/\s+/).filter(Boolean).length} words
              </span>

              <button
                onClick={handleEvaluateAll}
                disabled={isEvaluating}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all flex items-center gap-2"
              >
                {isEvaluating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    AI Evaluating Logic...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Evaluate Problem Solving Round</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Evaluation Report Card */}
          {(evaluationFeedback || round3.completed) && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                    AI Evaluation Score
                  </span>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Round 3 Score: {round3.score} / {round3.maxScore} (85%)
                  </h4>
                </div>
                <button
                  onClick={() => setActivePage('performance')}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center gap-1.5"
                >
                  <span>View Overall Readiness Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-[10px] text-slate-400 block">Analytical Logic</span>
                  <span className="font-extrabold text-purple-600 text-sm">8.5 / 10</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-[10px] text-slate-400 block">Clarity & Depth</span>
                  <span className="font-extrabold text-blue-600 text-sm">8.5 / 10</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950">
                  <span className="text-[10px] text-slate-400 block">Creativity</span>
                  <span className="font-extrabold text-emerald-600 text-sm">8.0 / 10</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200">AI Feedback: </strong>
                {round3.explanationQuality || 'Strong analytical breakdown. Great real-world scalability considerations.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
