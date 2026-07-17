export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent to-accent-purple text-white font-bold text-xs">
              A
            </div>
            <span className="text-sm text-muted">
              AI Arena &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>数据更新于 {new Date().toLocaleDateString('zh-CN')}</span>
            <span>·</span>
            <span>数据来源: LMSYS, OpenRouter, 官方 API</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
