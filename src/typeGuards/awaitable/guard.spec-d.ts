import { test, describe, assertType } from 'vitest'
import { isAwaitable, isNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('guard definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    if (isAwaitable(targetAwaitable)) {
      assertType<Promise<void>>(targetAwaitable)
    } else {
      assertType<void>(targetAwaitable)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isAwaitable(targetUnknown)) {
      assertType<PromiseLike<unknown>>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isAwaitable(targetUnion)) {
      assertType<Promise<string | number>>(targetUnion)
    } else {
      assertType<string | number>(targetUnion)
    }
  })
})

describe('isNotAwaitable type tests', () => {
  test('guard definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    if (isNotAwaitable(targetAwaitable)) {
      assertType<void>(targetAwaitable)
    } else {
      assertType<Promise<void>>(targetAwaitable)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotAwaitable(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<PromiseLike<unknown>>(targetUnknown)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isNotAwaitable(targetUnion)) {
      assertType<string | number>(targetUnion)
    } else {
      assertType<Promise<string | number>>(targetUnion)
    }
  })
})
