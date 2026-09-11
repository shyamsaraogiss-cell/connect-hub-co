'use client';

import { MotionConfig, motion } from 'motion/react';
import styles from './HomeLanding.module.css';
import { FinalEnquireSection } from './components/FinalEnquireSection';
import { HomeHero } from './components/HomeHero';
import { WhyUsSection } from './components/WhyUsSection';

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

export function HomeLanding() {
  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.page}>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <HomeHero />
        </motion.div>
        <motion.div {...fadeUp}>
          <WhyUsSection />
        </motion.div>
        <motion.div {...fadeUp}>
          <FinalEnquireSection />
        </motion.div>
      </main>
    </MotionConfig>
  );
}
