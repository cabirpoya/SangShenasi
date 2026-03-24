import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, UploadMetadata } from "../types";

export async function analyzeGemstone(
  images: File[],
  metadata: UploadMetadata,
  apiKey?: string
): Promise<AnalysisResult> {
  // Check multiple sources for the API key to ensure compatibility across environments (AI Studio, Vercel, Local)
  const key = apiKey || 
              process.env.GEMINI_API_KEY || 
              (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY);

  if (!key) {
    console.error('Gemini API key is missing. Please set GEMINI_API_KEY or VITE_GEMINI_API_KEY in your environment.');
    throw new Error('Gemini API key is missing');
  }
  const ai = new GoogleGenAI({ apiKey: key });
  
  const imageParts = await Promise.all(
    images.map(async (file) => {
      const base64 = await fileToBase64(file);
      return {
        inlineData: {
          data: base64.split(',')[1],
          mimeType: file.type,
        },
      };
    })
  );

  const prompt = `
    Analyze the provided gemstone image(s) and metadata.
    Metadata: ${JSON.stringify(metadata)}
    
    Provide a detailed gemological analysis in JSON format.
    Include identification, quality scores (0-100), detailed descriptions in both English and Persian, 
    estimated age, origin, and market value.
    Also provide a confidence breakdown and similar stones that might be confused with this one.
    If possible, provide a brief spectral analysis (wavelengths, absorption, notes) based on the visual data.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { parts: [...imageParts, { text: prompt }] }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          stoneType: { type: Type.STRING },
          stoneName: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              fa: { type: Type.STRING }
            }
          },
          confidence: { type: Type.NUMBER },
          quality: {
            type: Type.OBJECT,
            properties: {
              color: { type: Type.NUMBER },
              clarity: { type: Type.NUMBER },
              cut: { type: Type.NUMBER },
              carat: { type: Type.NUMBER }
            }
          },
          details: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              fa: { type: Type.STRING }
            }
          },
          estimatedAge: { type: Type.STRING },
          origin: { type: Type.STRING },
          marketValue: { type: Type.STRING },
          confidenceBreakdown: {
            type: Type.OBJECT,
            properties: {
              visualMatch: { type: Type.NUMBER },
              spectralAnalysis: { type: Type.NUMBER },
              historicalData: { type: Type.NUMBER },
              metadataConsistency: { type: Type.NUMBER }
            }
          },
          similarStones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    fa: { type: Type.STRING }
                  }
                },
                reason: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    fa: { type: Type.STRING }
                  }
                },
                distinction: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    fa: { type: Type.STRING }
                  }
                }
              }
            }
          },
          spectralData: {
            type: Type.OBJECT,
            properties: {
              wavelengths: { type: Type.ARRAY, items: { type: Type.NUMBER } },
              absorption: { type: Type.ARRAY, items: { type: Type.NUMBER } },
              notes: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  const result = JSON.parse(response.text || '{}');
  
  // Add metadata for professional report
  return {
    ...result,
    reportId: `GEM-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${new Date().getFullYear()}`,
    timestamp: new Date().toISOString()
  };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
