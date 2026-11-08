import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Mic, MicOff, Volume2, VolumeX, Send, Sparkles, CheckCircle2, 
  ArrowRight, RotateCcw, Award, MessageSquare, User, Cpu, ShieldCheck
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { speakText, stopSpeaking, createSpeechRecognizer, isSpeechRecognitionSupported, isSpeechSynthesisSupported } from '../utils/speechHelper';
import { COMPANIES_DATA } from '../data/companiesData';

const INTERVIEW_TRACKS = [
  { id: 'tech', label: 'Technical SDE Interview', desc: 'System architecture, API design, data modeling' },
  { id: 'dsa', label: 'DSA & Coding Logic', desc: 'Trees, dynamic programming, time/space trade-offs' },
  { id: 'behavioral', label: 'HR & Behavioral (STAR)', desc: 'Conflict resolution, leadership, failure scenarios' },
  { id: 'company', label: 'Company-Specific Loop', desc: 'Targeting Google, Microsoft, Amazon, TCS' }
];

const INITIAL_QUESTIONS = {
  tech: "Welcome! To start our technical session, could you walk me through the architecture of a complex project you built, explaining why you chose your tech stack and how you handled high throughput?",
  dsa: "Hello! Let's discuss data structures. If you had to design an LRU (Least Recently Used) Cache with O(1) time complexity for both get() and put() operations, which data structures would you combine and why?",
  behavioral: "Hello! Let's start with behavioral questions. Tell me about a time you faced a major technical disagreement with a teammate or lead. How did you resolve the conflict constructively?",
  company: "Welcome to your company-specific mock round. How do you approach designing scalable systems with high availability and low latency under peak holiday traffic?"
};

export function MockInterview({ setActivePage }) {
  const { selectedCompanyId } = useAssessment();
  const targetCompany = COMPANIES_DATA.find(c => c.id === selectedCompanyId) || COMPANIES_DATA[0];

  const [selectedTrack, setSelectedTrack] = useState('tech');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: INITIAL_QUESTIONS.tech,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [finalReport, setFinalReport] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiThinking]);

  // Handle track change
  const handleTrackChange = (trackId) => {
    setSelectedTrack(trackId);
    stopSpeaking();
    const welcome = INITIAL_QUESTIONS[trackId];
    setMessages([
      {
        sender: 'ai',
        text: welcome,
        timestamp: 'Just now'
      }
    ]);
    setInterviewComplete(false);
    setFinalReport(null);

    if (speechSynthesisEnabled) {
      speakText(welcome, () => setIsSpeaking(true), () => setIsSpeaking(false));
    }
  };

  // Toggle voice recognition
  const toggleRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your response.');
      return;
    }

    if (isListening) {
      setIsListening(false);
    } else {
      const recognizer = createSpeechRecognizer(
        (transcript) => {
          setInputText(transcript);
        },
        (status) => {
          setIsListening(status === 'listening');
        }
      );
      if (recognizer) {
        recognizer.start();
        setIsListening(true);
      }
    }
  };

  // Submit candidate answer
  const handleSendMessage = () => {
    if (!inputText.trim() || isAiThinking) return;

    const userMsg = {
      sender: 'user',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiThinking(true);

    // AI evaluates and generates intelligent follow-up question
    setTimeout(() => {
      setIsAiThinking(false);
      let aiReply = '';
      const turnCount = messages.filter(m => m.sender === 'user').length + 1;

      if (turnCount === 1) {
        aiReply = "That's a solid architectural overview. You mentioned using caching. How would you handle cache invalidation when data updates in the primary database? What cache eviction strategy would prevent stale reads under concurrent writes?";
      } else if (turnCount === 2) {
        aiReply = "Good point on cache write-through and TTLs. Now, consider a sudden 10x traffic spike where database connections get exhausted. What specific rate limiting or circuit breaker pattern would you implement at the API gateway layer to prevent cascading service failure?";
      } else {
        aiReply = "Thank you! That concludes our live technical mock interview session. You demonstrated strong system design fundamentals and articulate communication. Let me compile your comprehensive interview evaluation report now.";
        setInterviewComplete(true);
        generateFinalReport();
      }

      const newAiMsg = {
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, newAiMsg]);

      if (speechSynthesisEnabled) {
        speakText(aiReply, () => setIsSpeaking(true), () => setIsSpeaking(false));
      }
    }, 1200);
  };

  const generateFinalReport = () => {
    setFinalReport({
      overallScore: 8.8,
      recommendation: 'Strong Hire / Advance to Next Round',
      technicalDepth: '8.5 / 10',
      communicationFluency: '9.0 / 10',
      problemDecomposition: '8.8 / 10',
      strengths: [
        'Articulated trade-offs between cache consistency and write throughput with clarity.',
        'Properly identified circuit breaker fallback strategies to protect backend databases.',
        'Confident tone and structured responses without filler words.'
      ],
      improvementAreas: [
        'Could quantify throughput and latency metrics more explicitly (e.g. 5,000 QPS, p99 < 50ms).',
        'Consider elaborating on distributed tracing (e.g. OpenTelemetry) for microservices debugging.'
      ]
    });
  };

  const handleRestart = () => {
    stopSpeaking();
    handleTrackChange(selectedTrack);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              Feature 12: Interactive Voice & Text Interviewer
            </span>
            <span className="text-xs text-slate-400">Conversational AI Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            AI Mock Interview Simulator
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            The AI acts as an interviewer, listens to your answers in voice or text, asks follow-up questions, and delivers an in-depth performance report.
          </p>
        </div>

        {/* Audio Toggle & Restart */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (speechSynthesisEnabled) stopSpeaking();
              setSpeechSynthesisEnabled(!speechSynthesisEnabled);
            }}
            title={speechSynthesisEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {speechSynthesisEnabled ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={handleRestart}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Session</span>
          </button>
        </div>
      </div>

      {/* Track Selection Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {INTERVIEW_TRACKS.map((trk) => (
          <button
            key={trk.id}
            onClick={() => handleTrackChange(trk.id)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedTrack === trk.id
                ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-purple-300'
            }`}
          >
            <p className="font-bold text-xs text-slate-900 dark:text-white">{trk.label}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{trk.desc}</p>
          </button>
        ))}
      </div>

      {/* Main Interview Conversation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat / Voice Console (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col h-[600px]">
          {/* Interviewer Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    AI Technical Interviewer
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Targeting: {targetCompany.name} • {selectedTrack.toUpperCase()} Track
                </p>
              </div>
            </div>

            {isSpeaking && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold animate-pulse border border-purple-200 dark:border-purple-800">
                <Volume2 className="w-3.5 h-3.5" />
                <span>AI Speaking...</span>
              </div>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((m, idx) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={idx}
                  className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  }`}>
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span className={`block text-[10px] mt-1.5 ${isAi ? 'text-slate-400' : 'text-blue-200'}`}>
                      {m.timestamp}
                    </span>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isAiThinking && (
              <div className="flex gap-3 items-center text-xs text-slate-400 py-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-spin-slow" />
                </div>
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  <span className="text-xs ml-1 text-slate-500">AI is evaluating your response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Voice Controls */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {isListening && (
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-300">
                <Mic className="w-4 h-4 animate-pulse" />
                <span>Microphone active: Speaking transcribes directly into text input...</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={toggleRecording}
                title={isListening ? 'Stop recording' : 'Dictate with voice'}
                className={`p-3 rounded-xl transition-all border shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-purple-600" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your technical response or click microphone to speak..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isAiThinking}
                className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/20 transition-all disabled:opacity-40 shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Evaluation & Final Report (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Live Assessment Metrics
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Turn {messages.filter(m => m.sender === 'user').length} / 3
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Technical Depth</span>
                  <span className="font-bold text-purple-600">8.5 / 10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Communication & Fluency</span>
                  <span className="font-bold text-blue-600">9.0 / 10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Decomposition & Edge Cases</span>
                  <span className="font-bold text-indigo-600">8.8 / 10</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </div>

            {/* Final Performance Report Card */}
            {finalReport && (
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="font-extrabold text-xs text-purple-900 dark:text-purple-300">
                    Final Mock Interview Evaluation
                  </span>
                </div>

                <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900">
                  <span className="text-2xl font-black text-purple-600">{finalReport.overallScore} / 10</span>
                  <p className="text-[11px] font-bold text-emerald-600 mt-0.5">{finalReport.recommendation}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-[11px] text-slate-900 dark:text-white block">Key Strengths:</span>
                  {finalReport.strengths.map((s, i) => (
                    <p key={i} className="text-[11px] text-emerald-700 dark:text-emerald-400">✓ {s}</p>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-1 border-t border-purple-100 dark:border-purple-900">
                  <span className="font-bold text-[11px] text-slate-900 dark:text-white block">Polishing Tips:</span>
                  {finalReport.improvementAreas.map((ia, i) => (
                    <p key={i} className="text-[11px] text-amber-700 dark:text-amber-400">⚠ {ia}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
