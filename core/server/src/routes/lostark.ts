import { Hono } from 'hono'
import { fetchAllAuctionItems, fetchAllMarketItems } from 'utils/lostarkApi'
import { TRACKED_ENGRAVINGS } from 'utils/lostarkApi.constant'
import type { MarketItem } from '@locent/superarmor'
import { cache } from 'utils/cache'

const lostark = new Hono()
const CACHE_MS = 1000 * 60 * 10

lostark.get('/gem', async c => {
  const key = process.env.LOSTARK_OPENAPI_KEY || ''
  if (!key) throw new Error('API KEY가 없어요')
  const getAuctionItems = cache(async () => await fetchAllAuctionItems(key), CACHE_MS)
  const 보석 = await getAuctionItems()
  const 최저가_보석_겁화 = 보석.find(g => g.Name.includes('겁화'))?.AuctionInfo.BuyPrice
  const 최저가_보석_작열 = 보석.find(g => g.Name.includes('작열'))?.AuctionInfo.BuyPrice

  return c.json({
    겁화: 최저가_보석_겁화,
    작열: 최저가_보석_작열,
  })
})

lostark.get('/material', async c => {
  const key = process.env.LOSTARK_OPENAPI_KEY || ''
  if (!key) throw new Error('API KEY가 없어요')

  const getMarketItems = cache(async () => await fetchAllMarketItems(key), CACHE_MS)
  const { 재련재료, 아비도스, 상비도스, 숨결, 각인서 } = await getMarketItems()

  const 파괴석_수호석 = new Map<string, MarketItem>()
  재련재료?.forEach(cur => 파괴석_수호석.set(cur.Name, cur))

  const 각인서들 = new Map<string, MarketItem>()
  각인서?.forEach(eb => TRACKED_ENGRAVINGS.some(name => eb.Name.includes(name)) && 각인서들.set(eb.Name, eb))

  return c.json({
    파괴석_수호석,
    아비도스,
    상비도스,
    숨결,
    각인서들,
  })
})

export default lostark
