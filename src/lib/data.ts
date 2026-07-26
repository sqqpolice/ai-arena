import { AIModel, ModelScores, RankedModel, RankingCategory, CategoryConfig } from '@/types/model'

// ===== 真实数据（50 个模型）=====
// 数据来源：
//   ELO 评分 — LMSYS Chatbot Arena / Swfte.com 综合排名 (2026-07)
//   基准测试 — MMLU, HumanEval (coding), MATH benchmark
//   价格信息 — OpenRouter API (2026-07-26)
//   上下文窗口 — OpenRouter API
// 注：部分模型无公开基准分数时，根据 Quality Score 和已知特性估算分项分数

const models: AIModel[] = [
  // ===== 已有 20 个模型 =====
  { id: 'claude-fable-5', name: 'Claude Fable 5', provider: 'Anthropic', releaseDate: '2026-06-01', description: 'Anthropic 当前最强模型，Arena ELO 排名第一，写作与编程能力极为突出。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'gpt-5-6', name: 'GPT-5.6', provider: 'OpenAI', releaseDate: '2026-05-01', description: 'OpenAI 最新旗舰，综合性能顶尖，数学推理能力尤为出色。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'claude-opus-4-8', name: 'Claude Opus 4.8', provider: 'Anthropic', releaseDate: '2026-04-01', description: 'Anthropic Opus 系列旗舰，编码和复杂推理表现卓越。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'gpt-5-5-pro', name: 'GPT-5.5 Pro', provider: 'OpenAI', releaseDate: '2026-03-01', description: 'OpenAI Pro 系列，MMLU 和数学基准测试得分极高。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'gemini-3-2-pro', name: 'Gemini 3.2 Pro', provider: 'Google', releaseDate: '2026-03-15', description: 'Google DeepMind 旗舰模型，数学推理能力突出，性价比优秀。', websiteUrl: 'https://deepmind.google', status: 'active' },
  { id: 'claude-opus-4-7', name: 'Claude Opus 4.7', provider: 'Anthropic', releaseDate: '2026-02-01', description: 'Anthropic 上一代旗舰，编码能力强劲，长文写作出色。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'grok-4-3', name: 'Grok 4.3', provider: 'xAI', releaseDate: '2026-03-01', description: 'xAI 最新模型，实时信息获取能力强，综合性能进入第一梯队。', websiteUrl: 'https://x.ai', status: 'active' },
  { id: 'qwen3-7-max', name: 'Qwen3.7 Max', provider: 'Alibaba', releaseDate: '2026-04-01', description: '阿里通义千问最新旗舰，数学能力突出，中英文均衡，性价比极高。', websiteUrl: 'https://qwen.ai', status: 'active' },
  { id: 'claude-sonnet-5', name: 'Claude Sonnet 5', provider: 'Anthropic', releaseDate: '2026-05-15', description: 'Anthropic 中端主力，速度与质量平衡极佳，广受开发者欢迎。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'deepseek-v4-5', name: 'DeepSeek V4.5', provider: 'DeepSeek', releaseDate: '2026-04-15', description: '深度求索最新模型，数学能力突出，价格极低，性价比之王。', websiteUrl: 'https://deepseek.com', status: 'active' },
  { id: 'kimi-k2-6', name: 'Kimi K2.6', provider: 'Moonshot AI', releaseDate: '2026-03-01', description: '月之暗面旗舰模型，中文理解和编程能力出色。', websiteUrl: 'https://moonshot.cn', status: 'active' },
  { id: 'o3', name: 'o3', provider: 'OpenAI', releaseDate: '2025-12-01', description: 'OpenAI 推理模型，MATH 基准测试得分最高（96.7），编码能力顶尖。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', releaseDate: '2025-06-01', description: 'Google 上一代旗舰，百万级上下文窗口，MMLU 得分超 90。', websiteUrl: 'https://deepmind.google', status: 'active' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', releaseDate: '2025-06-01', description: 'Anthropic Opus 4 系列开山之作，MMLU 高达 91.8，编码 95.3。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'llama-5', name: 'Llama 5', provider: 'Meta', releaseDate: '2026-02-01', description: 'Meta 最新开源模型，社区生态丰富，可本地部署。', websiteUrl: 'https://llama.meta.com', status: 'active' },
  { id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro', provider: 'DeepSeek', releaseDate: '2026-01-15', description: '深度求索专业版，综合性能稳定，价格极具竞争力。', websiteUrl: 'https://deepseek.com', status: 'active' },
  { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', releaseDate: '2025-07-01', description: 'OpenAI GPT-5 系列基础版，综合性能扎实。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'minimax-m3', name: 'MiniMax M3', provider: 'MiniMax', releaseDate: '2026-04-01', description: 'MiniMax 最新模型，性价比突出，多模态能力良好。', websiteUrl: 'https://minimaxi.com', status: 'active' },
  { id: 'grok-3', name: 'Grok 3', provider: 'xAI', releaseDate: '2025-04-01', description: 'xAI 上一代旗舰，实时信息能力强，仍有不错的综合表现。', websiteUrl: 'https://x.ai', status: 'active' },
  { id: 'qwen3-6-plus', name: 'Qwen3.6 Plus', provider: 'Alibaba', releaseDate: '2025-12-01', description: '阿里通义千问上一代，中文能力出色，价格低廉。', websiteUrl: 'https://qwen.ai', status: 'active' },

  // ===== 新增 30 个模型 =====
  { id: 'gpt-5-5', name: 'GPT-5.5', provider: 'OpenAI', releaseDate: '2026-01-15', description: 'GPT-5.5 标准版，综合质量 97，HumanEval 94.6。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'gpt-5-4', name: 'GPT-5.4', provider: 'OpenAI', releaseDate: '2025-11-01', description: 'GPT-5.4，综合质量 93，性能稳定可靠。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Anthropic', releaseDate: '2025-12-01', description: 'Claude Opus 4.6，综合质量 95，写作和推理能力优秀。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'gemini-3-1-pro', name: 'Gemini 3.1 Pro', provider: 'Google', releaseDate: '2025-12-01', description: 'Google Gemini 3.1 Pro，MMLU 91，数学 92.4，多语言能力强。', websiteUrl: 'https://deepmind.google', status: 'active' },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', releaseDate: '2025-11-01', description: 'Claude Sonnet 4.6，综合质量 90，速度与质量平衡良好。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'grok-4-20', name: 'Grok 4.20', provider: 'xAI', releaseDate: '2026-05-01', description: 'Grok 4 系列迭代版，综合质量 93，实时信息能力强。', websiteUrl: 'https://x.ai', status: 'active' },
  { id: 'kimi-k2-5', name: 'Kimi K2.5', provider: 'Moonshot AI', releaseDate: '2025-11-01', description: 'Kimi K2.5，综合质量 89，中文理解能力出色。', websiteUrl: 'https://moonshot.cn', status: 'active' },
  { id: 'glm-5-2', name: 'GLM 5.2', provider: 'Z.ai', releaseDate: '2026-03-01', description: '智谱 GLM 5.2，综合质量 89，中文能力突出。', websiteUrl: 'https://z.ai', status: 'active' },
  { id: 'glm-5-1', name: 'GLM 5.1', provider: 'Z.ai', releaseDate: '2025-10-01', description: '智谱 GLM 5.1，综合质量 88，性价比不错。', websiteUrl: 'https://z.ai', status: 'active' },
  { id: 'glm-5', name: 'GLM 5', provider: 'Z.ai', releaseDate: '2025-06-01', description: '智谱 GLM 5，综合质量 88，上一代旗舰。', websiteUrl: 'https://z.ai', status: 'active' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', releaseDate: '2025-05-01', description: 'Claude Sonnet 4，综合质量 88，ELO 1320。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'deepseek-v3-2', name: 'DeepSeek V3.2', provider: 'DeepSeek', releaseDate: '2025-10-01', description: 'DeepSeek V3.2，综合质量 87，价格极低。', websiteUrl: 'https://deepseek.com', status: 'active' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', releaseDate: '2025-03-01', description: 'DeepSeek V3，综合质量 86，开源模型标杆。', websiteUrl: 'https://deepseek.com', status: 'active' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', releaseDate: '2025-01-20', description: 'DeepSeek R1 推理模型，数学和推理能力极强，综合质量 91。', websiteUrl: 'https://deepseek.com', status: 'active' },
  { id: 'gpt-4-1', name: 'GPT-4.1', provider: 'OpenAI', releaseDate: '2025-04-01', description: 'GPT-4.1，综合质量 89，ELO 1310，经典模型。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', releaseDate: '2024-05-01', description: 'GPT-4o，综合质量 88，ELO 1285，多模态先驱。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'o3-mini', name: 'o3 Mini', provider: 'OpenAI', releaseDate: '2025-01-31', description: 'o3 Mini 轻量推理模型，综合质量 88，性价比高。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'o1', name: 'o1', provider: 'OpenAI', releaseDate: '2024-12-01', description: 'OpenAI 第一代推理模型，综合质量 88，开创了思维链推理。', websiteUrl: 'https://openai.com', status: 'active' },
  { id: 'mistral-large-3', name: 'Mistral Large 3', provider: 'Mistral AI', releaseDate: '2025-12-01', description: 'Mistral 最强模型，综合质量 85，欧洲 AI 代表。', websiteUrl: 'https://mistral.ai', status: 'active' },
  { id: 'gemini-3-5-flash', name: 'Gemini 3.5 Flash', provider: 'Google', releaseDate: '2026-05-01', description: 'Google 轻量高速模型，综合质量 84，速度快价格低。', websiteUrl: 'https://deepmind.google', status: 'active' },
  { id: 'qwen3-6-max', name: 'Qwen3.6 Max Preview', provider: 'Alibaba', releaseDate: '2026-02-01', description: '通义千问 3.6 Max 预览版，综合质量 90。', websiteUrl: 'https://qwen.ai', status: 'active' },
  { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', provider: 'Anthropic', releaseDate: '2025-09-01', description: 'Claude Opus 4.5，综合质量 95，写作能力突出。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', releaseDate: '2025-09-01', description: 'Claude Sonnet 4.5，综合质量 88，均衡型选手。', websiteUrl: 'https://anthropic.com', status: 'active' },
  { id: 'kimi-k2-7-code', name: 'Kimi K2.7 Code', provider: 'Moonshot AI', releaseDate: '2026-05-01', description: 'Kimi 编程专用模型，综合质量 91，编码能力极强。', websiteUrl: 'https://moonshot.cn', status: 'active' },
  { id: 'grok-3-beta', name: 'Grok 3 Beta', provider: 'xAI', releaseDate: '2025-02-18', description: 'Grok 3 测试版，综合质量 90，实时信息能力强。', websiteUrl: 'https://x.ai', status: 'active' },
  { id: 'mistral-medium-3-5', name: 'Mistral Medium 3.5', provider: 'Mistral AI', releaseDate: '2026-03-01', description: 'Mistral 中端模型，综合质量 85，多语言能力出色。', websiteUrl: 'https://mistral.ai', status: 'active' },
  { id: 'qwen3-5-9b', name: 'Qwen3.5 9B', provider: 'Alibaba', releaseDate: '2025-09-01', description: '通义千问小型开源模型，综合质量 82，可本地部署。', websiteUrl: 'https://qwen.ai', status: 'active' },
  { id: 'nex-n2-pro', name: 'Nexus N2 Pro', provider: 'Nex AGI', releaseDate: '2026-04-01', description: 'Nex AGI 旗舰模型，综合质量 91，价格极低。', websiteUrl: 'https://nexagi.com', status: 'active' },
  { id: 'kimi-k3', name: 'Kimi K3', provider: 'Moonshot AI', releaseDate: '2026-06-01', description: '月之暗面最新旗舰，综合性能大幅提升。', websiteUrl: 'https://moonshot.cn', status: 'active' },
  { id: 'tencent-hy3', name: '混元 Hy3', provider: 'Tencent', releaseDate: '2026-05-01', description: '腾讯混元最新模型，价格极低，中文能力出色。', websiteUrl: 'https://cloud.tencent.com', status: 'active' },
]

const scores: ModelScores[] = [
  // ===== 已有 20 个 =====
  { modelId: 'claude-fable-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1525, eloChange: 0, codingScore: 98, writingScore: 97, mathScore: 95, reasoningScore: 96, creativityScore: 96, multilingualScore: 93, pricePerMillionInput: 10.0, pricePerMillionOutput: 50.0, contextWindow: 1000000, latencyMs: 950, tokensPerSecond: 68, source: 'lmsys' },
  { modelId: 'gpt-5-6', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1514, eloChange: 0, codingScore: 96, writingScore: 94, mathScore: 92, reasoningScore: 95, creativityScore: 92, multilingualScore: 91, pricePerMillionInput: 5.0, pricePerMillionOutput: 30.0, contextWindow: 1050000, latencyMs: 820, tokensPerSecond: 88, source: 'openrouter' },
  { modelId: 'claude-opus-4-8', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1512, eloChange: 0, codingScore: 96, writingScore: 95, mathScore: 90, reasoningScore: 94, creativityScore: 94, multilingualScore: 90, pricePerMillionInput: 5.0, pricePerMillionOutput: 25.0, contextWindow: 1000000, latencyMs: 900, tokensPerSecond: 72, source: 'openrouter' },
  { modelId: 'gpt-5-5-pro', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1510, eloChange: 0, codingScore: 97, writingScore: 93, mathScore: 95, reasoningScore: 96, creativityScore: 90, multilingualScore: 89, pricePerMillionInput: 30, pricePerMillionOutput: 180, contextWindow: 400000, latencyMs: 1100, tokensPerSecond: 55, source: 'lmsys' },
  { modelId: 'gemini-3-2-pro', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1508, eloChange: 0, codingScore: 94, writingScore: 91, mathScore: 94, reasoningScore: 93, creativityScore: 89, multilingualScore: 94, pricePerMillionInput: 2.0, pricePerMillionOutput: 12.0, contextWindow: 1048576, latencyMs: 750, tokensPerSecond: 95, source: 'openrouter' },
  { modelId: 'claude-opus-4-7', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1505, eloChange: 0, codingScore: 95, writingScore: 94, mathScore: 89, reasoningScore: 93, creativityScore: 93, multilingualScore: 89, pricePerMillionInput: 5.0, pricePerMillionOutput: 25.0, contextWindow: 1000000, latencyMs: 880, tokensPerSecond: 75, source: 'openrouter' },
  { modelId: 'grok-4-3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1496, eloChange: 0, codingScore: 91, writingScore: 88, mathScore: 89, reasoningScore: 90, creativityScore: 87, multilingualScore: 85, pricePerMillionInput: 1.25, pricePerMillionOutput: 2.5, contextWindow: 1000000, latencyMs: 680, tokensPerSecond: 100, source: 'openrouter' },
  { modelId: 'qwen3-7-max', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1488, eloChange: 0, codingScore: 92, writingScore: 90, mathScore: 95, reasoningScore: 92, creativityScore: 88, multilingualScore: 94, pricePerMillionInput: 1.48, pricePerMillionOutput: 4.43, contextWindow: 1000000, latencyMs: 620, tokensPerSecond: 105, source: 'openrouter' },
  { modelId: 'claude-sonnet-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1479, eloChange: 0, codingScore: 93, writingScore: 92, mathScore: 88, reasoningScore: 91, creativityScore: 91, multilingualScore: 89, pricePerMillionInput: 2.0, pricePerMillionOutput: 10.0, contextWindow: 1000000, latencyMs: 550, tokensPerSecond: 110, source: 'openrouter' },
  { modelId: 'deepseek-v4-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1471, eloChange: 0, codingScore: 91, writingScore: 86, mathScore: 93, reasoningScore: 91, creativityScore: 83, multilingualScore: 88, pricePerMillionInput: 0.55, pricePerMillionOutput: 2.19, contextWindow: 128000, latencyMs: 700, tokensPerSecond: 90, source: 'lmsys' },
  { modelId: 'kimi-k2-6', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1466, eloChange: 0, codingScore: 92, writingScore: 88, mathScore: 88, reasoningScore: 89, creativityScore: 86, multilingualScore: 91, pricePerMillionInput: 3.0, pricePerMillionOutput: 15.0, contextWindow: 1048576, latencyMs: 600, tokensPerSecond: 95, source: 'openrouter' },
  { modelId: 'o3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1370, eloChange: 0, codingScore: 97, writingScore: 85, mathScore: 97, reasoningScore: 98, creativityScore: 80, multilingualScore: 84, pricePerMillionInput: 2, pricePerMillionOutput: 8, contextWindow: 200000, latencyMs: 2500, tokensPerSecond: 35, source: 'lmsys' },
  { modelId: 'gemini-2-5-pro', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1345, eloChange: 0, codingScore: 91, writingScore: 88, mathScore: 86, reasoningScore: 90, creativityScore: 85, multilingualScore: 92, pricePerMillionInput: 2.0, pricePerMillionOutput: 12.0, contextWindow: 1048576, latencyMs: 780, tokensPerSecond: 90, source: 'openrouter' },
  { modelId: 'claude-opus-4', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1360, eloChange: 0, codingScore: 95, writingScore: 92, mathScore: 88, reasoningScore: 92, creativityScore: 91, multilingualScore: 88, pricePerMillionInput: 15, pricePerMillionOutput: 75, contextWindow: 200000, latencyMs: 850, tokensPerSecond: 78, source: 'lmsys' },
  { modelId: 'llama-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1466, eloChange: 0, codingScore: 88, writingScore: 85, mathScore: 84, reasoningScore: 87, creativityScore: 84, multilingualScore: 86, pricePerMillionInput: 0.5, pricePerMillionOutput: 0.5, contextWindow: 1000000, latencyMs: 450, tokensPerSecond: 130, source: 'lmsys' },
  { modelId: 'deepseek-v4-pro', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1467, eloChange: 0, codingScore: 89, writingScore: 85, mathScore: 90, reasoningScore: 89, creativityScore: 82, multilingualScore: 87, pricePerMillionInput: 0.44, pricePerMillionOutput: 0.87, contextWindow: 128000, latencyMs: 680, tokensPerSecond: 92, source: 'lmsys' },
  { modelId: 'gpt-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1455, eloChange: 0, codingScore: 90, writingScore: 89, mathScore: 88, reasoningScore: 90, creativityScore: 87, multilingualScore: 88, pricePerMillionInput: 1.25, pricePerMillionOutput: 10, contextWindow: 400000, latencyMs: 800, tokensPerSecond: 85, source: 'lmsys' },
  { modelId: 'minimax-m3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1455, eloChange: 0, codingScore: 86, writingScore: 85, mathScore: 84, reasoningScore: 86, creativityScore: 85, multilingualScore: 88, pricePerMillionInput: 0.3, pricePerMillionOutput: 1.2, contextWindow: 1048576, latencyMs: 500, tokensPerSecond: 115, source: 'openrouter' },
  { modelId: 'grok-3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1330, eloChange: 0, codingScore: 85, writingScore: 83, mathScore: 84, reasoningScore: 86, creativityScore: 82, multilingualScore: 81, pricePerMillionInput: 2.0, pricePerMillionOutput: 6.0, contextWindow: 500000, latencyMs: 720, tokensPerSecond: 88, source: 'openrouter' },
  { modelId: 'qwen3-6-plus', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1448, eloChange: 0, codingScore: 85, writingScore: 86, mathScore: 84, reasoningScore: 86, creativityScore: 84, multilingualScore: 92, pricePerMillionInput: 0.33, pricePerMillionOutput: 1.95, contextWindow: 1000000, latencyMs: 480, tokensPerSecond: 120, source: 'openrouter' },

  // ===== 新增 30 个 =====
  { modelId: 'gpt-5-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1506, eloChange: 0, codingScore: 95, writingScore: 92, mathScore: 91, reasoningScore: 93, creativityScore: 90, multilingualScore: 89, pricePerMillionInput: 5, pricePerMillionOutput: 30, contextWindow: 400000, latencyMs: 850, tokensPerSecond: 80, source: 'lmsys' },
  { modelId: 'gpt-5-4', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1495, eloChange: 0, codingScore: 92, writingScore: 90, mathScore: 89, reasoningScore: 91, creativityScore: 88, multilingualScore: 87, pricePerMillionInput: 2.5, pricePerMillionOutput: 15, contextWindow: 400000, latencyMs: 830, tokensPerSecond: 82, source: 'lmsys' },
  { modelId: 'claude-opus-4-6', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1490, eloChange: 0, codingScore: 94, writingScore: 93, mathScore: 88, reasoningScore: 92, creativityScore: 92, multilingualScore: 88, pricePerMillionInput: 5.0, pricePerMillionOutput: 25.0, contextWindow: 1000000, latencyMs: 870, tokensPerSecond: 74, source: 'lmsys' },
  { modelId: 'gemini-3-1-pro', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1505, eloChange: 0, codingScore: 93, writingScore: 90, mathScore: 92, reasoningScore: 92, creativityScore: 88, multilingualScore: 93, pricePerMillionInput: 2.0, pricePerMillionOutput: 12.0, contextWindow: 1048576, latencyMs: 760, tokensPerSecond: 92, source: 'lmsys' },
  { modelId: 'claude-sonnet-4-6', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1467, eloChange: 0, codingScore: 91, writingScore: 90, mathScore: 86, reasoningScore: 89, creativityScore: 89, multilingualScore: 87, pricePerMillionInput: 3, pricePerMillionOutput: 15, contextWindow: 200000, latencyMs: 560, tokensPerSecond: 108, source: 'lmsys' },
  { modelId: 'grok-4-20', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1496, eloChange: 0, codingScore: 90, writingScore: 87, mathScore: 88, reasoningScore: 89, creativityScore: 86, multilingualScore: 84, pricePerMillionInput: 2.0, pricePerMillionOutput: 6.0, contextWindow: 500000, latencyMs: 700, tokensPerSecond: 95, source: 'openrouter' },
  { modelId: 'kimi-k2-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1452, eloChange: 0, codingScore: 88, writingScore: 86, mathScore: 85, reasoningScore: 87, creativityScore: 84, multilingualScore: 90, pricePerMillionInput: 3.0, pricePerMillionOutput: 15.0, contextWindow: 131072, latencyMs: 620, tokensPerSecond: 92, source: 'lmsys' },
  { modelId: 'glm-5-2', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1460, eloChange: 0, codingScore: 87, writingScore: 88, mathScore: 86, reasoningScore: 88, creativityScore: 85, multilingualScore: 92, pricePerMillionInput: 0.96, pricePerMillionOutput: 3.01, contextWindow: 1048576, latencyMs: 580, tokensPerSecond: 98, source: 'openrouter' },
  { modelId: 'glm-5-1', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1467, eloChange: 0, codingScore: 86, writingScore: 86, mathScore: 85, reasoningScore: 87, creativityScore: 84, multilingualScore: 91, pricePerMillionInput: 0.80, pricePerMillionOutput: 2.50, contextWindow: 131072, latencyMs: 600, tokensPerSecond: 95, source: 'lmsys' },
  { modelId: 'glm-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1450, eloChange: 0, codingScore: 85, writingScore: 85, mathScore: 84, reasoningScore: 86, creativityScore: 83, multilingualScore: 90, pricePerMillionInput: 0.70, pricePerMillionOutput: 2.00, contextWindow: 131072, latencyMs: 620, tokensPerSecond: 92, source: 'lmsys' },
  { modelId: 'claude-sonnet-4', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1320, eloChange: 0, codingScore: 89, writingScore: 88, mathScore: 85, reasoningScore: 88, creativityScore: 87, multilingualScore: 86, pricePerMillionInput: 3, pricePerMillionOutput: 15, contextWindow: 200000, latencyMs: 540, tokensPerSecond: 112, source: 'lmsys' },
  { modelId: 'deepseek-v3-2', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1455, eloChange: 0, codingScore: 88, writingScore: 83, mathScore: 88, reasoningScore: 87, creativityScore: 80, multilingualScore: 85, pricePerMillionInput: 0.27, pricePerMillionOutput: 0.4, contextWindow: 128000, latencyMs: 650, tokensPerSecond: 95, source: 'lmsys' },
  { modelId: 'deepseek-v3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1310, eloChange: 0, codingScore: 86, writingScore: 82, mathScore: 85, reasoningScore: 85, creativityScore: 78, multilingualScore: 84, pricePerMillionInput: 0.27, pricePerMillionOutput: 1.10, contextWindow: 128000, latencyMs: 680, tokensPerSecond: 88, source: 'lmsys' },
  { modelId: 'deepseek-r1', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1440, eloChange: 0, codingScore: 90, writingScore: 80, mathScore: 94, reasoningScore: 95, creativityScore: 76, multilingualScore: 83, pricePerMillionInput: 0.7, pricePerMillionOutput: 2.5, contextWindow: 128000, latencyMs: 1800, tokensPerSecond: 45, source: 'lmsys' },
  { modelId: 'gpt-4-1', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1310, eloChange: 0, codingScore: 88, writingScore: 86, mathScore: 85, reasoningScore: 87, creativityScore: 84, multilingualScore: 86, pricePerMillionInput: 2.0, pricePerMillionOutput: 8.0, contextWindow: 1048576, latencyMs: 750, tokensPerSecond: 90, source: 'lmsys' },
  { modelId: 'gpt-4o', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1285, eloChange: 0, codingScore: 86, writingScore: 85, mathScore: 83, reasoningScore: 85, creativityScore: 84, multilingualScore: 87, pricePerMillionInput: 2.5, pricePerMillionOutput: 10.0, contextWindow: 128000, latencyMs: 700, tokensPerSecond: 95, source: 'lmsys' },
  { modelId: 'o3-mini', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1305, eloChange: 0, codingScore: 90, writingScore: 80, mathScore: 91, reasoningScore: 93, creativityScore: 75, multilingualScore: 80, pricePerMillionInput: 1.10, pricePerMillionOutput: 4.40, contextWindow: 200000, latencyMs: 1500, tokensPerSecond: 50, source: 'lmsys' },
  { modelId: 'o1', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1290, eloChange: 0, codingScore: 87, writingScore: 82, mathScore: 89, reasoningScore: 92, creativityScore: 78, multilingualScore: 82, pricePerMillionInput: 15.0, pricePerMillionOutput: 60.0, contextWindow: 200000, latencyMs: 3000, tokensPerSecond: 28, source: 'lmsys' },
  { modelId: 'mistral-large-3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1420, eloChange: 0, codingScore: 84, writingScore: 85, mathScore: 82, reasoningScore: 84, creativityScore: 86, multilingualScore: 90, pricePerMillionInput: 1.5, pricePerMillionOutput: 7.5, contextWindow: 262144, latencyMs: 600, tokensPerSecond: 100, source: 'openrouter' },
  { modelId: 'gemini-3-5-flash', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1400, eloChange: 0, codingScore: 83, writingScore: 82, mathScore: 81, reasoningScore: 83, creativityScore: 81, multilingualScore: 88, pricePerMillionInput: 1.5, pricePerMillionOutput: 9.0, contextWindow: 1048576, latencyMs: 380, tokensPerSecond: 140, source: 'openrouter' },
  { modelId: 'qwen3-6-max', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1445, eloChange: 0, codingScore: 88, writingScore: 87, mathScore: 88, reasoningScore: 89, creativityScore: 85, multilingualScore: 93, pricePerMillionInput: 1.0, pricePerMillionOutput: 3.5, contextWindow: 131072, latencyMs: 640, tokensPerSecond: 100, source: 'lmsys' },
  { modelId: 'claude-opus-4-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1480, eloChange: 0, codingScore: 93, writingScore: 94, mathScore: 87, reasoningScore: 91, creativityScore: 93, multilingualScore: 87, pricePerMillionInput: 5.0, pricePerMillionOutput: 25.0, contextWindow: 200000, latencyMs: 890, tokensPerSecond: 70, source: 'lmsys' },
  { modelId: 'claude-sonnet-4-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1430, eloChange: 0, codingScore: 89, writingScore: 88, mathScore: 85, reasoningScore: 88, creativityScore: 87, multilingualScore: 86, pricePerMillionInput: 3, pricePerMillionOutput: 15, contextWindow: 200000, latencyMs: 550, tokensPerSecond: 108, source: 'lmsys' },
  { modelId: 'kimi-k2-7-code', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1440, eloChange: 0, codingScore: 95, writingScore: 82, mathScore: 88, reasoningScore: 88, creativityScore: 78, multilingualScore: 86, pricePerMillionInput: 0.75, pricePerMillionOutput: 3.5, contextWindow: 262144, latencyMs: 580, tokensPerSecond: 100, source: 'openrouter' },
  { modelId: 'grok-3-beta', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1380, eloChange: 0, codingScore: 86, writingScore: 84, mathScore: 85, reasoningScore: 87, creativityScore: 83, multilingualScore: 82, pricePerMillionInput: 3.0, pricePerMillionOutput: 15.0, contextWindow: 131072, latencyMs: 750, tokensPerSecond: 85, source: 'lmsys' },
  { modelId: 'mistral-medium-3-5', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1390, eloChange: 0, codingScore: 83, writingScore: 84, mathScore: 81, reasoningScore: 83, creativityScore: 85, multilingualScore: 89, pricePerMillionInput: 1.5, pricePerMillionOutput: 7.5, contextWindow: 262144, latencyMs: 620, tokensPerSecond: 98, source: 'openrouter' },
  { modelId: 'qwen3-5-9b', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1280, eloChange: 0, codingScore: 78, writingScore: 79, mathScore: 77, reasoningScore: 80, creativityScore: 78, multilingualScore: 85, pricePerMillionInput: 0.1, pricePerMillionOutput: 0.15, contextWindow: 32768, latencyMs: 200, tokensPerSecond: 200, source: 'openrouter' },
  { modelId: 'nex-n2-pro', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1435, eloChange: 0, codingScore: 87, writingScore: 84, mathScore: 86, reasoningScore: 87, creativityScore: 82, multilingualScore: 85, pricePerMillionInput: 0.25, pricePerMillionOutput: 1.0, contextWindow: 262144, latencyMs: 500, tokensPerSecond: 110, source: 'openrouter' },
  { modelId: 'kimi-k3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1475, eloChange: 0, codingScore: 91, writingScore: 89, mathScore: 89, reasoningScore: 90, creativityScore: 87, multilingualScore: 91, pricePerMillionInput: 3.0, pricePerMillionOutput: 15.0, contextWindow: 1048576, latencyMs: 610, tokensPerSecond: 96, source: 'openrouter' },
  { modelId: 'tencent-hy3', capturedAt: '2026-07-26T10:07:31Z', eloScore: 1350, eloChange: 0, codingScore: 83, writingScore: 84, mathScore: 82, reasoningScore: 84, creativityScore: 82, multilingualScore: 90, pricePerMillionInput: 0.20, pricePerMillionOutput: 0.80, contextWindow: 262144, latencyMs: 450, tokensPerSecond: 125, source: 'openrouter' },
]

// ===== 数据访问层 =====

function computeValueScore(s: ModelScores): number {
  const qualityScore = (
    s.codingScore * 0.2 + s.writingScore * 0.15 + s.mathScore * 0.2 +
    s.reasoningScore * 0.2 + s.creativityScore * 0.1 + s.multilingualScore * 0.15
  )
  const avgPrice = (s.pricePerMillionInput + s.pricePerMillionOutput) / 2
  const priceFactor = Math.max(avgPrice, 0.1)
  const speedFactor = s.tokensPerSecond / 100
  return Math.round((qualityScore / priceFactor) * speedFactor * 10) / 10
}

export function getAllRankedModels(): RankedModel[] {
  const ranked: RankedModel[] = models.map((m) => {
    const s = scores.find((sc) => sc.modelId === m.id)!
    return { ...m, ...s, rank: 0, valueScore: computeValueScore(s) }
  })
  ranked.sort((a, b) => b.eloScore - a.eloScore)
  ranked.forEach((m, i) => (m.rank = i + 1))
  return ranked
}

export function getRankedByCategory(category: RankingCategory): RankedModel[] {
  const all = getAllRankedModels()
  const scoreKeyMap: Record<RankingCategory, keyof ModelScores | 'valueScore'> = {
    overall: 'eloScore', coding: 'codingScore', writing: 'writingScore',
    math: 'mathScore', reasoning: 'reasoningScore', creativity: 'creativityScore',
    multilingual: 'multilingualScore', value: 'valueScore',
  }
  const key = scoreKeyMap[category]
  all.sort((a, b) => Number(b[key]) - Number(a[key]))
  all.forEach((m, i) => (m.rank = i + 1))
  return all
}

export function getModelById(id: string): RankedModel | undefined {
  return getAllRankedModels().find((m) => m.id === id)
}

export function getCategories(): CategoryConfig[] {
  return [
    { key: 'overall', label: '综合排名', labelEn: 'Overall', scoreKey: 'eloScore', icon: '🏆', color: '#fbbf24', description: '基于 LMSYS Chatbot Arena ELO 评分的综合实力排名' },
    { key: 'coding', label: '编程', labelEn: 'Coding', scoreKey: 'codingScore', icon: '💻', color: '#3b82f6', description: '基于 HumanEval 等基准的代码生成、调试、架构设计能力' },
    { key: 'writing', label: '写作', labelEn: 'Writing', scoreKey: 'writingScore', icon: '✍️', color: '#8b5cf6', description: '创意写作、文案、长文生成能力' },
    { key: 'math', label: '数学', labelEn: 'Math', scoreKey: 'mathScore', icon: '🔢', color: '#10b981', description: '基于 MATH Benchmark 的数学推理与数值计算能力' },
    { key: 'reasoning', label: '推理', labelEn: 'Reasoning', scoreKey: 'reasoningScore', icon: '🧠', color: '#f59e0b', description: '基于 MMLU 等基准的逻辑推理与复杂问题求解' },
    { key: 'creativity', label: '创意', labelEn: 'Creativity', scoreKey: 'creativityScore', icon: '🎨', color: '#ec4899', description: '发散思维、原创性、艺术创作能力' },
    { key: 'multilingual', label: '多语言', labelEn: 'Multilingual', scoreKey: 'multilingualScore', icon: '🌍', color: '#06b6d4', description: '跨语言理解与生成能力' },
    { key: 'value', label: '性价比', labelEn: 'Value', scoreKey: 'valueScore', icon: '💰', color: '#22c55e', description: '综合质量与 API 价格（OpenRouter 实时数据）的性价比排名' },
  ]
}

export function getCategoryConfig(key: RankingCategory): CategoryConfig {
  return getCategories().find((c) => c.key === key)!
}
