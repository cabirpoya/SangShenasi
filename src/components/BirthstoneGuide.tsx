import React from 'react';
import { BIRTHSTONES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const BirthstoneGuide: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {BIRTHSTONES.map((item) => (
        <div 
          key={item.month}
          className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group"
        >
          <div 
            className="w-full aspect-square rounded-xl mb-3 flex items-center justify-center text-4xl shadow-inner"
            style={{ backgroundColor: `${item.color}20` }}
          >
            <span className="group-hover:scale-110 transition-transform">💎</span>
          </div>
          <h4 className="font-bold text-slate-700">{language === 'fa' ? item.fa : item.stone}</h4>
          <p className="text-sm text-slate-500">{item.month}</p>
          <div 
            className="mt-2 h-1 w-12 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </div>
      ))}
    </div>
  );
};
