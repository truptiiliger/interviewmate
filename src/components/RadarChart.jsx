import React from 'react';

export function RadarChart({ data, size = 320 }) {
  // Default dimensions if not supplied
  const items = data || [
    { label: 'Data Structures', value: 85, fullMark: 100 },
    { label: 'Algorithms', value: 72, fullMark: 100 },
    { label: 'Code Quality', value: 90, fullMark: 100 },
    { label: 'Problem Solving', value: 80, fullMark: 100 },
    { label: 'Databases & Web', value: 78, fullMark: 100 },
    { label: 'Analytical Logic', value: 85, fullMark: 100 }
  ];

  const totalPoints = items.length;
  const radius = size * 0.36;
  const center = size / 2;
  const angleStep = (Math.PI * 2) / totalPoints;

  // Concentric guideline rings at 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (valueRatio, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * valueRatio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon path for data
  const dataPoints = items.map((item, idx) => {
    const ratio = Math.max(0.1, item.value / item.fullMark);
    return getCoordinates(ratio, idx);
  });
  const dataPolygon = dataPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.4" />
          </linearGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Web / Concentric Polygons */}
        {levels.map((level, lvlIdx) => {
          const ringPoints = items.map((_, idx) => getCoordinates(level, idx));
          const ringPoly = ringPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
          return (
            <polygon
              key={`ring-${lvlIdx}`}
              points={ringPoly}
              fill="none"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1"
              strokeDasharray={lvlIdx < 3 ? '2,3' : 'none'}
            />
          );
        })}

        {/* Radial Axis Lines */}
        {items.map((_, idx) => {
          const outerCoord = getCoordinates(1.0, idx);
          return (
            <line
              key={`axis-${idx}`}
              x1={center}
              y1={center}
              x2={outerCoord.x}
              y2={outerCoord.y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Data Polygon */}
        <polygon
          points={dataPolygon}
          fill="url(#radarGrad)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
          className="transition-all duration-700 ease-out"
        />

        {/* Data Vertices */}
        {dataPoints.map((p, idx) => (
          <g key={`vertex-${idx}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4.5"
              className="fill-white dark:fill-slate-900 stroke-purple-600 dark:stroke-purple-400 stroke-2"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r="2"
              className="fill-purple-600 dark:fill-purple-400"
            />
          </g>
        ))}

        {/* Category Labels */}
        {items.map((item, idx) => {
          const labelCoord = getCoordinates(1.18, idx);
          const isRight = labelCoord.x > center + 10;
          const isLeft = labelCoord.x < center - 10;
          let textAnchor = 'middle';
          if (isRight) textAnchor = 'start';
          if (isLeft) textAnchor = 'end';

          return (
            <text
              key={`label-${idx}`}
              x={labelCoord.x}
              y={labelCoord.y + 4}
              textAnchor={textAnchor}
              className="text-[11px] font-semibold fill-slate-700 dark:fill-slate-300 select-none"
            >
              {item.label}
              <tspan className="text-[10px] font-normal fill-blue-600 dark:fill-blue-400 block" dx="4">
                ({item.value}%)
              </tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}
