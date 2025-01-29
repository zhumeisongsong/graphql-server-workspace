import { AIService, ChatParams, ChatResponse } from '@ai/domain';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

export class DeepSeekAdapter implements AIService {
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
}
