import { test, describe, assertType } from 'vitest'
import { assertAwaitable, assertNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('assert definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertAwaitable(targetAwaitable)
    assertType<Promise<void>>(targetAwaitable)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertAwaitable(targetUnknown)
    assertType<PromiseLike<unknown>>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertAwaitable(targetUnion)
    assertType<Promise<string | number>>(targetUnion)
  })
})

describe('isNotAwaitable type tests', () => {
  test('assert definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    assertNotAwaitable(targetAwaitable)
    assertType<void>(targetAwaitable)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotAwaitable(targetUnknown)
    assertType<unknown>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertNotAwaitable(targetUnion)
    assertType<string | number>(targetUnion)
  })
})
