'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="text-center py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          나에게 맞는 취미를 찾아보세요
        </h1>
        <motion.p
          className="text-gray-500 text-base md:text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          운동형, 지능형, 예술형 중에서 선택하세요
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-accent hover:to-brand-primary text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/test" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              나에게 맞는 취미 유형 테스트
            </Link>
          </Button>
          <p className="text-sm text-gray-400 mt-3">
            간단한 질문 6개로 알아보는 나의 취미 유형
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

