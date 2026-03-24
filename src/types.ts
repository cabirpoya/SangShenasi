export interface AnalysisResult {
  stoneType: string;
  stoneName: {
    en: string;
    fa: string;
  };
  confidence: number;
  quality: {
    color: number;
    clarity: number;
    cut: number;
    carat: number;
  };
  details: {
    en: string;
    fa: string;
  };
  estimatedAge?: string;
  origin?: string;
  marketValue?: string;
  reportId: string;
  timestamp: string;
  similarStones?: SimilarStone[];
  confidenceBreakdown?: ConfidenceBreakdown;
  spectralData?: {
    wavelengths: number[];
    absorption: number[];
    notes?: string;
  } | string;
}

export interface SimilarStone {
  name: {
    en: string;
    fa: string;
  };
  reason: {
    en: string;
    fa: string;
  };
  distinction: {
    en: string;
    fa: string;
  };
}

export interface ConfidenceBreakdown {
  visualMatch: number;
  spectralAnalysis: number;
  historicalData: number;
  metadataConsistency: number;
}

export interface UploadMetadata {
  weight?: string;
  dimensions?: string;
  location?: string;
  notes?: string;
}
