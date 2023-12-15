import { test, describe, expectTypeOf } from 'vitest'
import { assertAwaitable, assertNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('assert definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertAwaitable(targetAwaitable)
    expectTypeOf(targetAwaitable).toEqualTypeOf<Promise<void>>()
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertAwaitable(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<PromiseLike<unknown>>()
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertAwaitable(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<Promise<string | number>>()
  })
})

describe('isNotAwaitable type tests', () => {
  test('assert definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertNotAwaitable(targetAwaitable)
    expectTypeOf(targetAwaitable).toEqualTypeOf<void>()
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotAwaitable(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertNotAwaitable(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<string | number>()
  })
})
