'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/features/test/components/progress-bar';
import { QuestionCard } from '@/features/test/components/question-card';
import { ResultCard } from '@/features/test/components/result-card';
import { TEST_INFO, TEST_QUESTIONS, TEST_RESULTS } from '@/constants/test-data';
import { useSession } from 'next-auth/react';
import { CategoryType } from '@/constants/hobbies';

export default function TestPage() {
  const { data: session } = useSession();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TEST_QUESTIONS.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === TEST_QUESTIONS.length - 1;
  const currentAnswer = answers[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    if (isLastQuestion) {
      calculateResult();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const calculateResult = async () => {
    const scores: Record<CategoryType, number> = {
      sports: 0,
      intelligence: 0,
      arts: 0,
    };

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        const selectedOption = TEST_QUESTIONS[questionIndex].options[answerIndex];
        scores[selectedOption.type]++;
      }
    });

    let maxScore = 0;
    let resultType: CategoryType = 'sports';

    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultType = type as CategoryType;
      }
    });

    // persist if logged in
    if (session?.user?.id) {
      try {
        await fetch('/api/test-result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resultType }),
        });
      } catch (e) {
        // ignore
      }
    }
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(TEST_QUESTIONS.length).fill(null));
    setShowResult(false);
  };

  const result = useMemo(() => {
    const scores: Record<CategoryType, number> = {
      sports: 0,
      intelligence: 0,
      arts: 0,
    };

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        const selectedOption = TEST_QUESTIONS[questionIndex].options[answerIndex];
        scores[selectedOption.type]++;
      }
    });

    let maxScore = 0;
    let resultType: CategoryType = 'sports';

    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultType = type as CategoryType;
      }
    });

    return TEST_RESULTS[resultType];
  }, [answers]);

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-light to-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ResultCard result={result} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {TEST_INFO.title}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {TEST_INFO.description}
          </p>

          <ProgressBar
            currentStep={currentQuestionIndex + 1}
            totalSteps={TEST_QUESTIONS.length}
          />
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-6">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestionIndex}
              question={currentQuestion}
              onSelectOption={handleSelectOption}
              selectedOption={currentAnswer}
            />
          </AnimatePresence>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            variant="outline"
            className="flex items-center gap-2 px-6 py-6 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">이전</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentAnswer === null}
            className="flex items-center gap-2 px-6 py-6 bg-brand-primary hover:bg-brand-accent text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">
              {isLastQuestion ? '결과 보기' : '다음'}
            </span>
            <span className="sm:hidden">
              {isLastQuestion ? '완료' : '다음'}
            </span>
            {!isLastQuestion && <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

