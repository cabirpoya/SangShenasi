import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-sm font-medium"
    >
      <Languages className="w-4 h-4" />
      {language === 'en' ? 'فارسی' : 'English'}
    </button>
  );
};
