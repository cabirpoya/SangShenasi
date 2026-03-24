import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<Props> = ({ onImagesChange, maxImages = 10 }) => {
  const { t } = useLanguage();
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, maxImages);
    
    setFiles(newFiles);
    onImagesChange(newFiles);

    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  }, [files, maxImages, onImagesChange]);

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onImagesChange(newFiles);
    
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#0071BC]" />
          {t.uploadTitle}
        </h3>
        <span className="text-xs text-slate-400">{files.length} / {maxImages}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {previews.map((url, i) => (
          <div key={url} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200">
            <img src={url} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {files.length < maxImages && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-[#009FDA] hover:bg-sky-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-slate-400">
            <Upload className="w-6 h-6" />
            <span className="text-xs font-medium">{t.uploadDescription}</span>
            <input type="file" multiple accept="image/*" onChange={onFileChange} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
};
