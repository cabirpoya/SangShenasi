import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface Translations {
  title: string;
  subtitle: string;
  analyze: string;
  birthstones: string;
  apiKeyLabel: string;
  apiKeyDescription: string;
  apiKeyPlaceholder: string;
  getApiKey: string;
  apiKeyInfo: string;
  analyzeButton: string;
  analyzing: string;
  needApiKey: string;
  needImages: string;
  footerText: string;
  disclaimer: string;
  errorApiKey: string;
  errorNoImages: string;
  errorAnalysis: string;
  uploadTitle: string;
  uploadDescription: string;
  metadataTitle: string;
  weightLabel: string;
  dimensionsLabel: string;
  locationLabel: string;
  notesLabel: string;
  resultsTitle: string;
  confidenceLabel: string;
  qualityLabel: string;
  detailsLabel: string;
  ageLabel: string;
  originLabel: string;
  valueLabel: string;
  similarStonesTitle: string;
  errorConnectivity: string;
  printResults: string;
  spectralAnalysisTitle: string;
  spectralAnalysisPlaceholder: string;
  noFlashTitle: string;
  noFlashDesc: string;
  reportIdLabel: string;
  timestampLabel: string;
  certificateTitle: string;
}

const translations: Record<Language, Translations> = {
  en: {
    title: 'POYAGEMAi',
    subtitle: 'Advanced AI Gemstone Analysis',
    analyze: 'Analyze',
    birthstones: 'Birthstones',
    apiKeyLabel: 'Gemini API Key',
    apiKeyDescription: 'Enter your Google AI Studio API key to enable analysis.',
    apiKeyPlaceholder: 'Enter your API key...',
    getApiKey: 'Get API Key',
    apiKeyInfo: 'Your API key is stored locally and used only for requests to Google Gemini.',
    analyzeButton: 'Start Analysis',
    analyzing: 'Analyzing...',
    needApiKey: 'Please enter an API key to continue.',
    needImages: 'Please upload at least one image.',
    footerText: '© 2026 POYAGEMAi. All rights reserved.',
    disclaimer: 'Note: AI analysis is for informational purposes and should not replace professional appraisal.',
    errorApiKey: 'API Key is required.',
    errorNoImages: 'Please upload at least one image.',
    errorAnalysis: 'An error occurred during analysis.',
    uploadTitle: 'Upload Images',
    uploadDescription: 'Drag and drop or click to upload gemstone photos.',
    metadataTitle: 'Additional Information',
    weightLabel: 'Weight (Carats)',
    dimensionsLabel: 'Dimensions (mm)',
    locationLabel: 'Found Location',
    notesLabel: 'Additional Notes',
    resultsTitle: 'Analysis Results',
    confidenceLabel: 'Confidence Score',
    qualityLabel: 'Quality Assessment',
    detailsLabel: 'Detailed Analysis',
    ageLabel: 'Estimated Age',
    originLabel: 'Probable Origin',
    valueLabel: 'Market Estimate',
    similarStonesTitle: 'Similar Stones to Consider',
    errorConnectivity: 'Analysis failed due to a connectivity issue or AI model error. Please try again.',
    printResults: 'Print Results',
    spectralAnalysisTitle: 'Spectral Analysis',
    spectralAnalysisPlaceholder: 'Spectral data analysis is currently being processed and will be available in future updates.',
    noFlashTitle: 'Avoid Direct Flash',
    noFlashDesc: 'Direct flash can cause glare and hide important surface details.',
    reportIdLabel: 'Report ID',
    timestampLabel: 'Analysis Date',
    certificateTitle: 'Gemological Analysis Certificate',
  },
  fa: {
    title: 'پویاجِمای',
    subtitle: 'تحلیل پیشرفته گوهرشناسی با هوش مصنوعی',
    analyze: 'تحلیل',
    birthstones: 'سنگ‌های ماه تولد',
    apiKeyLabel: 'کلید API جمینای',
    apiKeyDescription: 'کلید API گوگل AI Studio خود را برای فعال‌سازی تحلیل وارد کنید.',
    apiKeyPlaceholder: 'کلید API را وارد کنید...',
    getApiKey: 'دریافت کلید API',
    apiKeyInfo: 'کلید شما به صورت محلی ذخیره شده و فقط برای درخواست‌ها به گوگل استفاده می‌شود.',
    analyzeButton: 'شروع تحلیل',
    analyzing: 'در حال تحلیل...',
    needApiKey: 'لطفاً برای ادامه یک کلید API وارد کنید.',
    needImages: 'لطفاً حداقل یک تصویر بارگذاری کنید.',
    footerText: '© ۲۰۲۶ پویاجِمای. تمامی حقوق محفوظ است.',
    disclaimer: 'توجه: تحلیل هوش مصنوعی جنبه اطلاع‌رسانی دارد و نباید جایگزین کارشناسی حرفه‌ای شود.',
    errorApiKey: 'وارد کردن کلید API الزامی است.',
    errorNoImages: 'لطفاً حداقل یک تصویر بارگذاری کنید.',
    errorAnalysis: 'خطایی در طول تحلیل رخ داد.',
    uploadTitle: 'بارگذاری تصاویر',
    uploadDescription: 'تصاویر گوهر را اینجا بکشید یا کلیک کنید.',
    metadataTitle: 'اطلاعات تکمیلی',
    weightLabel: 'وزن (قیراط)',
    dimensionsLabel: 'ابعاد (میلی‌متر)',
    locationLabel: 'محل یافت شده',
    notesLabel: 'یادداشت‌های اضافی',
    resultsTitle: 'نتایج تحلیل',
    confidenceLabel: 'میزان اطمینان',
    qualityLabel: 'ارزیابی کیفیت',
    detailsLabel: 'تحلیل دقیق',
    ageLabel: 'قدمت تخمینی',
    originLabel: 'منشأ احتمالی',
    valueLabel: 'تخمین بازار',
    similarStonesTitle: 'سنگ‌های مشابه جهت بررسی',
    errorConnectivity: 'تحلیل به دلیل مشکل در اتصال یا خطای مدل هوش مصنوعی با شکست مواجه شد. لطفاً دوباره تلاش کنید.',
    printResults: 'چاپ نتایج',
    spectralAnalysisTitle: 'تحلیل طیفی',
    spectralAnalysisPlaceholder: 'داده‌های تحلیل طیفی در حال حاضر در حال پردازش هستند و در به‌روزرسانی‌های آینده در دسترس خواهند بود.',
    noFlashTitle: 'عدم استفاده از فلاش مستقیم',
    noFlashDesc: 'فلاش مستقیم می‌تواند باعث بازتاب شدید نور شده و جزئیات مهم سطح سنگ را پنهان کند.',
    reportIdLabel: 'شناسه گزارش',
    timestampLabel: 'تاریخ تحلیل',
    certificateTitle: 'گواهینامه تحلیل گوهرشناسی',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = translations[language];
  const isRTL = language === 'fa';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
