import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { generateMCQsForCandidate } from '../utils/mcqGenerator';

const AssessmentContext = createContext();

export function AssessmentProvider({ children }) {
  // Pre-seed with a high quality active resume and completed initial assessment
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('interviewmate_resume');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const defaultSample = SAMPLE_RESUMES[0];
    return {
      fileName: 'Alex_Morgan_Resume_2024.pdf',
      fileSize: '142.4 KB',
      uploadedAt: 'Today, 10:30 AM',
      rawText: defaultSample.rawText,
      candidateName: defaultSample.title.split(' ')[0] + ' Morgan',
      targetRole: defaultSample.targetRole,
      verifiedSkills: [...defaultSample.skills],
      programmingLanguages: [...defaultSample.programmingLanguages],
      frameworks: [...defaultSample.frameworks],
      tools: [...defaultSample.tools],
      projects: [...defaultSample.projects],
      education: defaultSample.education,
      status: 'analyzed'
    };
  });

  // Round 1 state
  const [round1, setRound1] = useState(() => {
    const saved = localStorage.getItem('interviewmate_round1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      completed: true,
      score: 8,
      maxScore: 10,
      percentage: 80,
      totalQuestions: 10,
      correctCount: 8,
      incorrectCount: 2,
      timeTaken: '06:45',
      skillPerformance: {
        'React': { score: 3, total: 3, percentage: 100 },
        'JavaScript': { score: 2, total: 3, percentage: 67 },
        'TypeScript': { score: 2, total: 2, percentage: 100 },
        'Node.js': { score: 1, total: 2, percentage: 50 }
      },
      questions: generateMCQsForCandidate(SAMPLE_RESUMES[0].skills)
    };
  });

  // Round 2 state (Programming & DSA)
  const [round2, setRound2] = useState(() => {
    const saved = localStorage.getItem('interviewmate_round2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      completed: true,
      score: 8.5,
      maxScore: 10,
      percentage: 85,
      fundamentalsScore: 4,
      fundamentalsMax: 4,
      codingScore: 4.5,
      codingMax: 6,
      passedProblems: ['two-sum', 'valid-parentheses'],
      codeQualityScore: 'A (Clean, Modular)',
      timeComplexityEfficiency: '92%',
      spaceComplexityEfficiency: '88%'
    };
  });

  // Round 3 state (Problem Solving & Logical Thinking)
  const [round3, setRound3] = useState(() => {
    const saved = localStorage.getItem('interviewmate_round3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      completed: true,
      score: 8.0,
      maxScore: 10,
      percentage: 80,
      analyticalScore: 8.5,
      logicalScore: 8.0,
      creativityScore: 7.5,
      explanationQuality: 'High clarity with structured breakdown',
      responses: {}
    };
  });

  // Selected company for Round 5 prep
  const [selectedCompanyId, setSelectedCompanyId] = useState(() => {
    return localStorage.getItem('interviewmate_company_id') || 'google';
  });

  // Learning Roadmap progress
  const [roadmapCompletedTasks, setRoadmapCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('interviewmate_roadmap_tasks');
    return saved ? JSON.parse(saved) : ['day-1', 'day-2'];
  });

  // Save to localStorage on change
  useEffect(() => {
    if (resumeData) localStorage.setItem('interviewmate_resume', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    if (round1) localStorage.setItem('interviewmate_round1', JSON.stringify(round1));
  }, [round1]);

  useEffect(() => {
    if (round2) localStorage.setItem('interviewmate_round2', JSON.stringify(round2));
  }, [round2]);

  useEffect(() => {
    if (round3) localStorage.setItem('interviewmate_round3', JSON.stringify(round3));
  }, [round3]);

  useEffect(() => {
    if (selectedCompanyId) localStorage.setItem('interviewmate_company_id', selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    localStorage.setItem('interviewmate_roadmap_tasks', JSON.stringify(roadmapCompletedTasks));
  }, [roadmapCompletedTasks]);

  // Overall readiness calculation out of 100
  // Formula: Round 1 (30%) + Round 2 (45%) + Round 3 (25%)
  const r1Score = round1?.completed ? (round1.score / round1.maxScore) * 30 : 0;
  const r2Score = round2?.completed ? (round2.score / round2.maxScore) * 45 : 0;
  const r3Score = round3?.completed ? (round3.score / round3.maxScore) * 25 : 0;
  const overallReadinessScore = Math.round(r1Score + r2Score + r3Score);

  // Strong & Weak skills identification
  const strongSkills = ['React', 'TypeScript', 'Data Structures (Arrays/Stacks)', 'Object-Oriented Design', 'REST API Architecture'];
  const weakSkills = ['Dynamic Programming', 'Graph Theory (BFS/DFS)', 'System Scalability / Sharding', 'Concurrency Locks'];

  const setSampleResume = (sampleId) => {
    const sample = SAMPLE_RESUMES.find(s => s.id === sampleId) || SAMPLE_RESUMES[0];
    const newResume = {
      fileName: `${sample.title.replace(/\s+/g, '_')}_Resume.pdf`,
      fileSize: '168.2 KB',
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
    setResumeData(newResume);
    // Regenerate Round 1 MCQs for this sample
    const newMCQs = generateMCQsForCandidate(sample.skills);
    setRound1(prev => ({
      ...prev,
      questions: newMCQs,
      completed: false,
      score: 0
    }));
  };

  const updateVerifiedSkills = (skills) => {
    setResumeData(prev => ({
      ...prev,
      verifiedSkills: skills
    }));
    // Regenerate MCQs
    const updatedMCQs = generateMCQsForCandidate(skills);
    setRound1(prev => ({
      ...prev,
      questions: updatedMCQs,
      completed: false,
      score: 0
    }));
  };

  const toggleRoadmapTask = (taskId) => {
    setRoadmapCompletedTasks(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  return (
    <AssessmentContext.Provider value={{
      resumeData,
      setResumeData,
      setSampleResume,
      updateVerifiedSkills,
      round1,
      setRound1,
      round2,
      setRound2,
      round3,
      setRound3,
      overallReadinessScore,
      strongSkills,
      weakSkills,
      selectedCompanyId,
      setSelectedCompanyId,
      roadmapCompletedTasks,
      toggleRoadmapTask
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) throw new Error('useAssessment must be used within an AssessmentProvider');
  return context;
}
