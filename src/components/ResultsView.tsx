import React from 'react';
import ReactMarkdown from 'react-markdown';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Award, 
  MapPin, 
  History, 
  DollarSign, 
  CheckCircle2,
  FileText,
  Printer,
  Activity,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AnalysisResult } from '../types';
import { QualityBarChart } from './QualityBarChart';

export const ResultsView: React.FC<{ result: AnalysisResult }> = ({ result }) => {
  const { t, language } = useLanguage();

  const name = language === 'fa' ? result.stoneName.fa : result.stoneName.en;
  const details = language === 'fa' ? result.details.fa : result.details.en;

  const handlePrint = () => {
    window.print();
  };

  const shareUrl = `${window.location.origin}/report/${result.reportId}`;

  return (
    <div className="space-y-8 bg-white p-4 md:p-8 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
      {/* Certificate Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full -ml-32 -mb-32 opacity-50 pointer-events-none" />

      {/* Certificate Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b-2 border-slate-100 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#0071BC] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              {t.certificateTitle}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                <Activity className="w-3.5 h-3.5 text-[#009FDA]" />
                {t.reportIdLabel}: <span className="text-slate-900">{result.reportId}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#009FDA]" />
                {t.timestampLabel}: <span className="text-slate-900">{new Date(result.timestamp).toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="p-2 bg-white rounded-xl border-2 border-slate-100 shadow-sm">
            <QRCodeSVG value={shareUrl} size={80} level="H" />
          </div>
          <button
            onClick={handlePrint}
            className="no-print flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all text-sm font-bold shadow-xl shadow-slate-200"
          >
            <Printer className="w-4 h-4" />
            {t.printResults}
          </button>
        </div>
      </div>

      {/* Header Result */}
      <div className="flex flex-col md:flex-row gap-8 items-start pt-4">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3" />
            Identification Confirmed
          </div>
          
          <h2 className="text-5xl font-black text-slate-900 leading-tight">
            {name}
          </h2>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-[#009FDA]" />
              <span className="text-sm font-bold text-slate-700">{result.origin || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <History className="w-4 h-4 text-[#009FDA]" />
              <span className="text-sm font-bold text-slate-700">{result.estimatedAge || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
              <DollarSign className="w-4 h-4 text-[#009FDA]" />
              <span className="text-sm font-bold text-slate-700">{result.marketValue || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-56 p-8 rounded-[2.5rem] bg-gradient-to-br from-[#009FDA] to-[#0071BC] text-white text-center shadow-2xl shadow-blue-200 transform hover:scale-105 transition-transform">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Confidence Score</div>
          <div className="text-6xl font-black tracking-tighter">{result.confidence}<span className="text-2xl opacity-50">%</span></div>
        </div>
      </div>

      {/* Quality Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0071BC]" />
            {t.qualityLabel}
          </h3>
          <div className="h-[250px] bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <QualityBarChart quality={result.quality} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0071BC]" />
            {t.detailsLabel}
          </h3>
          <div className="prose prose-slate max-w-none bg-slate-50 rounded-2xl p-6 border border-slate-100 text-slate-600 leading-relaxed">
            <ReactMarkdown>{details}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Spectral Analysis Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#0071BC]" />
          {t.spectralAnalysisTitle}
        </h3>
        
        {result.spectralData ? (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            {typeof result.spectralData === 'string' ? (
              <p className="text-slate-600">{result.spectralData}</p>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Peak Wavelength</div>
                    <div className="text-lg font-bold text-[#0071BC]">
                      {Math.max(...result.spectralData.wavelengths)} nm
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Absorption Max</div>
                    <div className="text-lg font-bold text-[#0071BC]">
                      {Math.max(...result.spectralData.absorption).toFixed(2)}
                    </div>
                  </div>
                </div>
                {result.spectralData.notes && (
                  <p className="text-sm text-slate-500 italic">{result.spectralData.notes}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex gap-1 items-end h-8">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-blue-200 rounded-full animate-pulse" 
                  style={{ 
                    height: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 100}ms`
                  }} 
                />
              ))}
            </div>
            <p className="text-slate-500 italic text-sm max-w-xs">
              {t.spectralAnalysisPlaceholder}
            </p>
          </div>
        )}
      </div>

      {/* Verification Footer */}
      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Verified by POYAGEMAi AI Engine v2.5
          </div>
          <div className="text-[10px] leading-relaxed max-w-md">
            This digital certificate is generated based on advanced visual and metadata analysis. 
            The authenticity of this report can be verified by scanning the QR code or visiting our official portal.
            POYAGEMAi uses state-of-the-art neural networks for gemstone identification.
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-tighter vertical-text opacity-50" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Official Verification
          </div>
          <QRCodeSVG value={shareUrl} size={60} level="M" includeMargin={false} className="opacity-80" />
        </div>
      </div>
    </div>
  );
};
