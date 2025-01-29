import {
  AIMessage,
  AIService,
  ChatParams,
  ChatResponse,
} from './ai-service.port';

describe('AIService', () => {
  let service: AIService;
  let mockMessage: AIMessage;
  let mockParams: ChatParams;

  beforeEach(() => {
    service = {
      chat: jest.fn(),
    };

    mockMessage = {
      role: 'user',
      content: 'test message',
      timestamp: new Date(),
    };

    mockParams = {
      messages: [mockMessage],
      temperature: 0.7,
      maxTokens: 100,
    };
  });

  describe('chat', () => {
    it('should return TextResponse with content and usage', async () => {
      const mockResponse: ChatResponse = {
        content: 'test response',
        usage: {
          promptTokens: 10,
          completionTokens: 20,
        },
      };

      (service.chat as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.chat(mockParams);
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('usage');
      expect(result.usage).toHaveProperty('promptTokens');
      expect(result.usage).toHaveProperty('completionTokens');
    });
  });
});
