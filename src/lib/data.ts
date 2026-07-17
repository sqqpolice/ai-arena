import { AIModel, ModelScores, RankedModel, RankingCategory, CategoryConfig } from '@/types/model'

// ===== Mock Data =====
// 后续替换为真实数据库/API 调用

const models: AIModel[] = [
  {
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'OpenAI',
    logoUrl: '',
    releaseDate: '2025-06-01',
    description: 'OpenAI 最新旗舰模型，在推理、编程和多语言方面表现卓越。',
    websiteUrl: 'https://openai.com',
    status: 'active',
  },
  {
    id: 'claude-4-opus',
    name: 'Claude 4 Opus',
    provider: 'Anthropic',
    logoUrl: '',
    releaseDate: '2025-05-01',
    description: 'Anthropic 最强模型，擅长长文写作和复杂推理任务。',
    websiteUrl: 'https://anthropic.com',
    status: 'active',
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    logoUrl: '',
    releaseDate: '2025-04-01',
    description: 'Google DeepMind 旗舰模型，拥有超长上下文窗口。',
    websiteUrl: 'https://deepmind.google',
    status: 'active',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    logoUrl: '',
    releaseDate: '2025-01-20',
    description: '深度求索推理模型，数学和编程能力突出，性价比极高。',
    websiteUrl: 'https://deepseek.com',
    status: 'active',
  },
  {
    id: 'qwen-3-235b',
    name: 'Qwen3 235B',
    provider: 'Alibaba',
    logoUrl: '',
    releaseDate: '2025-05-01',
    description: '阿里通义千问最新开源大模型，中英文能力均衡。',
    websiteUrl: 'https://qwen.ai',
    status: 'active',
  },
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    logoUrl: '',
    releaseDate: '2025-04-05',
    description: 'Meta 最新开源 MoE 模型，多模态能力强大。',
    websiteUrl: 'https://llama.meta.com',
    status: 'active',
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    provider: 'xAI',
    logoUrl: '',
    releaseDate: '2025-02-18',
    description: 'xAI 旗舰模型，实时信息获取能力强。',
    websiteUrl: 'https://x.ai',
    status: 'active',
  },
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral AI',
    logoUrl: '',
    releaseDate: '2025-03-01',
    description: 'Mistral 最强模型，欧洲 AI 代表，多语言能力出色。',
    websiteUrl: 'https://mistral.ai',
    status: 'active',
  },
  {
    id: 'command-r-plus-2',
    name: 'Command R+ (2nd Gen)',
    provider: 'Cohere',
    logoUrl: '',
    releaseDate: '2025-03-15',
    description: 'Cohere 企业级模型，RAG 和工具调用能力优秀。',
    websiteUrl: 'https://cohere.com',
    status: 'active',
  },
  {
    id: 'yi-lightning',
    name: 'Yi-Lightning',
    provider: '01.AI',
    logoUrl: '',
    releaseDate: '2025-01-10',
    description: '零一万物高性价比模型，中文理解能力出色。',
    websiteUrl: 'https://01.ai',
    status: 'active',
  },
]

const scores: ModelScores[] = [
  {
    modelId: 'gpt-5', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1385, eloChange: 12,
    codingScore: 95, writingScore: 93, mathScore: 96, reasoningScore: 97,
    creativityScore: 91, multilingualScore: 90,
    pricePerMillionInput: 10.0, pricePerMillionOutput: 30.0,
    contextWindow: 200000, latencyMs: 850, tokensPerSecond: 85,
    source: 'lmsys',
  },
  {
    modelId: 'claude-4-opus', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1372, eloChange: 8,
    codingScore: 94, writingScore: 97, mathScore: 91, reasoningScore: 95,
    creativityScore: 96, multilingualScore: 88,
    pricePerMillionInput: 15.0, pricePerMillionOutput: 75.0,
    contextWindow: 200000, latencyMs: 920, tokensPerSecond: 72,
    source: 'lmsys',
  },
  {
    modelId: 'gemini-2-5-pro', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1358, eloChange: -3,
    codingScore: 92, writingScore: 89, mathScore: 94, reasoningScore: 93,
    creativityScore: 87, multilingualScore: 93,
    pricePerMillionInput: 3.5, pricePerMillionOutput: 10.5,
    contextWindow: 1000000, latencyMs: 780, tokensPerSecond: 90,
    source: 'lmsys',
  },
  {
    modelId: 'deepseek-r1', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1340, eloChange: 15,
    codingScore: 96, writingScore: 82, mathScore: 97, reasoningScore: 96,
    creativityScore: 78, multilingualScore: 85,
    pricePerMillionInput: 0.55, pricePerMillionOutput: 2.19,
    contextWindow: 128000, latencyMs: 1200, tokensPerSecond: 55,
    source: 'lmsys',
  },
  {
    modelId: 'qwen-3-235b', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1318, eloChange: 5,
    codingScore: 89, writingScore: 88, mathScore: 90, reasoningScore: 91,
    creativityScore: 85, multilingualScore: 92,
    pricePerMillionInput: 2.0, pricePerMillionOutput: 6.0,
    contextWindow: 131072, latencyMs: 650, tokensPerSecond: 95,
    source: 'api',
  },
  {
    modelId: 'llama-4-maverick', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1295, eloChange: -2,
    codingScore: 87, writingScore: 84, mathScore: 86, reasoningScore: 88,
    creativityScore: 83, multilingualScore: 86,
    pricePerMillionInput: 0.5, pricePerMillionOutput: 0.5,
    contextWindow: 1000000, latencyMs: 500, tokensPerSecond: 120,
    source: 'openrouter',
  },
  {
    modelId: 'grok-3', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1310, eloChange: 7,
    codingScore: 88, writingScore: 86, mathScore: 89, reasoningScore: 90,
    creativityScore: 84, multilingualScore: 82,
    pricePerMillionInput: 3.0, pricePerMillionOutput: 15.0,
    contextWindow: 131072, latencyMs: 700, tokensPerSecond: 88,
    source: 'api',
  },
  {
    modelId: 'mistral-large-3', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1278, eloChange: 3,
    codingScore: 85, writingScore: 87, mathScore: 83, reasoningScore: 86,
    creativityScore: 88, multilingualScore: 91,
    pricePerMillionInput: 2.0, pricePerMillionOutput: 6.0,
    contextWindow: 128000, latencyMs: 600, tokensPerSecond: 100,
    source: 'openrouter',
  },
  {
    modelId: 'command-r-plus-2', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1245, eloChange: -5,
    codingScore: 80, writingScore: 83, mathScore: 78, reasoningScore: 82,
    creativityScore: 79, multilingualScore: 88,
    pricePerMillionInput: 2.5, pricePerMillionOutput: 10.0,
    contextWindow: 128000, latencyMs: 550, tokensPerSecond: 105,
    source: 'api',
  },
  {
    modelId: 'yi-lightning', capturedAt: '2026-07-17T00:00:00Z',
    eloScore: 1220, eloChange: 1,
    codingScore: 78, writingScore: 80, mathScore: 76, reasoningScore: 79,
    creativityScore: 81, multilingualScore: 89,
    pricePerMillionInput: 0.3, pricePerMillionOutput: 0.3,
    contextWindow: 200000, latencyMs: 400, tokensPerSecond: 130,
    source: 'api',
  },
]

// ===== Data Access Layer =====

function computeValueScore(s: ModelScores): number {
  // 性价比 = 综合质量分 / 加权价格
  const qualityScore = (
    s.codingScore * 0.2 +
    s.writingScore * 0.15 +
    s.mathScore * 0.2 +
    s.reasoningScore * 0.2 +
    s.creativityScore * 0.1 +
    s.multilingualScore * 0.15
  )
  const avgPrice = (s.pricePerMillionInput + s.pricePerMillionOutput) / 2
  // 避免除零，价格越低越好但有下限
  const priceFactor = Math.max(avgPrice, 0.1)
  const speedFactor = s.tokensPerSecond / 100 // 归一化
  return Math.round((qualityScore / priceFactor) * speedFactor * 10) / 10
}

export function getAllRankedModels(): RankedModel[] {
  const ranked: RankedModel[] = models.map((m) => {
    const s = scores.find((sc) => sc.modelId === m.id)!
    return {
      ...m,
      ...s,
      rank: 0,
      valueScore: computeValueScore(s),
    }
  })

  // Sort by ELO for initial ranking
  ranked.sort((a, b) => b.eloScore - a.eloScore)
  ranked.forEach((m, i) => (m.rank = i + 1))

  return ranked
}

export function getRankedByCategory(category: RankingCategory): RankedModel[] {
  const all = getAllRankedModels()

  const scoreKeyMap: Record<RankingCategory, keyof ModelScores | 'valueScore'> = {
    overall: 'eloScore',
    coding: 'codingScore',
    writing: 'writingScore',
    math: 'mathScore',
    reasoning: 'reasoningScore',
    creativity: 'creativityScore',
    multilingual: 'multilingualScore',
    value: 'valueScore',
  }

  const key = scoreKeyMap[category]
  all.sort((a, b) => Number(b[key]) - Number(a[key]))
  all.forEach((m, i) => (m.rank = i + 1))

  return all
}

export function getModelById(id: string): RankedModel | undefined {
  const all = getAllRankedModels()
  return all.find((m) => m.id === id)
}

export function getCategories(): CategoryConfig[] {
  return [
    {
      key: 'overall', label: '综合排名', labelEn: 'Overall',
      scoreKey: 'eloScore', icon: '🏆', color: '#fbbf24',
      description: '基于 ELO 评分的综合实力排名',
    },
    {
      key: 'coding', label: '编程', labelEn: 'Coding',
      scoreKey: 'codingScore', icon: '💻', color: '#3b82f6',
      description: '代码生成、调试、架构设计能力',
    },
    {
      key: 'writing', label: '写作', labelEn: 'Writing',
      scoreKey: 'writingScore', icon: '✍️', color: '#8b5cf6',
      description: '创意写作、文案、长文生成能力',
    },
    {
      key: 'math', label: '数学', labelEn: 'Math',
      scoreKey: 'mathScore', icon: '🔢', color: '#10b981',
      description: '数学推理、公式推导、数值计算',
    },
    {
      key: 'reasoning', label: '推理', labelEn: 'Reasoning',
      scoreKey: 'reasoningScore', icon: '🧠', color: '#f59e0b',
      description: '逻辑推理、分析能力、复杂问题求解',
    },
    {
      key: 'creativity', label: '创意', labelEn: 'Creativity',
      scoreKey: 'creativityScore', icon: '🎨', color: '#ec4899',
      description: '发散思维、原创性、艺术创作',
    },
    {
      key: 'multilingual', label: '多语言', labelEn: 'Multilingual',
      scoreKey: 'multilingualScore', icon: '🌍', color: '#06b6d4',
      description: '跨语言理解与生成能力',
    },
    {
      key: 'value', label: '性价比', labelEn: 'Value',
      scoreKey: 'valueScore', icon: '💰', color: '#22c55e',
      description: '综合质量与价格的性价比排名',
    },
  ]
}

export function getCategoryConfig(key: RankingCategory): CategoryConfig {
  return getCategories().find((c) => c.key === key)!
}
