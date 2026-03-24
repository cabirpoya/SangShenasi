// =====================================================
// POYAGEMAi - Main Application Component
// World Bank Theme - Light Blue Professional Style
// =====================================================

import React, { useState, useEffect } from 'react';
import {
  Gem,
  Sparkles,
  Key,
  ExternalLink,
  AlertCircle,
  Moon,
  Star,
  Info,
  Shield,
  Settings,
  X
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ImageUploader } from './components/ImageUploader';
import { MetadataForm } from './components/MetadataForm';
import { ResultsView } from './components/ResultsView';
import { LoadingAnimation } from './components/LoadingAnimation';
import { LanguageToggle } from './components/LanguageToggle';
import { BirthstoneGuide } from './components/BirthstoneGuide';
import { PhotoGuide } from './components/PhotoGuide';
import { PhysicalMeasurements } from './components/PhysicalMeasurements';
import { SimilarStonesView } from './components/SimilarStonesView';
import { ConfidenceDetails } from './components/ConfidenceDetails';
import { AnalysisResult, UploadMetadata } from './types';
import { analyzeGemstone } from './services/geminiService';

type View = 'analyze' | 'birthstones';

const AppContent: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [view, setView] = useState<View>('analyze');
  const [images, setImages] = useState<File[]>([]);
  const [metadata, setMetadata] = useState<UploadMetadata>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [localApiKey, setLocalApiKey] = useState('');

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);

    if (images.length === 0) {
      setError(t.errorNoImages);
      return;
    }

    setLoading(true);

    try {
      const analysis = await analyzeGemstone(images, metadata, localApiKey);
      setResult(analysis);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(t.errorConnectivity);
    } finally {
      setLoading(false);
    }
  };

  const canAnalyze = images.length > 0;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Loading Overlay */}
      <LoadingAnimation isLoading={loading} />

      {/* World Bank Style Top Bar */}
      <div className="bg-gradient-to-r from-[#009FDA] to-[#0071BC] py-3 px-4 shadow-md">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/90">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">{t.subtitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Discreet Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Key className="w-4 h-4 text-[#0071BC]" />
                {t.apiKeyLabel}
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.apiKeyDescription}
              </p>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder={t.apiKeyPlaceholder}
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009FDA]/50 focus:border-[#009FDA] transition-all"
                  dir="ltr"
                />
                <div className="flex justify-between items-center">
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0071BC] hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t.getApiKey}
                  </a>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-[#0071BC] text-white rounded-lg text-sm font-medium hover:bg-[#005a96] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#0071BC] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-600">
                  {t.apiKeyInfo}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#009FDA] to-[#0071BC] flex items-center justify-center shadow-lg shadow-blue-200">
                <Gem className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#009FDA] animate-pulse" />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0071BC] to-[#009FDA] bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-slate-500 text-sm md:text-base">{t.subtitle}</p>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setView('analyze')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              view === 'analyze'
                ? 'bg-gradient-to-r from-[#009FDA] to-[#0071BC] text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-500 hover:text-[#0071BC] hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <Gem className="w-4 h-4" />
            {t.analyze}
          </button>
          <button
            onClick={() => setView('birthstones')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
              view === 'birthstones'
                ? 'bg-gradient-to-r from-[#009FDA] to-[#0071BC] text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-500 hover:text-[#0071BC] hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <Moon className="w-4 h-4" />
            {t.birthstones}
          </button>
        </div>

        {/* Birthstone Guide View */}
        {view === 'birthstones' && (
          <div className="bg-white rounded-3xl border border-blue-100 shadow-sm shadow-blue-100 p-6">
            <BirthstoneGuide />
          </div>
        )}

        {/* Analyze View */}
        {view === 'analyze' && (
          <div className="space-y-6">
            {/* Photography Guide */}
            <PhotoGuide />

            {/* Upload & Metadata Section */}
            <div className="bg-white rounded-3xl border border-blue-100 shadow-sm shadow-blue-100 p-6 space-y-6">
              {/* Image Uploader */}
              <ImageUploader onImagesChange={setImages} maxImages={10} />

              {/* Metadata Form */}
              <div className="border-t border-slate-100 pt-6">
                <MetadataForm metadata={metadata} onChange={setMetadata} />
              </div>

              {/* Physical Measurements (Advanced) */}
              <div className="border-t border-slate-100 pt-6">
                <PhysicalMeasurements metadata={metadata} onChange={setMetadata} />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={loading || !canAnalyze}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#009FDA] to-[#0071BC] text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <Gem className="w-6 h-6" />
                {loading ? t.analyzing : t.analyzeButton}
                <Star className="w-5 h-5" />
              </button>

              {/* Help Text */}
              {!canAnalyze && (
                <p className="text-center text-sm text-slate-400">
                  {t.needImages}
                </p>
              )}
            </div>

            {/* Results Section */}
            {result && !loading && (
              <div className="space-y-6">
                {/* Confidence Breakdown */}
                {result.confidenceBreakdown && (
                  <ConfidenceDetails breakdown={result.confidenceBreakdown} />
                )}

                {/* Similar Stones Warning */}
                {result.similarStones && result.similarStones.length > 0 && (
                  <SimilarStonesView
                    identifiedStone={result.stoneName?.en || result.stoneType}
                    identifiedStoneFa={result.stoneName?.fa || result.stoneType}
                    similarStones={result.similarStones}
                  />
                )}

                {/* Main Results */}
                <div className="bg-white rounded-3xl border border-blue-100 shadow-sm shadow-blue-100 p-6">
                  <ResultsView result={result} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center py-6 border-t border-slate-200">
          <p className="text-slate-500 text-sm">
            {t.footerText}
          </p>
          <p className="text-slate-400 text-xs mt-2">
            {t.disclaimer}
          </p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
