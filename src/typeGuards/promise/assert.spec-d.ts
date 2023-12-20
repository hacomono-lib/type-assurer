import { describe, expectTypeOf, test } from 'vitest'
import { assertPromise } from '.'

describe('isPromise type tests', () => {
  test('assert definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<Promise<void>>()
  })

  test('assert unknown types', () => {
    const target = Promise.resolve() as unknown
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<Promise<unknown>>()
  })

  test('assert union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
  })
})
