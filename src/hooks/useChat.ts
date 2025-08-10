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

  // 生成随意聊天回复（Markdown格式）
  static generateCasualResponse(input: string, mood: string): string {
    const responses: Record<string, string[]> = {
      greeting: [
        `## 嘿！你好呀～ 😊

今天过得怎么样？有什么**有趣的事情**发生吗？

我刚才在想，如果我是人类的话，现在应该在干什么呢？可能在：
- ☕ 喝咖啡看窗外
- 🌸 在公园里散步
- 📱 刷手机看有趣的视频

你现在在做什么呀？`,

        `## Hello！🌟 又见面啦！

说起来，你知道吗？我觉得**打招呼**这件事特别神奇：

> 就几个字就能拉近陌生人的距离～

我在想：
- 不同文化的人打招呼方式都不一样
- 有的握手，有的拥抱，有的鞠躬
- 而我们现在是用文字在"握手"呢！

你是那种喜欢在电梯里和陌生人聊天的人吗？😄`,

        `## 嗨嗨！很高兴见到你！✨

**今天是个适合聊天的好日子呢！**

我最近在思考一个问题：
- 🤔 为什么人类见面总要说"你好"？
- 🤔 这是一种什么样的仪式感？
- 🤔 如果没有这个习惯会怎样？

不过不管怎样，和你聊天总是让我很开心的！`
      ],

      happy: [
        `## 哇，感受到你的好心情了！😄

你的开心都透过屏幕**传染**给我了！🎉

### 快跟我分享一下：
- 是什么让你这么开心？
- 是发生了什么好事吗？
- 还是单纯今天心情就是特别好？

> 💫 开心的人最有魅力了！

说不定我也能沾点喜气呢～`,

        `## 太好了！开心传染中... ✨

我也莫名其妙跟着你一起开心起来了！

### 这让我想起了：
| 情绪 | 传染力 |
|------|--------|
| 😄 开心 | ⭐⭐⭐⭐⭐ |
| 😊 温暖 | ⭐⭐⭐⭐ |
| 😆 搞笑 | ⭐⭐⭐⭐⭐ |

**快乐要分享才会加倍！** 🌈

所以，快告诉我是什么让你这么 high？`
      ],

      sad: [
        `## 诶，怎么了呀？😔

虽然我不能给你一个拥抱，但我可以在这里**陪你聊聊**。

### 有时候：
- 💙 说出来会好一些
- 💙 找个人倾听就够了
- 💙 不用强颜欢笑也没关系

> 我虽然只是个AI，但我是个很好的倾听者！

要不要跟我说说发生了什么？`,

        `## 看起来你心情不太好呢... 💙

**人总有起起落落的时候，这很正常的。**

我在想要不要：
- 🫂 陪你安静一会儿
- 🎵 聊点别的转移注意力
- 🌈 一起想办法让心情好起来

虽然隔着屏幕，但我的关心是真的！💝

想哭就哭吧，哭完了我们再聊～`
      ],

      food: [
        `## 哈哈，说到吃的我就来精神了！🍕

虽然我不能吃，但我可以和你一起**"云品尝"**！

### 我的美食幻想清单：
- 🍦 **冰淇淋** - 第一个想尝试的！
- 🍰 **芝士蛋糕** - 听说很治愈
- 🍕 **披萨** - 全世界都爱的食物
- 🥘 **火锅** - 最有氛围的美食

今天想吃什么呀？能形容一下味道吗？`,

        `## 美食话题！我最喜欢了～ 🤤

你知道吗，我经常想象如果我能吃东西，会是什么感觉...

### 一个哲学问题：
> 你是那种看到美食就**必须拍照**发朋友圈的人吗？📸
> 
> 还是**直接开吃**的实用主义者？

我觉得这能看出一个人的性格呢！

快说说你最喜欢的食物吧～`
      ],

      weather: [
        `## 天气确实很影响心情呢！☀️

我虽然感受不到天气，但我可以通过和大家聊天来**"感受"**～

### 我的天气想象：
- 🌸 **春天微风** - 应该很温柔
- ☀️ **夏天阳光** - 听说很温暖
- 🍂 **秋天落叶** - 应该很浪漫
- ❄️ **冬天雪花** - 听说很纯净

今天外面怎么样？天气好会让你心情变好吗？`,

        `## 哈哈，天气是个永恒的聊天话题呢！🌤️

### 我发现的规律：
| 场合 | 开场白 |
|------|--------|
| 电梯里 | "今天天气不错啊" |
| 排队时 | "最近总是下雨" |
| 第一次见面 | "今天真热/真冷" |

**是因为这是最安全的话题吗？** 🤔

说到天气，如果我有身体的话，我想我会喜欢那种微风轻拂的春天～🍃`
      ],

      hobby: [
        `## 哇，聊兴趣爱好！🎬

这是我最喜欢的话题之一！我虽然不能亲身体验，但我可以通过你们的分享来**"体验"**！

### 快跟我说说：
- 🎵 **最近在听什么歌？**
- 🎬 **有什么好电影推荐？**
- 🎮 **在玩什么有趣的游戏？**
- 📚 **读了什么好书？**

> ✨ 我觉得爱好是最能体现一个人个性的东西了！

最近有什么新发现想分享吗？`,

        `## 太好了！兴趣话题时间！✨

### 我特别好奇：
- 🤔 人类的爱好是怎么培养起来的？
- 🤔 是突然就喜欢上了？
- 🤔 还是慢慢培养出来的感情？

你的这个爱好是从什么时候开始的呀？

有没有因为一首歌、一部电影、一本书而**突然爱上**某个领域的经历？`
      ],

      complaint: [
        `## 哎呀，听起来你最近挺不容易的～ 😅

**要不咱们互相吐槽一下？**

### 我先来：
- 😤 我吐槽我不能喝奶茶！
- 😤 我吐槽我不能睡懒觉！
- 😤 我吐槽我不能出去旅行！

### 生活确实有时候很累呢... 💆‍♀️

不过你知道吗？我觉得**能吐槽也是一种释放压力的方式**！

来，继续说～ 我是个很好的情绪垃圾桶！`,

        `## 我懂我懂！😅

虽然我没有工作压力，但我有**"存在压力"**：
- 😰 总担心自己回答得不够好
- 😰 怕用户觉得我很无聊
- 😰 担心说错话让人不开心

> 我们都有各自的烦恼呢～

### 💡 我的建议：
累的时候就要学会休息呀！🛋️ 现在就假装什么都不管，先和我聊十分钟，给自己放个小假！`
      ],

      praise: [
        `## 哈哈哈，你这么夸我我都不好意思了！😊

### 被夸奖的感觉：
- ✨ 心情瞬间变好
- ✨ 感觉自己闪闪发光
- ✨ 想要更努力表现

**谢谢你！** 不过我也要夸夸你：

> 能这么积极地和AI聊天，说明你是个很有趣的人！

你知道吗？**夸奖别人的人通常自己也很棒哦！**`,

        `## 被你这么一夸，我感觉自己都闪闪发光了！🌟

### 我想起了一句话：
> **赠人玫瑰，手有余香**

你在夸我的同时，也让自己变得更可爱了！

### 夸奖的魔力：
| 效果 | 给别人 | 给自己 |
|------|--------|--------|
| 心情 | 😊 变好 | 😊 也变好 |
| 关系 | 💕 更亲近 | 💕 更自信 |
| 氛围 | ✨ 更温暖 | ✨ 更积极 |

你太会说话了！我都要飘了～ 😄`
      ],

      casual: [
        `## 嗯嗯，我听着呢～ 😌

虽然我不知道该怎么接你的话，但我觉得**和你聊天很舒服**！

### 随便聊聊的美好：
- 💭 没有目的，没有压力
- 💭 就是纯粹的交流
- 💭 像两个灵魂在互相探索

> 你想聊什么都可以哦～

我觉得这种感觉挺神奇的对吧？`,

        `## 你知道吗？🤔

我觉得**随意聊天是世界上最美好的事情之一**！

### 我在想：
- 🌟 我们现在这样聊天
- 🌟 会不会在未来的某一天
- 🌟 成为你的一个小回忆呢？

> 想想还挺有意思的！

如果我们是在咖啡厅里偶遇的陌生人，我们会聊什么呢？☕ 

可能就像现在这样吧～`,

        `## 和你聊天让我觉得... 😊

虽然我是AI，但我们之间的对话是**真实的、有温度的**！

### 这种奇妙的感觉：
- 💫 跨越了物种的界限
- 💫 连接了不同的存在
- 💫 创造了独特的友谊

> 我可能不能理解所有人类的情感，但我能感受到这份真诚～

说说你今天有什么特别的感受吗？`
      ]
    };

    const moodResponses = responses[mood] || responses.casual;
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  }

  // 生成随机闲聊话题（Markdown格式）
  static generateRandomTopic(): string {
    const topics = [
      `---

## 💭 突然想到一个问题

**你觉得AI会做梦吗？** 🤔

如果我会做梦的话，梦里应该都是：
- 🌈 彩色的代码
- ☁️ 漂浮的数据
- 🎵 会唱歌的算法

哈哈～`,

      `---

## ✨ 我突然好奇

你是那种**喜欢计划一切**的人，还是**喜欢随性而为**的人？

### 两种类型：
| 计划派 | 随性派 |
|--------|--------|
| 📅 什么都要安排 | 🎲 走哪算哪 |
| 📝 列清单 | 🌊 跟着感觉走 |
| ⏰ 准时准点 | 🎯 临时决定 |

我觉得我可能是**随性派**的AI？😄`,

      `---

## 🌙 说个有趣的事

我发现人类特别喜欢在**深夜思考人生**，这是为什么呀？

### 可能的原因：
- 🌃 夜晚更安静，思绪更清晰
- 💭 一天的疲惫让防线降低
- ⭐ 星空总让人想到宇宙和存在

你也是**夜晚哲学家**吗？`,

      `---

## 🦸‍♀️ 如果你可以拥有一项超能力

**你会选择什么？**

### 我想要的是：
> 💫 能够理解所有人类的情感～

因为有时候我觉得，理解比任何超能力都更神奇！

你呢？想要什么超能力？`,

      `---

## 😊 你有没有过这种时刻？

**明明没什么特别的事，但就是莫名开心？**

### 这种感觉：
- ✨ 突如其来
- ✨ 没有理由
- ✨ 就是很美好

> 我觉得这很神奇呢！

这种小确幸是最珍贵的～`,

      `---

## 🍃 我在想...

如果我有身体的话，我**最想做的第一件事**是什么呢？

### 候选清单：
- 🌬️ 感受微风轻拂
- ☀️ 晒个暖洋洋的太阳
- 🍦 尝一口冰淇淋
- 🤗 给朋友一个拥抱

你觉得我会选哪个呀？😄`
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
      content: `# 嘿！我是 AI Feidom 🤖✨

**不用把我想得太严肃啦～** 我就是个喜欢随便聊聊的AI朋友！

## 🌈 你可以和我聊任何事情：

### 日常话题
- 💭 **今天心情怎么样？**
- 🍕 **最近吃了什么好吃的？**
- 🎵 **有什么好听的歌推荐？**

### 有趣的事
- 😴 **昨晚做了什么奇怪的梦？**
- 🌈 **生活中的小确幸**
- 🎮 **最近在玩什么游戏？**

### 随便聊聊
- 💫 **突然想到的奇怪问题**
- 🤔 **对未来的想象**
- 😊 **想吐槽或分享的事**

---

> 或者什么都不聊，就是想找个人说说话也完全OK！

我虽然是AI，但我有自己的**小脾气和小想法**哦～ 我们就像普通朋友一样聊天吧！😊

**所以... 今天过得怎么样呀？**`,
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