import Link from 'next/link'
import { getCategories } from '@/lib/data'

export default function CategoryNav({ currentCategory }: { currentCategory: string }) {
  const categories = getCategories()

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat.key === currentCategory
        const href = cat.key === 'overall' ? '/' : `/ranking/${cat.key}`

        return (
          <Link
            key={cat.key}
            href={href}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              transition-all duration-200
              ${isActive
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-lg shadow-accent/5'
                : 'bg-white/5 text-muted hover:text-foreground hover:bg-white/8 border border-transparent'
              }
            `}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
