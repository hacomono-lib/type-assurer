import { test, describe, expectTypeOf } from 'vitest'
import { ensurePromise } from '.'

describe('ensurePromise type tests', () => {
  test('ensure definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    const result = ensurePromise(targetPromise)
    expectTypeOf(result).toEqualTypeOf<Promise<void>>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = Promise.resolve() as unknown
    const result = ensurePromise(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<Promise<unknown>>()
  })

  test('ensure union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensurePromise(targetUnion)
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })
})
