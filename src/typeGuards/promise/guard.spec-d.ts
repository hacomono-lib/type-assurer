import { describe, expectTypeOf, test } from 'vitest'
import { isPromise } from '.'

describe('isPromise type tests', () => {
  test('guard definite types.', () => {
    const target = Promise.resolve() as Promise<void> | void
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<void>>()
    } else {
      // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
      expectTypeOf(target).toEqualTypeOf<void>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<unknown>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string | number>()
    }
  })
})
