import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import lostark from 'routes/lostark'

const app = new Hono()

app.get('/', c => {
  return c.text(`${new Date().toLocaleString()}\n로센트 서버 상태 : 🟢`)
})

app.route('/lostark', lostark)

serve({ fetch: app.fetch, port: 3100 }, info => {
  console.log(`Server running at http://localhost:${info.port}`)
})

export default app
