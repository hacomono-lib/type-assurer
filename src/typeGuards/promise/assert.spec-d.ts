import { describe, expectTypeOf, test } from 'vitest'
import { assertPromise } from '.'

describe('assert definite types', () => {
  test('should assert as Promise for Promise type values.', () => {
    const target = Promise.resolve() as Promise<void> | void
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<Promise<void>>()
  })

  test('should strictly assert as Promise for Extended Promise type values.', () => {
    type ExtendedPromise<T> = Promise<T> & { extra: string }
    const target = Promise.resolve() as ExtendedPromise<void> | void
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<ExtendedPromise<void>>()
  })

  test('should strictly assert as Promise for union type values.', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<Promise<string | number>>()
  })
})

describe('assert unknown types', () => {
  test('assert unknown types', () => {
    const target = Promise.resolve() as unknown
    assertPromise(target)
    expectTypeOf(target).toEqualTypeOf<Promise<unknown>>()
  })

  test('should strictly assert as Promise when type argument is set.', () => {
    const target = Promise.resolve() as unknown
    assertPromise<Promise<string>>(target)
    expectTypeOf(target).toEqualTypeOf<Promise<string>>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a Promise', () => {
    assertPromise<// @ts-expect-error
    3>(
      //
      Promise.resolve(),
    )
  })
})
