export interface MarketQuery {
  name: string
  code: number
  tier: number | null
  grade: string
  keyword: string | null
  page?: number
}

export interface AuctionQuery {
  name: string
  code: number
  tier: number
  grade: string
  keyword: string
}

export interface MarketItem {
  Id: number
  Name: string
  Grade: string
  Icon: string
  BundleCount: number
  TradeRemainCount: number | null
  YDayAvgPrice: number
  RecentPrice: number
  CurrentMinPrice: number
}

export interface MarketResponse {
  PageNo: number
  PageSize: number
  TotalCount: number
  Items: MarketItem[]
}

export interface AuctionInfo {
  StartPrice: number
  BuyPrice: number
  BidPrice: number
  EndDate: string
  BidCount: number
  BidStartPrice: number
  IsCompetitive: boolean
  TradeAllowCount: number
  UpgradeLevel: number | null
}

export interface GemOption {
  Type: 'GEM_SKILL_DAMAGE' | 'GEM_SKILL_COOLDOWN_REDUCTION'
  OptionName: string
  OptionNameTripod: string
  Value: number
  IsPenalty: boolean
  ClassName: string
  IsValuePercentage: boolean
}

export interface AuctionItem {
  Name: string
  Grade: string
  Tier: number
  Level: number
  Icon: string
  GradeQuality: number | null
  AuctionInfo: AuctionInfo
  Options: GemOption[]
}

export interface AuctionResponse {
  PageNo: number
  PageSize: number
  TotalCount: number
  Items: AuctionItem[]
}
