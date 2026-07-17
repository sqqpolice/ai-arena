import { NextResponse } from 'next/server'
import { getAllRankedModels } from '@/lib/data'

export async function GET() {
  const models = getAllRankedModels()
  return NextResponse.json({
    models,
    updatedAt: new Date().toISOString(),
    total: models.length,
  })
}
