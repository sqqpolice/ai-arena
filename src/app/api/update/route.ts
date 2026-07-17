import { NextRequest, NextResponse } from 'next/server'

// 数据更新 API
// 实际项目中这里会调用 LMSYS / OpenRouter 等外部 API
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { source } = body as { source: string }

  // 模拟更新过程
  const startTime = Date.now()

  // 实际项目中：
  // 1. source === 'lmsys' → 调用 LMSYS Chatbot Arena API 获取 ELO
  // 2. source === 'openrouter' → 调用 OpenRouter API 获取价格和模型列表
  // 3. source === 'all' → 依次调用所有数据源

  const updateResults: Record<string, { status: string; modelsUpdated: number; message: string }> = {
    lmsys: {
      status: 'success',
      modelsUpdated: 10,
      message: '已从 LMSYS Chatbot Arena 更新 10 个模型的 ELO 数据',
    },
    openrouter: {
      status: 'success',
      modelsUpdated: 10,
      message: '已从 OpenRouter 更新 10 个模型的价格信息',
    },
    all: {
      status: 'success',
      modelsUpdated: 10,
      message: '全量更新完成：已更新 10 个模型的所有数据',
    },
  }

  const result = updateResults[source] || updateResults['all']
  const elapsed = Date.now() - startTime

  return NextResponse.json({
    ...result,
    elapsed: `${elapsed}ms`,
    timestamp: new Date().toISOString(),
  })
}
