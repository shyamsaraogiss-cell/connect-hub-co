import type { AIOptionPrompt } from '../types/ai.types';

export type ApprovedBrowserQuestion = AIOptionPrompt & {
  sourceId: string;
  displayNumber: number;
};

/**
 * Public Q&A dataset is intentionally empty.
 * The approved 1,847 Q&A Golden Master has not yet been installed.
 */
export const APPROVED_QUESTION_BROWSER_DATASET:
  readonly ApprovedBrowserQuestion[] = Object.freeze([]);
