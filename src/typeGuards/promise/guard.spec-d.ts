import { describe, expectTypeOf, test } from 'vitest'
import { isPromise } from './guards'

describe('guard definite types', () => {
  test('should guard as Promise for Promise type values.', () => {
    const target = Promise.resolve() as Promise<void> | void
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<void>>()
    } else {
      // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
      expectTypeOf(target).toEqualTypeOf<void>()
    }
  })

  test('should strictly guard as Promise for Extended Promise type values.', () => {
    type ExtendedPromise<T> = Promise<T> & { extra: string }
    const target = Promise.resolve() as ExtendedPromise<void> | void
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<ExtendedPromise<void>>()
    } else {
      // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
      expectTypeOf(target).toEqualTypeOf<void>()
    }
  })

  test('should strictly guard as Promise for union types.', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string | number>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as Promise for unknown type value.', () => {
    const target = 'string' as unknown
    if (isPromise(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<unknown>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as Promise when type argument is set.', () => {
    const target = Promise.resolve() as unknown
    if (isPromise<Promise<string>>(target)) {
      expectTypeOf(target).toEqualTypeOf<Promise<string>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a Promise', () => {
    isPromise<// @ts-expect-error
    3>(
      //
      Promise.resolve(),
    )
  })
})
