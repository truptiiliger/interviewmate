import React from 'react';
import { 
  Compass, CheckCircle2, Circle, BookOpen, ExternalLink, 
  ArrowRight, Sparkles, Target, Award, Calendar, RotateCcw
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';

const ROADMAP_DAYS = [
  {
    id: 'day-1',
    day: 'Day 1',
    topic: 'Arrays, Two Pointers & Prefix Sums',
    focus: 'Mastering O(N) array traversals, sliding windows, and in-place transformations.',
    practiceProblems: ['Two Sum', 'Container With Most Water', 'Subarray Sum Equals K'],
    resources: [
      { title: 'NeetCode Arrays & Hashing Roadmap', url: 'https://neetcode.io/roadmap' },
      { title: 'GeeksforGeeks Two Pointer Technique', url: 'https://www.geeksforgeeks.org/two-pointers-technique/' }
    ]
  },
  {
    id: 'day-2',
    day: 'Day 2',
    topic: 'Strings & Monotonic Stacks',
    focus: 'Valid parentheses, longest non-repeating substrings, and next greater element patterns.',
    practiceProblems: ['Valid Parentheses', 'Longest Substring Without Repeating Characters', 'Daily Temperatures'],
    resources: [
      { title: 'LeetCode Stack Exploration Card', url: 'https://leetcode.com/explore/learn/card/queue-stack/' }
    ]
  },
  {
    id: 'day-3',
    day: 'Day 3',
    topic: 'Searching & Sorting (Binary Search Mastery)',
    focus: 'Binary search on sorted arrays, search in rotated sorted array, and median of two arrays.',
    practiceProblems: ['Binary Search', 'Search in Rotated Sorted Array', 'Find Peak Element'],
    resources: [
      { title: 'TopCoder Binary Search Tutorial', url: 'https://www.topcoder.com/community/competitive-programming/tutorials/binary-search/' }
    ]
  },
  {
    id: 'day-4',
    day: 'Day 4',
    topic: 'Linked Lists & Fast/Slow Pointers',
    focus: 'Floyd cycle detection, list reversal in K-groups, and merging sorted lists.',
    practiceProblems: ['Reverse Linked List', 'Linked List Cycle II', 'Merge Two Sorted Lists'],
    resources: [
      { title: 'GeeksforGeeks Linked List Guide', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' }
    ]
  },
  {
    id: 'day-5',
    day: 'Day 5',
    topic: 'Binary Trees & Binary Search Trees',
    focus: 'Inorder/Preorder/Postorder traversals, Lowest Common Ancestor (LCA), and Tree Inversion.',
    practiceProblems: ['Invert Binary Tree', 'Lowest Common Ancestor in BST', 'Binary Tree Level Order Traversal'],
    resources: [
      { title: 'MIT OpenCourseWare Tree Lecture', url: 'https://ocw.mit.edu/' }
    ]
  },
  {
    id: 'day-6',
    day: 'Day 6',
    topic: 'Graphs & Breadth-First Search (BFS) / DFS',
    focus: 'Adjacency list representations, cycle detection in directed graphs, and topological sort.',
    practiceProblems: ['Number of Islands', 'Course Schedule (Topological Sort)', 'Rotting Oranges'],
    resources: [
      { title: 'WilliamFiset Graph Theory Series', url: 'https://www.youtube.com/' }
    ]
  },
  {
    id: 'day-7',
    day: 'Day 7',
    topic: 'Dynamic Programming & Practice Assessment',
    focus: 'Memoization vs tabulation, 0/1 Knapsack, Coin Change, and full mock test rehearsal.',
    practiceProblems: ['Climbing Stairs', 'Coin Change', 'Longest Increasing Subsequence'],
    resources: [
      { title: 'Dynamic Programming Patterns on LeetCode', url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns' }
    ]
  }
];

export function LearningRoadmap({ setActivePage }) {
  const { roadmapCompletedTasks, toggleRoadmapTask } = useAssessment();

  const completedCount = roadmapCompletedTasks.length;
  const progressPercent = Math.round((completedCount / ROADMAP_DAYS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Feature 14: Dynamic Learning Plan
            </span>
            <span className="text-xs text-slate-400">Tailored to Identified Weaknesses</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Personalized 7-Day Interview Roadmap
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Generated specifically to reinforce your Dynamic Programming, Graph algorithms, and Data Structure optimization gaps.
          </p>
        </div>

        {/* Progress Tracker Pill */}
        <div className="flex items-center gap-3 p-2 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Milestones Completed</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">{completedCount} of 7 Days ({progressPercent}%)</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-slate-800 relative flex items-center justify-center">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* OVERALL PROGRESS BAR */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-slate-900 dark:text-white">Roadmap Completion Journey</span>
          <span className="text-blue-600 dark:text-blue-400">{completedCount} / 7 Days Finished</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* DAY-BY-DAY ROADMAP CHECKLIST */}
      <div className="space-y-4">
        {ROADMAP_DAYS.map((dayPlan, idx) => {
          const isDone = roadmapCompletedTasks.includes(dayPlan.id);
          return (
            <div
              key={dayPlan.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                isDone
                  ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Completion Toggle */}
                <button
                  onClick={() => toggleRoadmapTask(dayPlan.id)}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all shrink-0 mt-1 ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                      : 'border-2 border-slate-300 dark:border-slate-700 text-transparent hover:border-blue-500'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isDone ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {dayPlan.day}
                    </span>
                    <h3 className={`font-bold text-sm sm:text-base ${
                      isDone ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {dayPlan.topic}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                    {dayPlan.focus}
                  </p>

                  {/* Practice Problems */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Target Problems:</span>
                    {dayPlan.practiceProblems.map((prob, pIdx) => (
                      <span key={pIdx} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {prob}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learning Resource Links */}
              <div className="shrink-0 flex flex-col items-start md:items-end gap-2 text-xs">
                {dayPlan.resources.map((res, rIdx) => (
                  <a
                    key={rIdx}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <span>{res.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Re-assessment CTA */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold">Ready to Benchmark Your Knowledge?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Once you finish Day 7 practice, retake Round 1 or Round 2 to boost your Overall Interview Readiness Score.
          </p>
        </div>

        <button
          onClick={() => setActivePage('round2')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 shrink-0"
        >
          <span>Retake Round 2 Coding Assessment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
