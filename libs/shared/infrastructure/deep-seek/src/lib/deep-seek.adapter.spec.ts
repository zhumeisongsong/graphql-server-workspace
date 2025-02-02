import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { DeepSeekAdapter } from './deep-seek.adapter';

describe('DeepSeekAdapter', () => {
  let adapter: DeepSeekAdapter;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(() => {
    httpService = {
      axiosRef: {
        post: jest.fn(),
      },
    } as any;

    configService = {
      get: jest.fn(),
    } as any;

    adapter = new DeepSeekAdapter(httpService, configService);
  });

  describe('chat', () => {
    it('should make a POST request with correct parameters', async () => {
      const mockResponse = {
        data: {
          choices: [{ message: { content: 'Test response' } }],
          usage: {
            prompt_tokens: 10,
            completion_tokens: 20,
          },
        },
      };

      (httpService.axiosRef.post as jest.Mock).mockResolvedValue(mockResponse);
      (configService.get as jest.Mock).mockImplementation((key: string) => {
        if (key === 'DEEP_SEEK_API_URL') return 'http://api.test';
        if (key === 'DEEP_SEEK_API_KEY') return 'test-key';
        return null;
      });

      const result = await adapter.chat({
        messages: [{ role: 'user', content: 'Hello', timestamp: new Date() }],
        temperature: 0.7,
      });

      expect(httpService.axiosRef.post).toHaveBeenCalledWith(
        'http://api.test',
        {
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'Hello', timestamp: expect.any(Date) }],
          temperature: 0.7,
          response_format: {},
        },
        {
          headers: {
            Authorization: 'Bearer test-key',
          },
        },
      );

      expect(result).toEqual({
        content: 'Test response',
        usage: {
          promptTokens: 10,
          completionTokens: 20,
        },
      });
    });
  });
});
