import React from 'react';
import { Camera, Lightbulb, Focus, Maximize, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const PhotoGuide: React.FC = () => {
  const { language, t } = useLanguage();
  
  const guides = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: language === 'fa' ? 'نورپردازی مناسب' : 'Proper Lighting',
      desc: language === 'fa' ? 'از نور طبیعی روز یا نور سفید مستقیم استفاده کنید.' : 'Use natural daylight or direct white light.'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: t.noFlashTitle,
      desc: t.noFlashDesc
    },
    {
      icon: <Focus className="w-5 h-5" />,
      title: language === 'fa' ? 'تمرکز (فوکوس)' : 'Sharp Focus',
      desc: language === 'fa' ? 'مطمئن شوید جزئیات سنگ کاملاً واضح هستند.' : 'Ensure gemstone details are perfectly clear.'
    },
    {
      icon: <Maximize className="w-5 h-5" />,
      title: language === 'fa' ? 'زوایای مختلف' : 'Multiple Angles',
      desc: language === 'fa' ? 'از بالا، کنار و زیر سنگ عکس بگیرید.' : 'Take photos from top, side, and bottom.'
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: language === 'fa' ? 'پس‌زمینه ساده' : 'Plain Background',
      desc: language === 'fa' ? 'از یک پس‌زمینه سفید یا خاکستری خنثی استفاده کنید.' : 'Use a neutral white or gray background.'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl no-print">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Camera className="w-5 h-5 text-sky-400" />
        {language === 'fa' ? 'راهنمای عکاسی برای تحلیل دقیق‌تر' : 'Photography Guide for Better Analysis'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {guides.map((guide, i) => (
          <div key={i} className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-400">
              {guide.icon}
            </div>
            <h4 className="font-bold text-sm">{guide.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{guide.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
