import { getRankedByCategory, getCategoryConfig } from '@/lib/data'
import type { RankingCategory } from '@/types/model'
import RankingTable from '@/components/RankingTable'
import CategoryNav from '@/components/CategoryNav'

// Generate static params for all category routes
export function generateStaticParams() {
  return [
    { category: 'coding' },
    { category: 'writing' },
    { category: 'math' },
    { category: 'reasoning' },
    { category: 'creativity' },
    { category: 'multilingual' },
    { category: 'value' },
  ]
}

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function RankingPage({ params }: PageProps) {
  const { category } = await params
  const cat = category as RankingCategory
  const models = getRankedByCategory(cat)
  const config = getCategoryConfig(cat)
  const scoreKey = config.scoreKey

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{config.icon}</span>
          <h1 className="text-2xl font-bold text-foreground">{config.label}排名</h1>
        </div>
        <p className="text-muted text-sm">{config.description}</p>
      </div>

      {/* Category navigation */}
      <div className="mb-6">
        <CategoryNav currentCategory={cat} />
      </div>

      {/* Ranking table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <RankingTable models={models} category={cat} scoreKey={scoreKey} />
      </div>
    </div>
  )
}
