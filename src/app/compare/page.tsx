'use client'

import { useState } from 'react'
import { getAllRankedModels } from '@/lib/data'
import { RankedModel } from '@/types/model'
import { formatPrice, formatNumber, getProviderColor } from '@/lib/utils'

const allModels = getAllRankedModels()

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const filteredModels = allModels.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.provider.toLowerCase().includes(query.toLowerCase())
  )

  const selectedModels = allModels.filter((m) => selected.includes(m.id))

  const toggleModel = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    )
  }

  const metrics: { label: string; key: keyof RankedModel; format?: (v: number) => string; higherBetter: boolean }[] = [
    { label: 'ELO 评分', key: 'eloScore', higherBetter: true },
    { label: '编程', key: 'codingScore', higherBetter: true },
    { label: '写作', key: 'writingScore', higherBetter: true },
    { label: '数学', key: 'mathScore', higherBetter: true },
    { label: '推理', key: 'reasoningScore', higherBetter: true },
    { label: '创意', key: 'creativityScore', higherBetter: true },
    { label: '多语言', key: 'multilingualScore', higherBetter: true },
    { label: '输入价格', key: 'pricePerMillionInput', format: formatPrice, higherBetter: false },
    { label: '输出价格', key: 'pricePerMillionOutput', format: formatPrice, higherBetter: false },
    { label: '上下文窗口', key: 'contextWindow', format: formatNumber, higherBetter: true },
    { label: '生成速度 (t/s)', key: 'tokensPerSecond', higherBetter: true },
    { label: '延迟 (ms)', key: 'latencyMs', format: (v) => `${v}ms`, higherBetter: false },
    { label: '性价比分', key: 'valueScore', higherBetter: true },
  ]

  function getBestValue(key: keyof RankedModel, higherBetter: boolean): number | undefined {
    if (selectedModels.length === 0) return undefined
    const values = selectedModels.map((m) => Number(m[key]))
    return higherBetter ? Math.max(...values) : Math.min(...values)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">模型对比</h1>
        <p className="text-muted text-sm">选择最多 4 个模型进行详细对比</p>
      </div>

      {/* Model selector */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索模型名称或厂商..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {filteredModels.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleModel(m.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected.includes(m.id)
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'bg-white/5 text-muted hover:text-foreground hover:bg-white/8 border border-transparent'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      {selectedModels.length > 0 && (
        <div className="rounded-xl bg-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-left text-xs text-muted uppercase">指标</th>
                  {selectedModels.map((m) => (
                    <th key={m.id} className="py-3 px-4 text-center">
                      <div className="font-semibold">{m.name}</div>
                      <div className={`text-xs ${getProviderColor(m.provider)}`}>{m.provider}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => {
                  const bestVal = getBestValue(metric.key, metric.higherBetter)
                  return (
                    <tr key={metric.label} className="border-b border-border/50 rank-row">
                      <td className="py-3 px-4 text-sm text-muted">{metric.label}</td>
                      {selectedModels.map((m) => {
                        const val = Number(m[metric.key])
                        const isBest = val === bestVal && selectedModels.length > 1
                        return (
                          <td key={m.id} className={`py-3 px-4 text-center text-sm tabular-nums ${isBest ? 'font-bold text-accent-green' : ''}`}>
                            {metric.format ? metric.format(val) : val}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedModels.length === 0 && (
        <div className="text-center py-16 text-muted">
          <p className="text-lg mb-2">请选择要对比的模型</p>
          <p className="text-sm">点击上方模型名称即可添加对比</p>
        </div>
      )}
    </div>
  )
}
