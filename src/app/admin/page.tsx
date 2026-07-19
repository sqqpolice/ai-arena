'use client'

import { useState } from 'react'
import { getAllRankedModels } from '@/lib/data'

export default function AdminPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateResult, setUpdateResult] = useState<string | null>(null)

  const models = getAllRankedModels()

  const handleUpdate = async (source: string) => {
    setIsUpdating(true)
    setUpdateResult(null)
    // GitHub Pages 为纯静态站点，数据更新需在本地修改 data.ts 后重新部署
    setTimeout(() => {
      setUpdateResult(`静态站点模式下，请修改 src/lib/data.ts 数据文件后，git push 到 GitHub 自动更新。`)
      setIsUpdating(false)
    }, 500)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">管理后台</h1>
        <p className="text-muted text-sm">数据更新与模型管理</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data update panel */}
        <div className="rounded-xl bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">数据更新</h2>
          <div className="space-y-3">
            <button
              onClick={() => handleUpdate('lmsys')}
              disabled={isUpdating}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors disabled:opacity-50"
            >
              <div>
                <div className="font-medium text-sm">从 LMSYS 拉取</div>
                <div className="text-xs text-muted mt-0.5">获取 Chatbot Arena ELO 数据</div>
              </div>
              <span className="text-xs text-muted">ELO</span>
            </button>

            <button
              onClick={() => handleUpdate('openrouter')}
              disabled={isUpdating}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-background/50 border border-border hover:border-accent/30 transition-colors disabled:opacity-50"
            >
              <div>
                <div className="font-medium text-sm">从 OpenRouter 拉取</div>
                <div className="text-xs text-muted mt-0.5">获取模型列表和价格信息</div>
              </div>
              <span className="text-xs text-muted">价格</span>
            </button>

            <button
              onClick={() => handleUpdate('all')}
              disabled={isUpdating}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-colors disabled:opacity-50"
            >
              <div>
                <div className="font-medium text-sm text-accent">全量更新</div>
                <div className="text-xs text-muted mt-0.5">从所有数据源拉取最新数据</div>
              </div>
              <span className="text-xs text-accent">全部</span>
            </button>
          </div>

          {updateResult && (
            <div className="mt-4 p-3 rounded-lg bg-accent-green/10 border border-accent-green/20 text-sm text-accent-green">
              {updateResult}
            </div>
          )}
        </div>

        {/* Model list */}
        <div className="rounded-xl bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">
            已收录模型
            <span className="ml-2 text-sm font-normal text-muted">({models.length})</span>
          </h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {models.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-background/50 border border-border/50">
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-xs text-muted">{m.provider}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted tabular-nums">ELO {m.eloScore}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    m.source === 'lmsys' ? 'bg-blue-500/10 text-blue-400' :
                    m.source === 'openrouter' ? 'bg-purple-500/10 text-purple-400' :
                    m.source === 'api' ? 'bg-green-500/10 text-green-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {m.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manual input */}
        <div className="lg:col-span-2 rounded-xl bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">手动添加/更新模型</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input placeholder="模型名称" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="厂商" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="ELO 评分" type="number" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="发布日期" type="date" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-4">
            <input placeholder="编程" type="number" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="写作" type="number" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="数学" type="number" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="推理" type="number" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="输入价格/M" type="number" step="0.01" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
            <input placeholder="输出价格/M" type="number" step="0.01" className="px-3 py-2 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>
          <button className="mt-4 px-6 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors">
            保存模型数据
          </button>
        </div>
      </div>
    </div>
  )
}
