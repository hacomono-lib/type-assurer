import { test, describe, expectTypeOf } from 'vitest'
import { assertPromise } from '.'

describe('isPromise type tests', () => {
  test('assert definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    assertPromise(targetPromise)
    expectTypeOf(targetPromise).toEqualTypeOf<Promise<void>>()
  })

  test('assert unknown types', () => {
    const targetUnknown = Promise.resolve() as unknown
    assertPromise(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<Promise<unknown>>()
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertPromise(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<Promise<string | number>>()
  })
})
