import { describe, expectTypeOf, test } from 'vitest'
import { ensureAwaitable, ensureNotAwaitable } from '.'

describe('ensureAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    const result = ensureAwaitable(target)
    expectTypeOf(result).toEqualTypeOf<Promise<void>>()
  })

  test('ensure unknown types', () => {
    const target = 'string' as unknown
    const result = ensureAwaitable(target)
    expectTypeOf(result).toEqualTypeOf<PromiseLike<unknown>>()
  })

  test('ensure union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureAwaitable(target)
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })
})

describe('ensureNotAwaitable type tests', () => {
  test('ensure definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    const result = ensureNotAwaitable(target)
    expectTypeOf(result).toEqualTypeOf<void>()
  })

  test('ensure unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotAwaitable(target)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('ensure union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensureNotAwaitable(target)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })
})
