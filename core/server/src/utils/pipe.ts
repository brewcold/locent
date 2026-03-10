type UnaryFn<A = unknown, R = unknown> = (arg: A) => R

export function pipe<A, B>(v: A, fn1: (a: A) => B): B
export function pipe<A, B, C>(v: A, fn1: (a: A) => B, fn2: (b: B) => C): C
export function pipe<A, B, C, D>(v: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): D
export function pipe<A, B, C, D, E>(v: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E): E
export function pipe<A, B, C, D, E, F>(v: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D, fn4: (d: D) => E, fn5: (e: E) => F): F
export function pipe<A, B, C, D, E, F, G>(
  v: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  v: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  v: A,
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E,
  fn5: (e: E) => F,
  fn6: (f: F) => G,
  fn7: (g: G) => H,
  fn8: (h: H) => I
): I
export function pipe(v: unknown, ...fns: UnaryFn[]) {
  return fns.reduce((acc, fn) => fn(acc), v)
}
