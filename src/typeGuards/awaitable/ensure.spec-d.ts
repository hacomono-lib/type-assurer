import { test, describe, assertType } from 'vitest'
import { ensureAwaitable, ensureNotAwaitable } from '.'

describe('ensureAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    const result = ensureAwaitable(targetAwaitable)
    assertType<Equals<Promise<void>, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureAwaitable(targetUnknown)
    assertType<Equals<PromiseLike<unknown>, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureAwaitable(targetUnion)
    assertType<Equals<Promise<string | number>, typeof result>>(true)
  })
})

describe('ensureNotAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    const result = ensureNotAwaitable(targetAwaitable)
    assertType<Equals<void, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotAwaitable(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureNotAwaitable(targetUnion)
    assertType<Equals<string | number, typeof result>>(true)
  })
})
