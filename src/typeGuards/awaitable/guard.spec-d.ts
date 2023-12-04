import { test, describe, assertType } from 'vitest'
import { isAwaitable, isNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('guard definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    if (isAwaitable(targetAwaitable)) {
      assertType<Equals<Promise<void>, typeof targetAwaitable>>(true)
    } else {
      assertType<Equals<void, typeof targetAwaitable>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isAwaitable(targetUnknown)) {
      assertType<Equals<PromiseLike<unknown>, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isAwaitable(targetUnion)) {
      assertType<Equals<Promise<string | number>, typeof targetUnion>>(true)
    } else {
      assertType<Equals<string | number, typeof targetUnion>>(true)
    }
  })
})

describe('isNotAwaitable type tests', () => {
  test('guard definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    if (isNotAwaitable(targetAwaitable)) {
      assertType<Equals<void, typeof targetAwaitable>>(true)
    } else {
      assertType<Equals<Promise<void>, typeof targetAwaitable>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotAwaitable(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<PromiseLike<unknown>, typeof targetUnknown>>(true)
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isNotAwaitable(targetUnion)) {
      assertType<Equals<string | number, typeof targetUnion>>(true)
    } else {
      assertType<Equals<Promise<string | number>, typeof targetUnion>>(true)
    }
  })
})
