import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts';
import { ConfidenceBreakdown } from '../types';

export const ConfidenceRadar: React.FC<{ breakdown: ConfidenceBreakdown }> = ({ breakdown }) => {
  const data = [
    { subject: 'Visual', A: breakdown.visualMatch, fullMark: 100 },
    { subject: 'Spectral', A: breakdown.spectralAnalysis, fullMark: 100 },
    { subject: 'History', A: breakdown.historicalData, fullMark: 100 },
    { subject: 'Metadata', A: breakdown.metadataConsistency, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
        <Radar
          name="Confidence"
          dataKey="A"
          stroke="#0071BC"
          fill="#009FDA"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
