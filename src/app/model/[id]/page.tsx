import { getModelById, getAllRankedModels } from '@/lib/data'
import Link from 'next/link'
import { getProviderColor, getProviderBg, formatNumber, formatPrice } from '@/lib/utils'

export function generateStaticParams() {
  const models = getAllRankedModels()
  return models.map((m) => ({ id: m.id }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { id } = await params
  const model = getModelById(id)

  if (!model) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">模型未找到</h1>
        <Link href="/" className="text-accent hover:underline">返回首页</Link>
      </div>
    )
  }

  const scores = [
    { label: '编程', value: model.codingScore, color: '#3b82f6' },
    { label: '写作', value: model.writingScore, color: '#8b5cf6' },
    { label: '数学', value: model.mathScore, color: '#10b981' },
    { label: '推理', value: model.reasoningScore, color: '#f59e0b' },
    { label: '创意', value: model.creativityScore, color: '#ec4899' },
    { label: '多语言', value: model.multilingualScore, color: '#06b6d4' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-6 transition-colors">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        返回排名
      </Link>

      {/* Model header */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
        <div className={`flex h-20 w-20 items-center justify-center rounded-2xl border text-3xl font-bold ${getProviderBg(model.provider)}`}>
          {model.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-foreground">{model.name}</h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent-green/10 text-accent-green border border-accent-green/20">
              #{model.rank}
            </span>
          </div>
          <div className={`text-sm font-medium mb-2 ${getProviderColor(model.provider)}`}>
            {model.provider}
          </div>
          <p className="text-muted text-sm max-w-2xl">{model.description}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted">
            <span>发布: {model.releaseDate}</span>
            <span>·</span>
            <span>ELO: <span className="text-foreground font-semibold">{model.eloScore}</span></span>
            <span>·</span>
            <span>上下文: {formatNumber(model.contextWindow)} tokens</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score radar area */}
        <div className="lg:col-span-2 rounded-xl bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">能力评分</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {scores.map((s) => (
              <div key={s.label} className="rounded-lg bg-background/50 border border-border/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">{s.label}</span>
                  <span className="text-lg font-bold tabular-nums" style={{ color: s.color }}>
                    {s.value}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.value}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">价格</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">输入价格</span>
                <span className="text-sm font-medium tabular-nums">{formatPrice(model.pricePerMillionInput)}/M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">输出价格</span>
                <span className="text-sm font-medium tabular-nums">{formatPrice(model.pricePerMillionOutput)}/M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">性价比分</span>
                <span className="text-sm font-bold text-accent-green tabular-nums">{model.valueScore}</span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">性能</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">延迟</span>
                <span className="text-sm font-medium tabular-nums">{model.latencyMs}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">生成速度</span>
                <span className="text-sm font-medium tabular-nums">{model.tokensPerSecond} t/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">上下文窗口</span>
                <span className="text-sm font-medium tabular-nums">{formatNumber(model.contextWindow)}</span>
              </div>
            </div>
          </div>

          {/* Data source */}
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">数据信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted">数据来源</span>
                <span className="text-sm font-medium capitalize">{model.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted">更新时间</span>
                <span className="text-sm font-medium">{new Date(model.capturedAt).toLocaleDateString('zh-CN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
