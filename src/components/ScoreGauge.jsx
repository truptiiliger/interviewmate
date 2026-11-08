import React from 'react';

export function ScoreGauge({ score = 82, maxScore = 100, size = 180, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let statusText = 'Skill Development Required';
  let statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-300';
  let gradientId = 'gaugeGradWarm';

  if (percentage >= 80) {
    statusText = 'Ready to Apply • Top Tier';
    statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-300';
    gradientId = 'gaugeGradHigh';
  } else if (percentage >= 65) {
    statusText = 'Almost Ready • Target Prep';
    statusBadge = 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border-blue-300';
    gradientId = 'gaugeGradMid';
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="gaugeGradHigh" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="60%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="gaugeGradMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gaugeGradWarm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800 fill-none"
        />

        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {score}
        </span>
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-400">
          out of {maxScore}
        </span>
      </div>

      <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge}`}>
        {statusText}
      </div>
    </div>
  );
}
