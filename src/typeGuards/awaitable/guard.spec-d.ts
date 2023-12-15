import { test, describe, expectTypeOf } from 'vitest'
import { isAwaitable, isNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('guard definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    if (isAwaitable(targetAwaitable)) {
      expectTypeOf(targetAwaitable).toEqualTypeOf<Promise<void>>()
    } else {
      expectTypeOf(targetAwaitable).toEqualTypeOf<void>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isAwaitable(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<PromiseLike<unknown>>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isAwaitable(targetUnion)) {
      expectTypeOf(targetUnion).toEqualTypeOf<Promise<string | number>>()
    } else {
      expectTypeOf(targetUnion).toEqualTypeOf<string | number>()
    }
  })
})

describe('isNotAwaitable type tests', () => {
  test('guard definite types.', () => {
    const targetAwaitable = Promise.resolve() as Promise<void> | void
    if (isNotAwaitable(targetAwaitable)) {
      expectTypeOf(targetAwaitable).toEqualTypeOf<void>()
    } else {
      expectTypeOf(targetAwaitable).toEqualTypeOf<Promise<void>>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotAwaitable(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<PromiseLike<unknown>>()
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isNotAwaitable(targetUnion)) {
      expectTypeOf(targetUnion).toEqualTypeOf<string | number>()
    } else {
      expectTypeOf(targetUnion).toEqualTypeOf<Promise<string | number>>()
    }
  })
})
