import { test, describe, assertType } from 'vitest'
import { ensureAwaitable, ensureNotAwaitable } from '.'

describe('ensureAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertType<Promise<void>>(ensureAwaitable(targetAwaitable))
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<PromiseLike<unknown>>(ensureAwaitable(targetUnknown))
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<Promise<string | number>>(ensureAwaitable(targetUnion))
  })
})

describe('ensureNotAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertType<void>(ensureNotAwaitable(targetAwaitable))
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotAwaitable(targetUnknown))
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<string | number>(ensureNotAwaitable(targetUnion))
  })
})
