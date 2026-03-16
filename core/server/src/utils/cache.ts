export function cache<T>(fn: () => Promise<T>, ms: number) {
  let value: T | undefined
  let expires = 0
  let pending: Promise<T> | null = null

  return async () => {
    const now = Date.now()

    if (value !== undefined && now < expires) {
      return value
    }

    if (pending) {
      return pending
    }

    pending = fn()
      .then(result => {
        value = result
        expires = Date.now() + ms
        pending = null
        return result
      })
      .catch(err => {
        pending = null
        throw err
      })

    return pending
  }
}
