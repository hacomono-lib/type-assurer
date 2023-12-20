import { describe, expectTypeOf, test } from 'vitest'
import { ensurePromise } from '.'

describe('ensurePromise type tests', () => {
  test('ensure definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<Promise<void>>()
  })

  test('ensure unknown types', () => {
    const target = Promise.resolve() as unknown
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<Promise<unknown>>()
  })

  test('ensure union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })
})
