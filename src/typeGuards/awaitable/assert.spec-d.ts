import { test, describe, assertType } from 'vitest'
import { assertAwaitable, assertNotAwaitable } from '.'
import { Equals } from '../../lib/test'

describe('isAwaitable type tests', () => {
  test('assert definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertAwaitable(targetAwaitable)
    assertType<Equals<Promise<void>, typeof targetAwaitable>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertAwaitable(targetUnknown)
    assertType<Equals<PromiseLike<unknown>, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertAwaitable(targetUnion)
    assertType<Equals<Promise<string | number>, typeof targetUnion>>(true)
  })
})

describe('isNotAwaitable type tests', () => {
  test('assert definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertNotAwaitable(targetAwaitable)
    assertType<Equals<void, typeof targetAwaitable>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotAwaitable(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertNotAwaitable(targetUnion)
    assertType<Equals<string | number, typeof targetUnion>>(true)
  })
})
