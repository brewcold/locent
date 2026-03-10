import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: '로센트 - 로스트아크 가격변동 알림' }, { name: 'description', content: '로스트아크 거래소 가격변동 알림' }]
}

export default function Home() {
  return <div>Locent</div>
}
