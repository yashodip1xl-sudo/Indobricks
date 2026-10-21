import React from 'react';

interface ReadinessRingProps {
  score: number;
}

export const ReadinessRing: React.FC<ReadinessRingProps> = ({ score }) => {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Color dynamics: from warm orange at 0 to amber at 50 to bright green at 100
  const getStrokeColor = (val: number) => {
    if (val === 0) return '#f97316';
    if (val < 50) return '#f59e0b';
    if (val < 90) return '#38bdf8';
    return '#10b981';
  };

  return (
    <div className="readiness-gauge-box">
      <div className="circular-gauge">
        <svg className="gauge-svg" viewBox="0 0 64 64">
          <circle
            className="gauge-bg-circle"
            cx="32"
            cy="32"
            r={radius}
          />
          <circle
            className="gauge-fill-circle"
            cx="32"
            cy="32"
            r={radius}
            stroke={getStrokeColor(score)}
            strokeDasharray={circumference}
            strokeDashoffset={score === 0 ? circumference - 2 : strokeDashoffset}
          />
        </svg>

        <div className="gauge-text-content">
          <span className="gauge-score-number">{score}/100</span>
          <span className="gauge-subtext">organisation readiness</span>
        </div>
      </div>
    </div>
  );
};
