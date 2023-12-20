import { describe, expectTypeOf, test } from 'vitest'
import { isAwaitable, isNotAwaitable } from '.'

describe('isAwaitable type tests', () => {
  test('guard definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    if (isAwaitable(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<void>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<void>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isAwaitable(target)) {
      expectTypeOf(target).toEqualTypeOf<PromiseLike<unknown>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isAwaitable(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string | number>()
    }
  })
})

describe('isNotAwaitable type tests', () => {
  test('guard definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    if (isNotAwaitable(target)) {
      expectTypeOf(target).toEqualTypeOf<void>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Promise<void>>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNotAwaitable(target)) {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(target).toEqualTypeOf<PromiseLike<unknown>>()
    }
  })

  test('guard union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isNotAwaitable(target)) {
      expectTypeOf(target).toEqualTypeOf<string | number>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
    }
  })
})
