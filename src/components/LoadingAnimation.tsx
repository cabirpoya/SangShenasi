import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gem } from 'lucide-react';

export const LoadingAnimation: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#009FDA] to-[#0071BC] flex items-center justify-center shadow-2xl shadow-blue-200"
            >
              <Gem className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -inset-4 rounded-[40px] border-2 border-[#009FDA]/30"
            />
          </div>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8 text-xl font-bold bg-gradient-to-r from-[#0071BC] to-[#009FDA] bg-clip-text text-transparent"
          >
            POYAGEMAi is analyzing...
          </motion.p>
          <p className="text-slate-400 text-sm mt-2">Using Gemini 3.1 Pro Vision</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
