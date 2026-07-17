import Link from 'next/link'
import { getCategories } from '@/lib/data'

export default function Header() {
  const categories = getCategories()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-purple text-white font-bold text-lg">
              A
            </div>
            <span className="text-xl font-bold text-gradient">
              AI Arena
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              综合排名
            </Link>
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.key}
                href={`/ranking/${cat.key}`}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/compare"
              className="hidden sm:flex px-3 py-1.5 rounded-lg text-sm font-medium border border-border hover:border-accent/50 hover:text-accent transition-colors"
            >
              模型对比
            </Link>
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
            >
              管理
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-border overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 min-w-max">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            🏆 综合
          </Link>
          {categories.slice(1).map((cat) => (
            <Link
              key={cat.key}
              href={`/ranking/${cat.key}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              {cat.icon} {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
