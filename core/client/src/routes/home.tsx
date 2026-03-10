import { useLoaderData } from 'react-router'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: '로센트 - 로스트아크 가격변동 알림' }, { name: 'description', content: '로스트아크 거래소 가격변동 알림' }]
}

export async function loader() {
  const url = process.env.SERVER_ROOT!
  const data = await fetch(`${url}/lostark`)
  const text = await data.text()
  return { text }
}

export default function Home() {
  const { text } = useLoaderData<typeof loader>()
  return <div>{text}</div>
}
