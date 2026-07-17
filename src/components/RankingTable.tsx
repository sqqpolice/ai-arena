'use client'

import { RankedModel, RankingCategory } from '@/types/model'
import { formatNumber, formatPrice, getProviderColor, getProviderBg } from '@/lib/utils'
import Link from 'next/link'

interface RankingTableProps {
  models: RankedModel[]
  category: RankingCategory
  scoreKey: string
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rank-gold/20 text-rank-gold font-bold text-sm">
        🥇
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rank-silver/20 text-rank-silver font-bold text-sm">
        🥈
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rank-bronze/20 text-rank-bronze font-bold text-sm">
        🥉
      </div>
    )
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-muted font-medium text-sm">
      {rank}
    </div>
  )
}

function EloChange({ change }: { change: number }) {
  if (change === 0) return <span className="text-muted text-xs">—</span>
  if (change > 0)
    return (
      <span className="text-up text-xs font-medium flex items-center gap-0.5">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          <path d="M5 2L8 6H2L5 2Z" />
        </svg>
        {change}
      </span>
    )
  return (
    <span className="text-down text-xs font-medium flex items-center gap-0.5">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <path d="M5 8L2 4H8L5 8Z" />
      </svg>
      {Math.abs(change)}
    </span>
  )
}

function ScoreBar({ value, max = 100, color = '#3b82f6' }: { value: number; max?: number; color?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums">{value}</span>
    </div>
  )
}

export default function RankingTable({ models, category, scoreKey }: RankingTableProps) {
  const isOverall = category === 'overall'
  const isValue = category === 'value'

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-xs text-muted uppercase tracking-wider">
            <th className="py-3 px-4 text-left w-16">#</th>
            <th className="py-3 px-4 text-left">模型</th>
            <th className="py-3 px-4 text-center">ELO</th>
            <th className="py-3 px-4 text-center">变化</th>
            {!isOverall && (
              <th className="py-3 px-4 text-center">评分</th>
            )}
            <th className="py-3 px-4 text-center hidden sm:table-cell">编程</th>
            <th className="py-3 px-4 text-center hidden sm:table-cell">写作</th>
            <th className="py-3 px-4 text-center hidden sm:table-cell">数学</th>
            <th className="py-3 px-4 text-center hidden sm:table-cell">推理</th>
            <th className="py-3 px-4 text-center hidden md:table-cell">价格 (in/out)</th>
            <th className="py-3 px-4 text-center hidden md:table-cell">上下文</th>
            <th className="py-3 px-4 text-center hidden lg:table-cell">速度</th>
            {isValue && (
              <th className="py-3 px-4 text-center">性价比分</th>
            )}
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id} className="rank-row border-b border-border/50">
              {/* Rank */}
              <td className="py-3 px-4">
                <RankBadge rank={model.rank} />
              </td>

              {/* Model info */}
              <td className="py-3 px-4">
                <Link href={`/model/${model.id}`} className="group flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-bold ${getProviderBg(model.provider)}`}>
                    {model.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {model.name}
                    </div>
                    <div className={`text-xs ${getProviderColor(model.provider)}`}>
                      {model.provider}
                    </div>
                  </div>
                </Link>
              </td>

              {/* ELO */}
              <td className="py-3 px-4 text-center">
                <span className="text-lg font-bold tabular-nums">{model.eloScore}</span>
              </td>

              {/* Change */}
              <td className="py-3 px-4 text-center">
                <EloChange change={model.eloChange} />
              </td>

              {/* Category score */}
              {!isOverall && (
                <td className="py-3 px-4 text-center">
                  <ScoreBar
                    value={Number(model[scoreKey as keyof typeof model])}
                    color={category === 'coding' ? '#3b82f6' : category === 'writing' ? '#8b5cf6' : category === 'math' ? '#10b981' : category === 'reasoning' ? '#f59e0b' : category === 'value' ? '#22c55e' : '#06b6d4'}
                  />
                </td>
              )}

              {/* Sub scores */}
              <td className="py-3 px-4 text-center hidden sm:table-cell text-sm tabular-nums">{model.codingScore}</td>
              <td className="py-3 px-4 text-center hidden sm:table-cell text-sm tabular-nums">{model.writingScore}</td>
              <td className="py-3 px-4 text-center hidden sm:table-cell text-sm tabular-nums">{model.mathScore}</td>
              <td className="py-3 px-4 text-center hidden sm:table-cell text-sm tabular-nums">{model.reasoningScore}</td>

              {/* Price */}
              <td className="py-3 px-4 text-center hidden md:table-cell text-sm tabular-nums text-muted">
                {formatPrice(model.pricePerMillionInput)} / {formatPrice(model.pricePerMillionOutput)}
              </td>

              {/* Context */}
              <td className="py-3 px-4 text-center hidden md:table-cell text-sm tabular-nums text-muted">
                {formatNumber(model.contextWindow)}
              </td>

              {/* Speed */}
              <td className="py-3 px-4 text-center hidden lg:table-cell text-sm tabular-nums text-muted">
                {model.tokensPerSecond} t/s
              </td>

              {/* Value score */}
              {isValue && (
                <td className="py-3 px-4 text-center">
                  <span className="text-lg font-bold text-accent-green tabular-nums">
                    {model.valueScore}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
