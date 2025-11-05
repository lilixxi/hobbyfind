'use client';

import { motion } from 'framer-motion';
import { CATEGORIES, CATEGORY_DESCRIPTIONS, type CategoryType } from '@/constants/hobbies';

interface CategoryHeaderProps {
  category: CategoryType;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <section className="text-center py-10 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {CATEGORIES[category]}
        </h1>
        <motion.p
          className="text-gray-500 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          {CATEGORY_DESCRIPTIONS[category]}
        </motion.p>
      </motion.div>
    </section>
  );
}

