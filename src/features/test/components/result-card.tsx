'use client';

import { motion } from 'framer-motion';
import { TestResult } from '@/constants/test-data';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Sparkles, Target, Heart } from 'lucide-react';

interface ResultCardProps {
  result: TestResult;
  onRestart: () => void;
}

export function ResultCard({ result, onRestart }: ResultCardProps) {
  const router = useRouter();

  const handleGoToCategory = () => {
    router.push(`/category/${result.type}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {result.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {result.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-8"
        >
          <div className="p-6 bg-brand-light rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-brand-primary" />
              <h3 className="text-lg font-semibold text-gray-900">
                당신의 특징
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white text-brand-primary rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-brand-primary" />
              <h3 className="text-lg font-semibold text-gray-900">
                추천 취미
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {result.recommendedHobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 text-center"
                >
                  {hobby}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-success/10 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💬 추천 대화 주제
            </h3>
            <ul className="space-y-2">
              {result.recommendedTopics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-success font-bold mt-1">•</span>
                  <span className="text-sm">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            onClick={handleGoToCategory}
            className="flex-1 bg-brand-primary hover:bg-brand-accent text-white py-6 text-lg"
          >
            {result.type === 'sports' && '운동형'}
            {result.type === 'intelligence' && '지능형'}
            {result.type === 'arts' && '예술형'} 취미 보러가기
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex-1 sm:flex-none border-2 border-gray-300 hover:border-brand-primary py-6 text-lg"
          >
            다시 테스트하기
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

