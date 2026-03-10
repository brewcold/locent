import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { fetchAllAuctionItems, fetchAllMarketItems, fetchAllMarketPages } from 'utils/lostarkApi'
import { TRACKED_ENGRAVINGS } from 'utils/lostarkApi.constant'
import type { MarketItem } from 'utils/lostarkApi.types'

const lostark = new Hono()

lostark.get('/', async c => {
  const key = process.env.LOSTARK_OPENAPI_KEY || ''
  if (!key) throw new Error('API KEY가 없어요')

  const { 재련재료, 아비도스, 상비도스, 숨결, 각인서 } = await fetchAllMarketItems(key)
  const 파괴석_수호석 = 재련재료?.map(i => `${i.Name} ${i.CurrentMinPrice}`)

  const 각인서들 = new Map<string, MarketItem>()
  for (const eb of 각인서 ?? []) {
    if (TRACKED_ENGRAVINGS.some(name => eb.Name.includes(name))) 각인서들.set(eb.Name, eb)
  }
  const 보석 = await fetchAllAuctionItems(key)
  const 최저가_보석_겁화 = 보석.find(g => g.Name.includes('겁화'))?.AuctionInfo.BuyPrice
  const 최저가_보석_작열 = 보석.find(g => g.Name.includes('작열'))?.AuctionInfo.BuyPrice

  return c.text(
    `${파괴석_수호석?.join('\n')}\n\n${최저가_보석_겁화}\n\n${최저가_보석_작열}\n\n${각인서들
      .entries()
      .map(([k, v]) => `${k}/${v.CurrentMinPrice}`)
      .toArray()
      .join('\n')}`
  )
})

export default lostark
