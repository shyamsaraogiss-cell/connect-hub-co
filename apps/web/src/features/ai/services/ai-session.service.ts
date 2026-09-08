import type { AISessionMemory, AIConversationLog, BusinessCategory } from '../types/ai.types';

const SESSION_ID_KEY = 'chc_ai_session_id';
const MEMORY_KEY = 'chc_ai_session_memory';
const LOGS_KEY = 'chc_ai_conversation_logs';

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'session_ssr';
  let sid = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sid);
  }
  return sid;
}

export function getAISessionMemory(): AISessionMemory {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(MEMORY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function updateAISessionMemory(partial: Partial<AISessionMemory>): AISessionMemory {
  if (typeof window === 'undefined') return {};
  const current = getAISessionMemory();
  const updated: AISessionMemory = { ...current, ...partial };
  try {
    sessionStorage.setItem(MEMORY_KEY, JSON.stringify(updated));
  } catch {
    // Ignore quota errors
  }
  return updated;
}

export function logAIConversationStep(data: {
  intent: string;
  category: BusinessCategory;
  escalated: boolean;
  referenceId?: string;
  visibility?: 'CUSTOMER_VISIBLE' | 'INTERNAL_ONLY';
  userMessage?: string;
  aiResponse?: string;
}): AIConversationLog {
  const sessionId = getOrCreateSessionId();
  const logEntry: AIConversationLog = {
    id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    sessionId,
    timestamp: new Date().toISOString(),
    intent: data.intent,
    category: data.category,
    escalated: data.escalated,
    referenceId: data.referenceId,
    visibility: data.visibility || 'CUSTOMER_VISIBLE',
    userMessage: data.userMessage,
    aiResponse: data.aiResponse,
  };

  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(LOGS_KEY);
      const logs: AIConversationLog[] = raw ? JSON.parse(raw) : [];
      logs.push(logEntry);
      sessionStorage.setItem(LOGS_KEY, JSON.stringify(logs.slice(-50)));
    } catch {
      // Ignore quota errors
    }
  }

  return logEntry;
}

export function getAIConversationLogs(): AIConversationLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(LOGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
