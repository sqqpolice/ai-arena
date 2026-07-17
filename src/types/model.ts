export interface AIModel {
  id: string
  name: string
  provider: string
  logoUrl?: string
  releaseDate: string
  description: string
  websiteUrl: string
  status: 'active' | 'deprecated'
}

export interface ModelScores {
  modelId: string
  capturedAt: string
  eloScore: number
  eloChange: number // change since last snapshot
  codingScore: number
  writingScore: number
  mathScore: number
  reasoningScore: number
  creativityScore: number
  multilingualScore: number
  pricePerMillionInput: number  // USD
  pricePerMillionOutput: number // USD
  contextWindow: number         // tokens
  latencyMs: number
  tokensPerSecond: number
  source: 'manual' | 'lmsys' | 'openrouter' | 'api'
}

export interface RankedModel extends AIModel, ModelScores {
  rank: number
  valueScore: number // computed composite score
}

export type RankingCategory =
  | 'overall'
  | 'coding'
  | 'writing'
  | 'math'
  | 'reasoning'
  | 'creativity'
  | 'multilingual'
  | 'value'

export interface CategoryConfig {
  key: RankingCategory
  label: string
  labelEn: string
  scoreKey: keyof ModelScores | 'valueScore'
  icon: string
  color: string
  description: string
}
