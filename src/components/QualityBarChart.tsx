import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Props {
  quality: {
    color: number;
    clarity: number;
    cut: number;
    carat: number;
  };
}

export const QualityBarChart: React.FC<Props> = ({ quality }) => {
  const data = [
    { name: 'Color', value: quality.color },
    { name: 'Clarity', value: quality.clarity },
    { name: 'Cut', value: quality.cut },
    { name: 'Carat', value: quality.carat },
  ];

  const COLORS = ['#009FDA', '#0071BC', '#005691', '#003D66'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false}
          tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
        />
        <Tooltip 
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
