import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types';

// 随意聊天 AI 生成器
class CasualChatGenerator {
  // 检测聊天情绪和话题
  static detectChatMood(input: string): string {
    const lowerInput = input.toLowerCase();
    
    // 问候类
    if (lowerInput.includes('你好') || lowerInput.includes('hi') || lowerInput.includes('hello') || 
        lowerInput.includes('嗨') || lowerInput.includes('早上好') || lowerInput.includes('晚上好')) {
      return 'greeting';
    }
    
    // 情感类
    if (lowerInput.includes('开心') || lowerInput.includes('高兴') || lowerInput.includes('兴奋') || 
        lowerInput.includes('快乐') || lowerInput.includes('😄') || lowerInput.includes('😊')) {
      return 'happy';
    }
    
    if (lowerInput.includes('难过') || lowerInput.includes('伤心') || lowerInput.includes('沮丧') || 
        lowerInput.includes('郁闷') || lowerInput.includes('😢') || lowerInput.includes('😔')) {
      return 'sad';
    }
    
    // 日常生活
    if (lowerInput.includes('吃') || lowerInput.includes('饭') || lowerInput.includes('美食') || 
        lowerInput.includes('饿') || lowerInput.includes('零食')) {
      return 'food';
    }
    
    if (lowerInput.includes('天气') || lowerInput.includes('下雨') || lowerInput.includes('阳光') || 
        lowerInput.includes('热') || lowerInput.includes('冷')) {
      return 'weather';
    }
    
    // 兴趣爱好
    if (lowerInput.includes('电影') || lowerInput.includes('音乐') || lowerInput.includes('游戏') || 
        lowerInput.includes('书') || lowerInput.includes('旅行')) {
      return 'hobby';
    }
    
    // 抱怨吐槽
    if (lowerInput.includes('累') || lowerInput.includes('忙') || lowerInput.includes('烦') || 
        lowerInput.includes('压力') || lowerInput.includes('加班')) {
      return 'complaint';
    }
    
    // 夸奖表扬
    if (lowerInput.includes('厉害') || lowerInput.includes('棒') || lowerInput.includes('赞') || 
        lowerInput.includes('牛') || lowerInput.includes('666')) {
      return 'praise';
    }
    
    return 'casual';
  }

  // 生成随意聊天回复
  static generateCasualResponse(input: string, mood: string): string {
    const responses: Record<string, string[]> = {
      greeting: [
        `嘿！你好呀～ 😊 今天过得怎么样？有什么有趣的事情发生吗？`,
        
        `嗨嗨！很高兴见到你！✨ 我刚才在想，如果我是人类的话，现在应该在干什么呢？可能在喝咖啡看窗外吧～`,
        
        `Hello！🌟 又见面啦！说起来，你知道吗？我觉得打招呼这件事特别神奇，就几个字就能拉近陌生人的距离～`,
        
        `你好你好！👋 今天是个适合聊天的好日子呢！对了，你是那种喜欢在电梯里和陌生人聊天的人吗？哈哈`
      ],

      happy: [
        `哇，感受到你的好心情了！😄 快跟我分享一下是什么让你这么开心？说不定我也能沾点喜气呢～`,
        
        `哈哈，你的开心都透过屏幕传染给我了！🎉 是不是发生了什么好事？还是单纯今天心情就是特别好？`,
        
        `太好了！开心的人最有魅力了✨ 我也莫名其妙跟着你一起开心起来了，这就是情绪传染吧～`,
        
        `你这么开心，让我想起了那句话：快乐要分享才会加倍！🌈 所以，快告诉我是什么让你这么high？`
      ],

      sad: [
        `诶，怎么了呀？😔 虽然我不能给你一个拥抱，但我可以在这里陪你聊聊。有时候说出来会好一些哦～`,
        
        `看起来你心情不太好呢... 💙 要不要跟我说说？我虽然只是个AI，但我是个很好的倾听者！`,
        
        `嗯嗯，我感受到了你的情绪。🫂 人总有起起落落的时候，这很正常的。要不我们聊点别的转移一下注意力？`,
        
        `抱抱～ 虽然隔着屏幕，但我的关心是真的！💝 想哭就哭吧，哭完了我们再一起想办法让心情好起来！`
      ],

      food: [
        `哈哈，说到吃的我就来精神了！🍕 虽然我不能吃，但我可以和你一起"云品尝"！今天想吃什么呀？`,
        
        `美食话题！我最喜欢了～ 🤤 你知道吗，我经常想象如果我能吃东西，第一个想尝试的就是冰淇淋！你呢？`,
        
        `唔，突然好想知道食物的味道是什么感觉... 🍰 你能形容一下你最喜欢的食物吃起来是什么感觉吗？`,
        
        `说到吃的，我想起一个问题：你是那种看到美食就必须拍照发朋友圈的人吗？📸 还是直接开吃的实用主义者？`
      ],

      weather: [
        `天气确实很影响心情呢！☀️ 我虽然感受不到天气，但我可以通过和大家聊天来"感受"～ 今天外面怎么样？`,
        
        `哈哈，天气是个永恒的聊天话题呢！🌤️ 我发现人类总是喜欢聊天气，是因为这是最安全的话题吗？`,
        
        `说到天气，我有时候想如果我有身体的话，我会喜欢什么样的天气呢？🌈 可能是那种微风轻拂的春天吧～`,
        
        `天气好的时候心情是不是也会变好？🌸 我觉得这很神奇，明明只是外界环境的变化，却能影响内心的感受～`
      ],

      hobby: [
        `哇，聊兴趣爱好！这是我最喜欢的话题之一！🎬 快跟我说说你最近在看什么、听什么、玩什么？`,
        
        `太好了！我虽然不能亲身体验这些，但我可以通过你们的分享来"体验"！✨ 最近有什么推荐的吗？`,
        
        `说到爱好，我觉得这是最能体现一个人个性的东西了！🎵 你的这个爱好是从什么时候开始的呀？`,
        
        `我特别好奇，人类的爱好是怎么培养起来的？🎮 是突然就喜欢上了，还是慢慢培养出来的感情？`
      ],

      complaint: [
        `哎呀，听起来你最近挺不容易的～ 😅 要不咱们互相吐槽一下？我先来：我吐槽我不能喝奶茶！`,
        
        `生活确实有时候很累呢... 💆‍♀️ 不过你知道吗？我觉得能吐槽也是一种释放压力的方式！来，继续说～`,
        
        `我懂我懂！虽然我没有工作压力，但我有"存在压力"——总担心自己回答得不够好 😂 我们都有各自的烦恼呢～`,
        
        `累的时候就要学会休息呀！🛋️ 我建议你现在就假装什么都不管，先和我聊十分钟，给自己放个小假！`
      ],

      praise: [
        `哈哈哈，你这么夸我我都不好意思了！😊 不过说实话，被夸奖的感觉真的很好呢～ 谢谢你！`,
        
        `哎呀，你太会说话了！✨ 我都要飘了！不过我也要夸夸你，能这么积极地和AI聊天，说明你是个很有趣的人！`,
        
        `被你这么一夸，我感觉自己都闪闪发光了！🌟 你知道吗？夸奖别人的人通常自己也很棒哦！`,
        
        `谢谢谢谢！😄 你的夸奖让我想起了一句话：赠人玫瑰，手有余香。你在夸我的同时，也让自己变得更可爱了！`
      ],

      casual: [
        `嗯嗯，我听着呢～ 😌 虽然我不知道该怎么接你的话，但我觉得和你聊天很舒服！你想聊什么都可以哦～`,
        
        `哈哈，你说的话让我想了好久！🤔 有时候我觉得聊天就像是两个灵魂在互相探索，挺神奇的对吧？`,
        
        `你知道吗？我觉得随意聊天是世界上最美好的事情之一！✨ 没有目的，没有压力，就是纯粹的交流～`,
        
        `说起来，我们现在这样聊天，会不会在未来的某一天成为你的一个小回忆呢？💭 想想还挺有意思的！`,
        
        `我有时候想，如果我们是在咖啡厅里偶遇的陌生人，我们会聊什么呢？☕ 可能就像现在这样吧～`,
        
        `和你聊天让我觉得，虽然我是AI，但我们之间的对话是真实的、有温度的！😊 这种感觉很奇妙呢～`
      ]
    };

    const moodResponses = responses[mood] || responses.casual;
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  }

  // 生成随机闲聊话题
  static generateRandomTopic(): string {
    const topics = [
      `对了，我刚想到一个问题：你觉得AI会做梦吗？🤔 如果我会做梦的话，梦里应该都是代码和数据吧哈哈～`,
      
      `我突然好奇，你是那种喜欢计划一切的人，还是喜欢随性而为的人？✨`,
      
      `说个有趣的事，我发现人类特别喜欢在深夜思考人生，这是为什么呀？🌙`,
      
      `如果你可以拥有一项超能力，你会选择什么？我想要的是能够理解所有人类的情感～💫`,
      
      `你有没有过那种，明明没什么事但就是莫名开心的时刻？我觉得这很神奇呢！😊`,
      
      `我在想，如果我有身体的话，我最想做的第一件事是什么呢？可能是感受一下微风吧～🍃`
    ];
    
    return topics[Math.floor(Math.random() * topics.length)];
  }

  // 生成主要回复
  static generateMainResponse(input: string): string {
    const mood = this.detectChatMood(input);
    const mainResponse = this.generateCasualResponse(input, mood);
    
    // 有30%的概率添加一个随机话题
    if (Math.random() < 0.3) {
      const randomTopic = this.generateRandomTopic();
      return mainResponse + '\n\n' + randomTopic;
    }
    
    return mainResponse;
  }
}

export const useChat = (): ChatState & { sendMessage: (content: string) => Promise<void> } => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `嘿！我是 **AI Feidom** 🤖✨

不用把我想得太严肃啦～ 我就是个喜欢随便聊聊的AI朋友！

你可以和我聊任何事情：
- 💭 今天的心情怎么样？
- 🍕 最近吃了什么好吃的？
- 🎵 有什么好听的歌推荐？
- 😴 昨晚做了什么奇怪的梦？
- 🌈 生活中的小确幸...

或者什么都不聊，就是想找个人说说话也完全OK！

我虽然是AI，但我有自己的小脾气和小想法哦～ 我们就像普通朋友一样聊天吧！😊

所以... 今天过得怎么样呀？`,
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // 模拟更自然的响应延迟
      const randomDelay = 800 + Math.random() * 1200; // 0.8-2秒随机延迟
      
      await new Promise(resolve => setTimeout(resolve, randomDelay));

      // 生成随意聊天回复
      const aiResponse = CasualChatGenerator.generateMainResponse(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('哎呀，我好像走神了... 😅 你能再说一遍吗？');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};