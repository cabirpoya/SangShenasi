import React from 'react';
import { Ruler, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { UploadMetadata } from '../types';

interface Props {
  metadata: UploadMetadata;
  onChange: (metadata: UploadMetadata) => void;
}

export const PhysicalMeasurements: React.FC<Props> = ({ metadata, onChange }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <Ruler className="w-5 h-5 text-[#0071BC]" />
          {language === 'fa' ? 'اندازه‌گیری‌های فیزیکی (اختیاری)' : 'Physical Measurements (Optional)'}
        </h3>
        <span className="px-2 py-1 rounded-md bg-blue-50 text-[10px] font-bold text-[#0071BC] uppercase tracking-wider">
          Advanced
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{language === 'fa' ? 'سختی' : 'Hardness'}</span>
          </div>
          <input 
            type="text" 
            placeholder="Mohs scale"
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-700 font-medium placeholder:text-slate-300"
          />
        </div>
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{language === 'fa' ? 'ضریب شکست' : 'Refractive Index'}</span>
          </div>
          <input 
            type="text" 
            placeholder="e.g. 1.76"
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-700 font-medium placeholder:text-slate-300"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{language === 'fa' ? 'وزن مخصوص' : 'Specific Gravity'}</span>
          </div>
          <input 
            type="text" 
            placeholder="e.g. 4.00"
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-700 font-medium placeholder:text-slate-300"
          />
        </div>
      </div>
    </div>
  );
};
