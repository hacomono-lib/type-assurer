import { describe, expectTypeOf, test } from 'vitest'
import { assertAwaitable, assertNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('assert definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    assertAwaitable(target)
    expectTypeOf(target).toEqualTypeOf<Promise<void>>()
  })

  test('assert unknown types', () => {
    const target = 'string' as unknown
    assertAwaitable(target)
    expectTypeOf(target).toEqualTypeOf<PromiseLike<unknown>>()
  })

  test('assert union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertAwaitable(target)
    expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
  })
})

describe('isNotAwaitable type tests', () => {
  test('assert definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    assertNotAwaitable(target)
    expectTypeOf(target).toEqualTypeOf<void>()
  })

  test('assert unknown types', () => {
    const target = 'string' as unknown
    assertNotAwaitable(target)
    expectTypeOf(target).toEqualTypeOf<unknown>()
  })

  test('assert union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertNotAwaitable(target)
    expectTypeOf(target).toEqualTypeOf<string | number>()
  })
})
