import { getAllRankedModels, getCategoryConfig } from '@/lib/data'
import RankingTable from '@/components/RankingTable'
import CategoryNav from '@/components/CategoryNav'

export default function HomePage() {
  const models = getAllRankedModels()
  const category = getCategoryConfig('overall')

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-2xl font-bold text-foreground">{category.label}</h1>
        </div>
        <p className="text-muted text-sm">{category.description}</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="text-2xl font-bold text-foreground">{models.length}</div>
          <div className="text-xs text-muted mt-1">参评模型</div>
        </div>
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="text-2xl font-bold text-accent">{models[0]?.eloScore}</div>
          <div className="text-xs text-muted mt-1">最高 ELO</div>
        </div>
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="text-2xl font-bold text-accent-green">今日</div>
          <div className="text-xs text-muted mt-1">最近更新</div>
        </div>
        <div className="rounded-xl bg-card border border-border p-4">
          <div className="text-2xl font-bold text-accent-purple">8</div>
          <div className="text-xs text-muted mt-1">排名维度</div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="mb-6">
        <CategoryNav currentCategory="overall" />
      </div>

      {/* Ranking table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <RankingTable models={models} category="overall" scoreKey="eloScore" />
      </div>
    </div>
  )
}
