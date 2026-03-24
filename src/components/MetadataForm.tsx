import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { UploadMetadata } from '../types';

interface Props {
  metadata: UploadMetadata;
  onChange: (metadata: UploadMetadata) => void;
}

export const MetadataForm: React.FC<Props> = ({ metadata, onChange }) => {
  const { t } = useLanguage();

  const handleChange = (key: keyof UploadMetadata, value: string) => {
    onChange({ ...metadata, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-700 flex items-center gap-2">
        <Info className="w-5 h-5 text-[#0071BC]" />
        {t.metadataTitle}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-500">{t.weightLabel}</label>
          <input
            type="text"
            placeholder="e.g. 1.25"
            value={metadata.weight || ''}
            onChange={(e) => handleChange('weight', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#009FDA]/50 outline-none transition-all"
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-500">{t.dimensionsLabel}</label>
          <input
            type="text"
            placeholder="e.g. 6.5 x 6.5 x 4.0"
            value={metadata.dimensions || ''}
            onChange={(e) => handleChange('dimensions', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#009FDA]/50 outline-none transition-all"
          />
        </div>
        
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm font-medium text-slate-500">{t.notesLabel}</label>
          <textarea
            rows={3}
            placeholder="..."
            value={metadata.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-[#009FDA]/50 outline-none transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
};
