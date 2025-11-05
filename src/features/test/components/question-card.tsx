'use client';

import { motion } from 'framer-motion';
import { TestQuestion } from '@/constants/test-data';
import { Button } from '@/components/ui/button';

interface QuestionCardProps {
  question: TestQuestion;
  onSelectOption: (optionIndex: number) => void;
  selectedOption: number | null;
}

export function QuestionCard({
  question,
  onSelectOption,
  selectedOption,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-2">
          {question.question}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          가장 가까운 답변을 선택해주세요
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onSelectOption(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full p-4 rounded-xl text-left transition-all
              ${
                selectedOption === index
                  ? 'bg-brand-primary text-white shadow-lg'
                  : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-primary'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${
                  selectedOption === index
                    ? 'border-white bg-white'
                    : 'border-gray-300'
                }
              `}
              >
                {selectedOption === index && (
                  <div className="w-3 h-3 rounded-full bg-brand-primary" />
                )}
              </div>
              <span className="text-base md:text-lg font-medium">
                {option.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

