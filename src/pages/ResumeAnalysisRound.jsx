import React, { useState, useEffect } from 'react';
import { 
  FileText, Upload, Sparkles, CheckCircle, AlertCircle, Clock, 
  ChevronLeft, ChevronRight, Check, X, ArrowRight, RotateCcw, 
  HelpCircle, Trophy, BarChart3, Tag, Plus, Trash2, ShieldAlert
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { parseUploadedFile } from '../utils/resumeParser';
import { generateMCQsForCandidate } from '../utils/mcqGenerator';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

export function ResumeAnalysisRound({ setActivePage }) {
  const { resumeData, setResumeData, round1, setRound1 } = useAssessment();

  // Workflow steps: 'upload' | 'verify' | 'quiz' | 'results'
  const [currentStep, setCurrentStep] = useState(round1.completed ? 'results' : 'verify');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Assessment Quiz State
  const [questions, setQuestions] = useState(round1.questions || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [index]: selectedOptionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(false);

  // Sync questions if round1 changes
  useEffect(() => {
    if (round1.questions && round1.questions.length > 0) {
      setQuestions(round1.questions);
    }
  }, [round1.questions]);

  // Countdown timer effect
  useEffect(() => {
    let timer = null;
    if (timerActive && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeftSeconds]);

  // Handle file drop/upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    try {
      const parsed = await parseUploadedFile(file);
      const updatedResume = {
        fileName: parsed.fileName,
        fileSize: parsed.fileSize,
        uploadedAt: 'Just now',
        rawText: parsed.rawText,
        candidateName: parsed.parsedData.candidateName,
        targetRole: 'Software Engineer',
        verifiedSkills: parsed.parsedData.allSkills,
        programmingLanguages: parsed.parsedData.programmingLanguages,
        frameworks: parsed.parsedData.frameworks,
        tools: parsed.parsedData.tools,
        projects: parsed.parsedData.projects,
        education: parsed.parsedData.education,
        status: 'analyzed'
      };
      setResumeData(updatedResume);

      // Generate 10 MCQs specifically from these extracted skills
      const dynamicMCQs = generateMCQsForCandidate(parsed.parsedData.allSkills);
      setQuestions(dynamicMCQs);
      setRound1(prev => ({ ...prev, questions: dynamicMCQs, completed: false }));

      setCurrentStep('verify');
    } catch (err) {
      alert('Failed to parse resume: ' + err.message);
    } finally {
      setUploadLoading(false);
    }
  };

  // Switch to pre-loaded sample resume
  const handleSelectSample = (sampleId) => {
    const sample = SAMPLE_RESUMES.find(s => s.id === sampleId);
    if (!sample) return;
    const updated = {
      fileName: `${sample.title.replace(/\s+/g, '_')}_Resume.pdf`,
      fileSize: '148.5 KB',
      uploadedAt: 'Just now',
      rawText: sample.rawText,
      candidateName: sample.title.split(' ')[0] + ' Candidate',
      targetRole: sample.targetRole,
      verifiedSkills: [...sample.skills],
      programmingLanguages: [...sample.programmingLanguages],
      frameworks: [...sample.frameworks],
      tools: [...sample.tools],
      projects: [...sample.projects],
      education: sample.education,
      status: 'analyzed'
    };
    setResumeData(updated);

    const dynamicMCQs = generateMCQsForCandidate(sample.skills);
    setQuestions(dynamicMCQs);
    setRound1(prev => ({ ...prev, questions: dynamicMCQs, completed: false }));
    setCurrentStep('verify');
  };

  // Add custom skill to verified skills
  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    const skill = newSkillInput.trim();
    if (!resumeData.verifiedSkills.includes(skill)) {
      const updatedSkills = [...resumeData.verifiedSkills, skill];
      setResumeData(prev => ({ ...prev, verifiedSkills: updatedSkills }));
      const newMCQs = generateMCQsForCandidate(updatedSkills);
      setQuestions(newMCQs);
    }
    setNewSkillInput('');
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = resumeData.verifiedSkills.filter(s => s !== skillToRemove);
    setResumeData(prev => ({ ...prev, verifiedSkills: updatedSkills }));
    const newMCQs = generateMCQsForCandidate(updatedSkills);
    setQuestions(newMCQs);
  };

  // Start Assessment
  const handleStartQuiz = () => {
    const generated = generateMCQsForCandidate(resumeData?.verifiedSkills || []);
    setQuestions(generated);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setTimeLeftSeconds(600);
    setTimerActive(true);
    setCurrentStep('quiz');
  };

  // Answer selection
  const handleSelectAnswer = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Toggle flag
  const toggleFlag = (idx) => {
    setFlaggedQuestions(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Submit and evaluate
  const handleSubmitAssessment = () => {
    setTimerActive(false);

    let correct = 0;
    const skillStats = {};

    questions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctAnswer;
      if (isCorrect) correct += 1;

      if (!skillStats[q.skill]) {
        skillStats[q.skill] = { score: 0, total: 0 };
      }
      skillStats[q.skill].total += 1;
      if (isCorrect) skillStats[q.skill].score += 1;
    });

    // Compute percentages
    Object.keys(skillStats).forEach(sk => {
      skillStats[sk].percentage = Math.round((skillStats[sk].score / skillStats[sk].total) * 100);
    });

    const timeSpentSeconds = 600 - timeLeftSeconds;
    const mins = Math.floor(timeSpentSeconds / 60);
    const secs = timeSpentSeconds % 60;
    const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    const scoreResult = {
      completed: true,
      score: correct,
      maxScore: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
      totalQuestions: questions.length,
      correctCount: correct,
      incorrectCount: questions.length - correct,
      timeTaken: formattedTime,
      skillPerformance: skillStats,
      questions
    };

    setRound1(scoreResult);
    setCurrentStep('results');
  };

  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex] || questions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Round 1 of 3
            </span>
            <span className="text-xs text-slate-400">Skills Verification & MCQ Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            AI Resume Analysis & Technical MCQs
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Questions are generated strictly from the skills extracted from your resume. No irrelevant subjects.
          </p>
        </div>

        {/* Workflow breadcrumbs */}
        <div className="flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => setCurrentStep('upload')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentStep === 'upload' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            1. Upload
          </button>
          <span className="text-slate-300">&rarr;</span>
          <button
            onClick={() => setCurrentStep('verify')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentStep === 'verify' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            2. Verify Skills
          </button>
          <span className="text-slate-300">&rarr;</span>
          <button
            onClick={() => setCurrentStep('quiz')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentStep === 'quiz' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            3. 10 MCQs
          </button>
          <span className="text-slate-300">&rarr;</span>
          <button
            onClick={() => setCurrentStep('results')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              currentStep === 'results' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            4. Score Dashboard
          </button>
        </div>
      </div>

      {/* STEP 1: RESUME UPLOAD */}
      {currentStep === 'upload' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-blue-300 dark:border-blue-900/60 text-center relative overflow-hidden">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt,.md"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {uploadLoading ? 'Extracting Resume Text & Skills...' : 'Upload Your Candidate Resume'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
              Supports PDF, DOCX, DOC, and TXT files. Our AI engine extracts technical skills, frameworks, languages, and projects.
            </p>
            <span className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/25">
              Browse Files or Drag & Drop Here
            </span>
          </div>

          {/* Quick Sample Selector */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-3">
              Or pick an instant pre-loaded sample resume:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample.id)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left transition-all"
                >
                  <p className="font-bold text-xs text-slate-900 dark:text-white">{sample.title}</p>
                  <p className="text-[11px] text-slate-500">{sample.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {sample.skills.slice(0, 4).map((s, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SKILLS VERIFICATION */}
      {currentStep === 'verify' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Step 2: AI Resume Skill Extraction & Candidate Verification
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Extracted from: <strong>{resumeData?.fileName}</strong> • Candidate: {resumeData?.candidateName}
                </p>
              </div>

              <button
                onClick={() => setCurrentStep('upload')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Upload different file
              </button>
            </div>

            {/* Extracted Categories */}
            <div className="space-y-4">
              {/* Programming Languages */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Programming Languages
                </span>
                <div className="flex flex-wrap gap-2">
                  {(resumeData?.programmingLanguages || []).map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900 flex items-center gap-1.5"
                    >
                      <span>{lang}</span>
                      <button onClick={() => handleRemoveSkill(lang)} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks & Libraries */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Frameworks & Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {(resumeData?.frameworks || []).map((fw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-900 flex items-center gap-1.5"
                    >
                      <span>{fw}</span>
                      <button onClick={() => handleRemoveSkill(fw)} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Databases */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Databases, Cloud & Tools
                </span>
                <div className="flex flex-wrap gap-2">
                  {(resumeData?.tools || []).map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 flex items-center gap-1.5"
                    >
                      <span>{tool}</span>
                      <button onClick={() => handleRemoveSkill(tool)} className="hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Custom Skill input */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Add another technical skill or topic:
                </span>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="e.g. Docker, GraphQL, Redis, C++"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Crucial Requirement Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Strict Skill Alignment Guarantee:</strong>
                <p className="mt-0.5">
                  The 10 MCQs in Round 1 will be drawn exclusively from the {resumeData?.verifiedSkills?.length || 0} skills verified above. Once you confirm, questions on unrelated topics will be excluded.
                </p>
              </div>
            </div>

            {/* Launch button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartQuiz}
                className="px-8 py-3.5 rounded-2xl font-bold text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 flex items-center gap-2 group hover:opacity-95 transition-all"
              >
                <span>Generate 10 MCQs & Start Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: 10 MCQ ASSESSMENT INTERFACE */}
      {currentStep === 'quiz' && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Quiz Top Action Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {currentQuestion.skill}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {currentQuestion.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Countdown Timer */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>

              <button
                onClick={() => toggleFlag(currentIndex)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  flaggedQuestions.includes(currentIndex)
                    ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                }`}
              >
                {flaggedQuestions.includes(currentIndex) ? '★ Flagged' : '☆ Flag for Review'}
              </button>
            </div>
          </div>

          {/* Main Quiz Layout: Question Card + Navigation Palette */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Card (Col 3) */}
            <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  Technical Question {currentIndex + 1}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* 4 Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        isSelected ? 'text-blue-900 dark:text-blue-100 font-semibold' : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next / Submit Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex(prev => prev + 1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitAssessment}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:opacity-95 transition-all"
                    >
                      Submit Assessment
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Palette Sidebar (Col 1) */}
            <div className="lg:col-span-1 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Question Palette
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, idx) => {
                  const isCurrent = currentIndex === idx;
                  const isAnswered = idx in userAnswers;
                  const isFlagged = flaggedQuestions.includes(idx);

                  let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                  if (isAnswered) bgClass = 'bg-blue-600 text-white font-bold';
                  if (isFlagged) bgClass = 'bg-amber-500 text-white font-bold';
                  if (isCurrent) bgClass += ' ring-2 ring-purple-500 ring-offset-2';

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-xl text-xs font-medium transition-all ${bgClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-600"></div>
                  <span>Answered ({Object.keys(userAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700"></div>
                  <span>Unanswered ({questions.length - Object.keys(userAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500"></div>
                  <span>Flagged ({flaggedQuestions.length})</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmitAssessment}
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  Finish & View Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: EVALUATION DASHBOARD & EXPLANATIONS */}
      {currentStep === 'results' && round1.completed && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Score Summary Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-indigo-900/10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Round 1 Evaluation Complete
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Score: {round1.score} / {round1.maxScore} ({round1.percentage}%)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Completed in {round1.timeTaken} • {round1.correctCount} Correct answers • {round1.incorrectCount} Incorrect
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Round 1</span>
              </button>

              <button
                onClick={() => setActivePage('round2')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2 group"
              >
                <span>Proceed to Round 2: Coding & DSA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Skill-Wise Breakdown Cards */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Skill-Wise Accuracy Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(round1.skillPerformance || {}).map(([skill, stat], idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{skill}</span>
                    <span className="text-xs font-bold text-blue-600">{stat.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-1.5">
                    <div
                      className={`h-full rounded-full ${stat.percentage >= 75 ? 'bg-emerald-500' : stat.percentage >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {stat.score} of {stat.total} questions answered correctly
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Question Explanations List */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Detailed Question Explanations & Insights
            </h3>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.correctAnswer;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20'
                        : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${
                          isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          Q{idx + 1}: {q.question}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                        {q.skill}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono my-2 pl-7">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950">
                        <span className="text-[10px] text-slate-500 block font-sans">Your Answer:</span>
                        <span className={isCorrect ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                          {userAnswers[idx] !== undefined ? q.options[userAnswers[idx]] : 'Unanswered'}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-950">
                        <span className="text-[10px] text-slate-500 block font-sans">Correct Answer:</span>
                        <span className="text-emerald-600 font-semibold">
                          {q.options[q.correctAnswer]}
                        </span>
                      </div>
                    </div>

                    <div className="pl-7 text-xs text-slate-600 dark:text-slate-400 mt-2">
                      <strong className="text-slate-700 dark:text-slate-300">Explanation: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
