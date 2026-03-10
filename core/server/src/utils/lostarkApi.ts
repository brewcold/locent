import { AUCTION_QUERY, MARKET_QUERIES } from './lostarkApi.constant.js'
import type { MarketQuery, AuctionQuery, MarketResponse, AuctionResponse, AuctionItem, MarketItem } from './lostarkApi.types.js'

const BASE_URL = 'https://developer-lostark.game.onstove.com'

async function post<T>(path: string, body: Record<string, unknown>, apiKey: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`*** LostArk API ERROR ${res.status} ${res.statusText} — ${path}`)
  }

  return res.json() as Promise<T>
}

export async function fetchMarketItems(query: MarketQuery, apiKey: string): Promise<MarketResponse> {
  return post<MarketResponse>(
    '/markets/items',
    {
      Sort: 'GRADE',
      CategoryCode: query.code,
      CharacterClass: '',
      ItemTier: query.tier,
      ItemGrade: query.grade,
      ItemName: query.keyword,
      PageNo: query.page ?? 1,
      SortCondition: 'ASC',
    },
    apiKey
  )
}

export async function fetchAllMarketItems(apiKey: string) {
  const results: Record<string, MarketItem[]> = {}

  for (const query of MARKET_QUERIES) {
    results[query.name] = await fetchAllMarketPages(query, apiKey)
  }

  return results
}

export async function fetchAllMarketPages(query: MarketQuery, apiKey: string): Promise<MarketItem[]> {
  const items: MarketItem[] = []
  let page = 1
  let totalCount = Infinity

  while (items.length < totalCount) {
    const res = await fetchMarketItems({ ...query, page }, apiKey)

    if (page === 1) totalCount = res.TotalCount
    if (!res.Items?.length) break

    items.push(...res.Items)
    page++
  }

  return items
}

async function fetchAuctionPage(query: AuctionQuery, page: number, apiKey: string): Promise<AuctionResponse> {
  return post<AuctionResponse>(
    '/auctions/items',
    {
      ItemLevelMin: 0,
      ItemLevelMax: 0,
      ItemGradeQuality: null,
      ItemUpgradeLevel: null,
      ItemTradeAllowCount: null,
      SkillOptions: [{ FirstOption: null, SecondOption: null, MinValue: null, MaxValue: null }],
      EtcOptions: [{ FirstOption: null, SecondOption: null, MinValue: null, MaxValue: null }],
      Sort: 'BIDSTART_PRICE',
      CategoryCode: query.code,
      CharacterClass: '',
      ItemTier: query.tier,
      ItemGrade: query.grade,
      ItemName: query.keyword,
      PageNo: page,
      SortCondition: 'ASC',
    },
    apiKey
  )
}

export async function fetchAllAuctionItems(apiKey: string): Promise<AuctionItem[]> {
  const items: AuctionItem[] = []
  let page = 1
  let totalCount = Infinity

  while (items.length < totalCount) {
    const res = await fetchAuctionPage(AUCTION_QUERY, page, apiKey)

    if (page === 1) totalCount = res.TotalCount
    if (!res.Items?.length) break

    items.push(...res.Items)
    page++
  }

  return items
}
