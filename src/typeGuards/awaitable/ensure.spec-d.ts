import { test, describe, expectTypeOf } from 'vitest'
import { ensureAwaitable, ensureNotAwaitable } from '.'

describe('ensureAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    const result = ensureAwaitable(targetAwaitable)
    expectTypeOf(result).toEqualTypeOf<Promise<void>>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureAwaitable(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<PromiseLike<unknown>>()
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureAwaitable(targetUnion)
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })
})

describe('ensureNotAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    const result = ensureNotAwaitable(targetAwaitable)
    expectTypeOf(result).toEqualTypeOf<void>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotAwaitable(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureNotAwaitable(targetUnion)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })
})
