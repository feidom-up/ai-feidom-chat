// AI Agent Service - 集成Cloudflare Worker部署的AI Agents
// 支持文档代理和天气代理

export interface AgentResponse {
  text: string;
  files?: any[];
  reasoningDetails?: any[];
  toolCalls?: any[];
  toolResults?: any[];
  finishReason: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  warnings?: any[];
  request?: any;
  response?: any;
  steps?: any[];
  sources?: any[];
}

export interface AgentError {
  message: string;
  status?: number;
}

// 可用的Agent类型
export enum AgentType {
  DOCS = 'docsAgent',
  WEATHER = 'weatherAgent'
}

export class AgentService {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.REACT_APP_AGENT_ENDPOINT || 'https://ai-feidom-docs-agent.bcq9529.workers.dev';
  }

  /**
   * 调用文档分析Agent
   * @param message 要分析的URL或文档内容
   * @returns 分析结果
   */
  async callDocsAgent(message: string): Promise<AgentResponse> {
    return this.callAgent(AgentType.DOCS, message);
  }

  /**
   * 调用天气Agent
   * @param message 天气查询信息
   * @returns 天气信息
   */
  async callWeatherAgent(message: string): Promise<AgentResponse> {
    return this.callAgent(AgentType.WEATHER, message);
  }

  /**
   * 通用Agent调用方法
   * @param agentType Agent类型
   * @param message 消息内容
   * @returns Agent响应
   */
  private async callAgent(agentType: AgentType, message: string): Promise<AgentResponse> {
    const url = `${this.baseURL}/api/agents/${agentType}/generate`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: message
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
      }

      const result: AgentResponse = await response.json();
      return result;
    } catch (error) {
      console.error(`调用${agentType}失败:`, error);
      throw new Error(
        error instanceof Error 
          ? `Agent调用失败: ${error.message}` 
          : '未知的Agent调用错误'
      );
    }
  }

  /**
   * 检测消息类型并自动选择合适的Agent
   * @param message 用户消息
   * @returns 检测到的Agent类型，如果不匹配则返回null
   */
  detectAgentType(message: string): AgentType | null {
    const lowerMessage = message.toLowerCase();
    
    // 检测URL模式 - 调用文档Agent
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    if (urlPattern.test(message)) {
      return AgentType.DOCS;
    }

    // 检测文档相关关键词
    const docsKeywords = [
      '分析文档', '文档分析', '解读文档', '文档内容', 
      '网站分析', '页面分析', '总结文档', '文档总结',
      'analyze document', 'document analysis', 'website analysis'
    ];
    
    if (docsKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return AgentType.DOCS;
    }

    // 检测天气相关关键词
    const weatherKeywords = [
      '天气', '气温', '温度', '下雨', '晴天', '阴天', '风', 
      'weather', 'temperature', 'rain', 'sunny', 'cloudy', 'wind'
    ];
    
    if (weatherKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return AgentType.WEATHER;
    }

    return null;
  }

  /**
   * 智能Agent调用 - 自动检测消息类型并调用相应Agent
   * @param message 用户消息
   * @returns Agent响应或null（如果不匹配任何Agent）
   */
  async smartCall(message: string): Promise<AgentResponse | null> {
    const agentType = this.detectAgentType(message);
    
    if (!agentType) {
      return null;
    }

    return this.callAgent(agentType, message);
  }
}

// 创建默认实例
export const agentService = new AgentService();
