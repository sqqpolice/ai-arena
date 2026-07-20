/**
 * AI Arena 数据自动更新脚本
 * 
 * 数据来源：
 *   - OpenRouter API: 模型列表、价格、上下文窗口
 *   - LMSYS Chatbot Arena: ELO 排名（通过公开数据）
 * 
 * 用法：node scripts/update-data.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_FILE = join(__dirname, '..', 'src', 'lib', 'data.ts')

// ===== 1. 从 OpenRouter 获取模型数据 =====
async function fetchOpenRouterModels() {
  console.log('[OpenRouter] 正在获取模型列表和价格...')
  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', {
      headers: { 'User-Agent': 'AI-Arena-Updater/1.0' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const models = json.data || []
    console.log(`[OpenRouter] 获取到 ${models.length} 个模型`)

    // 构建价格映射表
    const priceMap = {}
    for (const m of models) {
      const id = m.id || ''
      const pricing = m.pricing || {}
      priceMap[id] = {
        name: m.name || m.id,
        inputPrice: parseFloat(pricing.prompt || '0') * 1000000, // per million tokens
        outputPrice: parseFloat(pricing.completion || '0') * 1000000,
        contextWindow: m.context_length || 0,
        provider: m.architecture?.modality?.includes('text') ? 'unknown' : 'unknown',
      }
    }
    return priceMap
  } catch (err) {
    console.error('[OpenRouter] 获取失败:', err.message)
    return {}
  }
}

// ===== 2. 从 Swfte.com 获取 ELO 排名 =====
async function fetchEloRankings() {
  console.log('[ELO] 正在获取 ELO 排名数据...')
  // LMSYS 没有稳定的公开 API，使用硬编码的最新排名快照
  // 每次手动更新这个快照即可
  const latestElo = {
    'claude-fable-5': 1525, 'gpt-5-6': 1514, 'claude-opus-4-8': 1512,
    'gpt-5-5-pro': 1510, 'gemini-3-2-pro': 1508, 'gpt-5-5': 1506,
    'claude-opus-4-7': 1505, 'gemini-3-1-pro': 1505, 'grok-4-3': 1496,
    'grok-4-20': 1496, 'gpt-5-4': 1495, 'claude-opus-4-6': 1490,
    'qwen3-7-max': 1488, 'claude-sonnet-5': 1479, 'claude-opus-4-5': 1480,
    'deepseek-v4-5': 1471, 'kimi-k3': 1475, 'deepseek-v4-pro': 1467,
    'claude-sonnet-4-6': 1467, 'glm-5-1': 1467, 'kimi-k2-6': 1466,
    'llama-5': 1466, 'gpt-5': 1455, 'minimax-m3': 1455, 'deepseek-v3-2': 1455,
    'kimi-k2-5': 1452, 'glm-5': 1450, 'qwen3-6-plus': 1448,
    'qwen3-6-max': 1445, 'deepseek-r1': 1440, 'kimi-k2-7-code': 1440,
    'nex-n2-pro': 1435, 'claude-sonnet-4-5': 1430, 'mistral-large-3': 1420,
    'gemini-3-5-flash': 1400, 'gemini-2-5-pro': 1345, 'grok-3': 1330,
    'claude-sonnet-4': 1320, 'gpt-4-1': 1310, 'deepseek-v3': 1310,
    'o3': 1370, 'claude-opus-4': 1360, 'o3-mini': 1305, 'o1': 1290,
    'gpt-4o': 1285, 'qwen3-5-9b': 1280, 'grok-3-beta': 1380,
    'mistral-medium-3-5': 1390, 'tencent-hy3': 1350, 'glm-5-2': 1460,
    'gpt-5-6-sol': 1518, 'gpt-5-6-terra': 1502, 'gpt-5-6-luna': 1460,
    'grok-4-5': 1500, 'muse-spark-1-1': 1440,
  }
  console.log(`[ELO] 加载了 ${Object.keys(latestElo).length} 个模型的 ELO 数据`)
  return latestElo
}

// ===== 3. 匹配 OpenRouter 模型 ID 到我们的模型 ID =====
function matchOpenRouterId(modelId, priceMap) {
  // 常见映射规则
  const mappings = {
    'anthropic/claude-fable-5': 'claude-fable-5',
    'openai/gpt-5.6': 'gpt-5-6',
    'anthropic/claude-opus-4.8': 'claude-opus-4-8',
    'openai/gpt-5.5-pro': 'gpt-5-5-pro',
    'google/gemini-3.2-pro': 'gemini-3-2-pro',
    'anthropic/claude-opus-4.7': 'claude-opus-4-7',
    'xai/grok-4.3': 'grok-4-3',
    'qwen/qwen3.7-max': 'qwen3-7-max',
    'anthropic/claude-sonnet-5': 'claude-sonnet-5',
    'deepseek/deepseek-v4.5': 'deepseek-v4-5',
    'moonshot/kimi-k2.6': 'kimi-k2-6',
    'openai/o3': 'o3',
    'google/gemini-2.5-pro': 'gemini-2.5-pro',
    'anthropic/claude-opus-4': 'claude-opus-4',
    'meta-llama/llama-5': 'llama-5',
    'deepseek/deepseek-v4-pro': 'deepseek-v4-pro',
    'openai/gpt-5': 'gpt-5',
    'minimax/minimax-m3': 'minimax-m3',
    'xai/grok-3': 'grok-3',
    'qwen/qwen3.6-plus': 'qwen3-6-plus',
    'openai/gpt-5.5': 'gpt-5-5',
    'openai/gpt-5.4': 'gpt-5-4',
    'anthropic/claude-opus-4.6': 'claude-opus-4-6',
    'google/gemini-3.1-pro': 'gemini-3-1-pro',
    'anthropic/claude-sonnet-4.6': 'claude-sonnet-4-6',
    'xai/grok-4.20': 'grok-4-20',
    'moonshot/kimi-k2.5': 'kimi-k2-5',
    'zai/glm-5.2': 'glm-5-2',
    'zai/glm-5.1': 'glm-5-1',
    'zai/glm-5': 'glm-5',
    'anthropic/claude-sonnet-4': 'claude-sonnet-4',
    'deepseek/deepseek-v3.2': 'deepseek-v3-2',
    'deepseek/deepseek-v3': 'deepseek-v3',
    'deepseek/deepseek-r1': 'deepseek-r1',
    'openai/gpt-4.1': 'gpt-4-1',
    'openai/gpt-4o': 'gpt-4o',
    'openai/o3-mini': 'o3-mini',
    'openai/o1': 'o1',
    'mistralai/mistral-large-3': 'mistral-large-3',
    'google/gemini-3.5-flash': 'gemini-3-5-flash',
    'qwen/qwen3.6-max': 'qwen3-6-max',
    'anthropic/claude-opus-4.5': 'claude-opus-4-5',
    'anthropic/claude-sonnet-4.5': 'claude-sonnet-4-5',
    'moonshot/kimi-k2.7-code': 'kimi-k2-7-code',
    'xai/grok-3-beta': 'grok-3-beta',
    'mistralai/mistral-medium-3.5': 'mistral-medium-3-5',
    'qwen/qwen3.5-9b': 'qwen3-5-9b',
    'nexagi/nexus-n2-pro': 'nex-n2-pro',
    'moonshot/kimi-k3': 'kimi-k3',
    'tencent/hunyuan-hy3': 'tencent-hy3',
    'xai/grok-4.5': 'grok-4-5',
    'openai/gpt-5.6-sol': 'gpt-5-6-sol',
    'openai/gpt-5.6-terra': 'gpt-5-6-terra',
    'openai/gpt-5.6-luna': 'gpt-5-6-luna',
    'meta/muse-spark-1.1': 'muse-spark-1-1',
  }

  // 反向查找
  for (const [orId, ourId] of Object.entries(mappings)) {
    if (ourId === modelId && priceMap[orId]) {
      return priceMap[orId]
    }
  }
  return null
}

// ===== 4. 更新 data.ts =====
function updateDataFile(eloData, priceMap) {
  console.log('[更新] 正在更新 data.ts...')
  let content = readFileSync(DATA_FILE, 'utf-8')
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
  let updateCount = 0

  // 更新 capturedAt 时间戳
  const oldDateMatch = content.match(/capturedAt: '([^']+)'/g)
  if (oldDateMatch) {
    const oldDate = oldDateMatch[0].match(/'([^']+)'/)[1]
    // 只更新非新增模型的时间戳
    if (!oldDate.startsWith(now.slice(0, 10))) {
      content = content.replace(
        /capturedAt: '\d{4}-\d{2}-\d{2}T[^']*Z'/g,
        (match) => {
          // 保留今天新增的模型时间戳不变
          if (match.includes(now.slice(0, 10))) return match
          updateCount++
          return `capturedAt: '${now}'`
        }
      )
    }
  }

  // 更新数据源日期注释
  const today = new Date().toISOString().slice(0, 10)
  content = content.replace(
    /价格信息 — OpenRouter API \(\d{4}-\d{2}-\d{2}\)/,
    `价格信息 — OpenRouter API (${today})`
  )

  // 尝试用 OpenRouter 价格更新
  const modelIds = Object.keys(eloData)
  for (const modelId of modelIds) {
    const orData = matchOpenRouterId(modelId, priceMap)
    if (orData && orData.inputPrice > 0) {
      // 查找对应的行并更新价格
      const modelRegex = new RegExp(
        `(modelId: '${modelId}'.*?pricePerMillionInput: )([\\d.]+)(.*?pricePerMillionOutput: )([\\d.]+)`
      )
      const match = content.match(modelRegex)
      if (match) {
        const oldInput = parseFloat(match[2])
        const oldOutput = parseFloat(match[4])
        const newInput = Math.round(orData.inputPrice * 100) / 100
        const newOutput = Math.round(orData.outputPrice * 100) / 100
        if (Math.abs(oldInput - newInput) > 0.01 || Math.abs(oldOutput - newOutput) > 0.01) {
          content = content.replace(modelRegex,
            `$1${newInput}$3${newOutput}`
          )
          console.log(`  [价格更新] ${modelId}: $${oldInput}/$${oldOutput} → $${newInput}/$${newOutput}`)
        }
      }
    }
  }

  writeFileSync(DATA_FILE, content, 'utf-8')
  console.log(`[更新] data.ts 已更新，共修改 ${updateCount} 处时间戳`)
  return true
}

// ===== 主流程 =====
async function main() {
  console.log('=== AI Arena 数据更新 ===')
  console.log(`时间: ${new Date().toISOString()}`)
  console.log('')

  const [priceMap, eloData] = await Promise.all([
    fetchOpenRouterModels(),
    fetchEloRankings(),
  ])

  console.log('')
  updateDataFile(eloData, priceMap)

  console.log('')
  console.log('=== 更新完成 ===')
}

main().catch(console.error)
