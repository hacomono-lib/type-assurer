import { test, describe, expectTypeOf } from 'vitest'
import { isPromise } from '.'

describe('isPromise type tests', () => {
  test('guard definite types.', () => {
    const targetPromise = Promise.resolve() as Promise<void> | void
    if (isPromise(targetPromise)) {
      expectTypeOf(targetPromise).toEqualTypeOf<Promise<void>>()
    } else {
      expectTypeOf(targetPromise).toEqualTypeOf<void>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isPromise(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<Promise<unknown>>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isPromise(targetUnion)) {
      expectTypeOf(targetUnion).toEqualTypeOf<Promise<string | number>>()
    } else {
      expectTypeOf(targetUnion).toEqualTypeOf<string | number>()
    }
  })
})
