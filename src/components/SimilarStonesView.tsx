import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SimilarStone } from '../types';

interface Props {
  identifiedStone: string;
  identifiedStoneFa: string;
  similarStones: SimilarStone[];
}

export const SimilarStonesView: React.FC<Props> = ({ 
  identifiedStone, 
  identifiedStoneFa, 
  similarStones 
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-amber-50 rounded-3xl border border-amber-100 p-6 space-y-4">
      <div className="flex items-center gap-3 text-amber-700">
        <div className="p-2 rounded-xl bg-amber-100">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{t.similarStonesTitle}</h3>
          <p className="text-sm opacity-80">
            {language === 'fa' 
              ? `سنگ شناسایی شده (${identifiedStoneFa}) ممکن است با این موارد اشتباه گرفته شود:` 
              : `The identified stone (${identifiedStone}) could be confused with:`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarStones.map((stone, i) => (
          <div key={i} className="bg-white/60 rounded-2xl p-4 border border-amber-200/50 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-amber-900">
                {language === 'fa' ? stone.name.fa : stone.name.en}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[10px] font-bold text-amber-700 uppercase">
                Visual Similar
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <Info className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-600 italic">
                  {language === 'fa' ? stone.reason.fa : stone.reason.en}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-white/40 text-xs font-medium text-slate-700">
                <span className="text-amber-600 font-bold mr-1">
                  {language === 'fa' ? 'تمایز:' : 'Distinction:'}
                </span>
                {language === 'fa' ? stone.distinction.fa : stone.distinction.en}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
