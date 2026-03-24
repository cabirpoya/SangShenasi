import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ConfidenceBreakdown } from '../types';
import { ConfidenceRadar } from './ConfidenceRadar';

export const ConfidenceDetails: React.FC<{ breakdown: ConfidenceBreakdown }> = ({ breakdown }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-[#009FDA] rounded-full" />
        {t.confidenceLabel}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="h-[300px]">
          <ConfidenceRadar breakdown={breakdown} />
        </div>
        
        <div className="space-y-4">
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-bold text-[#0071BC]">{value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#009FDA] to-[#0071BC] transition-all duration-1000"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
