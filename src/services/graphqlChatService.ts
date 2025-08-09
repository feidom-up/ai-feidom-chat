// GraphQL API 服务
// 用于与 Cloudflare Worker GraphQL 接口通信

export interface GraphQLMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GraphQLChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  message: {
    role: string;
    content: string;
  };
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

export class GraphQLChatService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // 健康检查
  async checkHealth(): Promise<string> {
    const query = `
      query HealthCheck {
        health
      }
    `;

    const response = await this.executeQuery<{ health: string }>(query);
    
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    return response.data?.health || '';
  }

  // 发送聊天消息
  async sendChatMessage(
    messages: GraphQLMessage[],
    options: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
    } = {}
  ): Promise<GraphQLChatResponse> {
    const {
      model = 'gpt-3.5-turbo',
      temperature = 0.7,
      max_tokens = 1000,
      top_p = 1.0,
      frequency_penalty = 0.0,
      presence_penalty = 0.0
    } = options;

    const query = `
      mutation SendChatMessage(
        $messages: [MessageInput!]!
        $model: String
        $temperature: Float
        $max_tokens: Int
        $top_p: Float
        $frequency_penalty: Float
        $presence_penalty: Float
      ) {
        chat(
          messages: $messages
          model: $model
          temperature: $temperature
          max_tokens: $max_tokens
          top_p: $top_p
          frequency_penalty: $frequency_penalty
          presence_penalty: $presence_penalty
        ) {
          id
          object
          created
          model
          message {
            role
            content
          }
          usage {
            prompt_tokens
            completion_tokens
            total_tokens
          }
        }
      }
    `;

    const variables = {
      messages,
      model,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty
    };

    const response = await this.executeQuery<{ chat: GraphQLChatResponse }>(
      query,
      variables
    );

    if (response.errors) {
      throw new Error(response.errors[0].message);
    }

    if (!response.data?.chat) {
      throw new Error('未收到有效的聊天响应');
    }

    return response.data.chat;
  }

  // 执行 GraphQL 查询
  private async executeQuery<T>(
    query: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
      }

      const result: GraphQLResponse<T> = await response.json();
      return result;
    } catch (error) {
      console.error('GraphQL 请求失败:', error);
      throw new Error(
        error instanceof Error 
          ? `网络请求失败: ${error.message}` 
          : '未知网络错误'
      );
    }
  }
}

// 创建默认实例
const DEFAULT_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 
  'https://ai-feidom-graphql-worker.bcq9529.workers.dev/graphql';

export const graphqlChatService = new GraphQLChatService(DEFAULT_ENDPOINT);