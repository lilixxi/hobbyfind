'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">질문 진행</span>
        <span className="font-semibold text-brand-primary">
          {currentStep} / {totalSteps}
        </span>
      </div>
      
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
        />
      </div>
    </div>
  );
}

