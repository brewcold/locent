import type { AuctionQuery, MarketQuery } from './lostarkApi.types'

export const MARKET_QUERIES: MarketQuery[] = [
  { name: '재련재료', code: 50010, tier: null, grade: '일반', keyword: '운명의' },
  { name: '아비도스', code: 50010, tier: null, grade: '희귀', keyword: '아비도스' },
  { name: '상비도스', code: 50010, tier: null, grade: '영웅', keyword: '아비도스' },
  { name: '숨결', code: 50020, tier: 4, grade: '영웅', keyword: '숨결' },
  { name: '각인서', code: 40000, tier: null, grade: '유물', keyword: '각인서' },
]

export const AUCTION_QUERY: AuctionQuery = {
  name: '10겁작',
  code: 210000,
  tier: 4,
  grade: '고대',
  keyword: '10레벨',
}

export const TRACKED_ENGRAVINGS = [
  '원한',
  '아드레날린',
  '예리한 둔기',
  '질량 증가',
  '돌격대장',
  '타격의 대가',
  '기습의 대가',
  '결투의 대가',
  '저주받은 인형',
  '안정된 상태',
  '각성',
  '구슬동자',
  '마나의 흐름',
  '전문의',
] as const
