import { describe, expectTypeOf, test } from 'vitest'
import { ensurePromise } from './guards'

describe('ensure definite types', () => {
  test('should ensure as Promise for Promise type values.', () => {
    const target = Promise.resolve() as Promise<void> | void
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<Promise<void>>()
  })

  test('should strictly ensure as Promise for Extended Promise type values.', () => {
    type ExtendedPromise<T> = Promise<T> & { extra: string }
    const target = Promise.resolve() as ExtendedPromise<void> | void
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<ExtendedPromise<void>>()
  })

  test('should strictly ensure as Promise for union types.', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as Promise for unknown type value.', () => {
    const target = Promise.resolve() as unknown
    const result = ensurePromise(target)
    expectTypeOf(result).toEqualTypeOf<Promise<unknown>>()
  })

  test('should strictly ensure as Promise when type argument is set.', () => {
    const target = Promise.resolve() as unknown
    const result = ensurePromise<Promise<string>>(target)
    expectTypeOf(result).toEqualTypeOf<Promise<string>>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a Promise', () => {
    ensurePromise<// @ts-expect-error
    3>(Promise.resolve())
  })
})
