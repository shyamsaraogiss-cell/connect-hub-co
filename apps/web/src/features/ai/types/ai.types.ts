export type BusinessCategory =
  | 'pitru-moksha-gaya'
  | 'ritual-services'
  | 'travel-assistance'
  | 'vahi-records'
  | 'religious-partners'
  | 'booking'
  | 'inquiry'
  | 'tracking'
  | 'complaint'
  | 'grievance'
  | 'founder-support'
  | 'company-info';

export type AIMessageSender = 'AI' | 'USER';

export type AIMessage = {
  id: string;
  sender: AIMessageSender;
  text: string;
  timestamp: string;
  options?: AIOptionPrompt[];
  requiresLeadCollection?: boolean;
};

export type AIOptionPrompt = {
  id: string;
  label: string;
  response: string;
  nextStepId?: string;
  suggestedService?: string;
  requiresLeadCollection?: boolean;
};

export type AILeadCollectionData = {
  name: string;
  country: string;
  whatsApp: string;
  suggestedService: string;
  ancestorDetails?: string;
};

export type AIConversationTree = {
  categoryId: BusinessCategory;
  title: string;
  greeting: string;
  initialPrompts: AIOptionPrompt[];
  fallbackResponse: string;
};

export interface AISessionMemory {
  customerName?: string;
  interestedService?: string;
  country?: string;
  preferredLanguage?: string;
  conversationContext?: string;
}

export interface AIConversationLog {
  id: string;
  sessionId: string;
  timestamp: string;
  intent: string;
  category: BusinessCategory;
  escalated: boolean;
  referenceId?: string;
  visibility: 'CUSTOMER_VISIBLE' | 'INTERNAL_ONLY';
  userMessage?: string;
  aiResponse?: string;
}
