import { test, describe, assertType } from 'vitest'
import { isPromise, isNotPromise } from '.'

describe('isPromise type tests', () => {
  test('guard definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    if (isPromise(targetPromise)) {
      assertType<Promise<void>>(targetPromise)
    } else {
      assertType<void>(targetPromise)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isPromise(targetUnknown)) {
      assertType<PromiseLike<unknown>>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isPromise(targetUnion)) {
      assertType<Promise<string | number>>(targetUnion)
    } else {
      assertType<string | number>(targetUnion)
    }
  })
})

describe('isNotPromise type tests', () => {
  test('guard definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    if (isNotPromise(targetPromise)) {
      assertType<void>(targetPromise)
    } else {
      assertType<Promise<void>>(targetPromise)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotPromise(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<PromiseLike<unknown>>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isNotPromise(targetUnion)) {
      assertType<string | number>(targetUnion)
    } else {
      assertType<Promise<string | number>>(targetUnion)
    }
  })
})
