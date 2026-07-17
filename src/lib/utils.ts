import { clsx, type ClassValueArray } from 'clsx'

export function cn(...inputs: ClassValueArray) {
  return clsx(inputs)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

export function formatPrice(price: number): string {
  if (price < 0.01) return `$${price.toFixed(3)}`
  if (price < 1) return `$${price.toFixed(2)}`
  return `$${price.toFixed(1)}`
}

export function getProviderColor(provider: string): string {
  const colors: Record<string, string> = {
    OpenAI: 'text-green-400',
    Anthropic: 'text-orange-400',
    Google: 'text-blue-400',
    DeepSeek: 'text-cyan-400',
    Alibaba: 'text-purple-400',
    Meta: 'text-blue-500',
    'xAI': 'text-white',
    'Mistral AI': 'text-orange-500',
    Cohere: 'text-red-400',
    '01.AI': 'text-yellow-400',
  }
  return colors[provider] || 'text-gray-400'
}

export function getProviderBg(provider: string): string {
  const colors: Record<string, string> = {
    OpenAI: 'bg-green-500/10 border-green-500/20',
    Anthropic: 'bg-orange-500/10 border-orange-500/20',
    Google: 'bg-blue-500/10 border-blue-500/20',
    DeepSeek: 'bg-cyan-500/10 border-cyan-500/20',
    Alibaba: 'bg-purple-500/10 border-purple-500/20',
    Meta: 'bg-blue-600/10 border-blue-600/20',
    'xAI': 'bg-white/10 border-white/20',
    'Mistral AI': 'bg-orange-600/10 border-orange-600/20',
    Cohere: 'bg-red-500/10 border-red-500/20',
    '01.AI': 'bg-yellow-500/10 border-yellow-500/20',
  }
  return colors[provider] || 'bg-gray-500/10 border-gray-500/20'
}
