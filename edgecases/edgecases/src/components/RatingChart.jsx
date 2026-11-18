// Edge Cases — Lightweight SVG Rating Progression Chart
import React from 'react';

export default function RatingChart({ data = [], width = 360, height = 140 }) {
  if (!data || data.length < 2) return null;

  const ratings = data.map((d) => d.rating);
  const minRating = Math.min(...ratings) - 50;
  const maxRating = Math.max(...ratings) + 50;
  const range = maxRating - minRating || 1;

  const padding = { top: 12, right: 16, bottom: 20, left: 36 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Generate SVG coordinates
  const points = data.map((d, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((d.rating - minRating) / range) * chartHeight;
    return { x, y, rating: d.rating, match: d.match };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  return (
    <div className="chart-container">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="chart-svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = padding.top + chartHeight * pct;
          const val = Math.round(maxRating - pct * range);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#242434"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 6}
                y={y + 3}
                fill="#656578"
                fontSize="9"
                fontFamily="JetBrains Mono"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#ratingGradient)" />

        {/* Line stroke */}
        <path
          d={pathD}
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={i === points.length - 1 ? 4.5 : 2.5}
            fill={i === points.length - 1 ? '#FF5A1F' : '#12121A'}
            stroke="#FF5A1F"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </div>
  );
}
