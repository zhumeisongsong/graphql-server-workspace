export type AIMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
};

export type ChatParams = {
  messages: AIMessage[];
  temperature?: number;
  maxTokens?: number;
  json?: boolean;
};

export type ChatResponse = {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
};

export interface AIService {
  chat(params: ChatParams): Promise<ChatResponse>;
}

export const AI_SERVICE = Symbol('AI_SERVICE');
