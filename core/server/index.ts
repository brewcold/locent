import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', c => {
  return c.text(`${new Date().toLocaleString()}\n로센트 서버 상태 : 🟢`)
})

serve({ fetch: app.fetch, port: 3100 }, info => {
  console.log(`Server running at http://localhost:${info.port}`)
})

export default app
