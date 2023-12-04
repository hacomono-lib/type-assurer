import { test, describe, assertType } from 'vitest'
import { assertPromise, assertNotPromise } from '.'

describe('isPromise type tests', () => {
  test('assert definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    assertPromise(targetPromise)
    assertType<Promise<void>>(targetPromise)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertPromise(targetUnknown)
    assertType<PromiseLike<unknown>>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertPromise(targetUnion)
    assertType<Promise<string | number>>(targetUnion)
  })
})

describe('isNotPromise type tests', () => {
  test('assert definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    assertNotPromise(targetPromise)
    assertType<void>(targetPromise)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotPromise(targetUnknown)
    assertType<unknown>(targetUnknown)
  })

  test('assert union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertNotPromise(targetUnion)
    assertType<string | number>(targetUnion)
  })
})
