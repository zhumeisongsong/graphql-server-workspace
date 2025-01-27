import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

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

export class DeepSeekAdapter {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async chat(params: ChatParams): Promise<ChatResponse> {
    const apiUrl: string = this.configService.get('DEEPSEEK_API_URL') ?? '';
    const apiKey: string = this.configService.get('DEEPSEEK_API_KEY') ?? '';
    const response = await this.httpService.axiosRef.post(
      apiUrl,
      {
        model: 'deepseek-chat',
        messages: params.messages,
        temperature: params.temperature,
        response_format: params.json ? { type: 'json_object' } : {},
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return {
      content: response.data.choices[0].message.content,
      usage: {
        promptTokens: response.data.usage.prompt_tokens,
        completionTokens: response.data.usage.completion_tokens,
      },
    };
  }

  async *streamChat(params: ChatParams): AsyncIterable<string> {
    const apiUrl: string = this.configService.get('DEEPSEEK_API_URL') ?? '';
    const apiKey: string = this.configService.get('DEEPSEEK_API_KEY') ?? '';
    const response = await this.httpService.axiosRef.post(
      apiUrl,
      {
        model: 'deepseek-chat',
        messages: params.messages,
        temperature: params.temperature,
        stream: true,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        responseType: 'stream',
      },
    );

    for await (const chunk of response.data) {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.choices[0].delta.content) {
              yield data.choices[0].delta.content;
            }
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
}
