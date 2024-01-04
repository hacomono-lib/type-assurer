import { describe, expectTypeOf, test } from 'vitest'
import { fallbackPromise } from '.'

describe('fallback definite types', () => {
  test('should fallback as Promise for Promise type values.', async () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(target, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string>()
  })

  test('should strictly fallback as Promise for union type values. (Promise<A> | Promise<B>)', async () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(target, Promise.resolve(3))
    expectTypeOf(result).toEqualTypeOf<Promise<string> | Promise<number>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string | number>()
  })

  test('should strictly fallback as Promise for union type values. (Promise<A | B>)', async () => {
    const target = Promise.resolve(3) as Promise<string | number> | string | number
    const result = fallbackPromise(target, Promise.resolve('fallback' as const))
    expectTypeOf(result).toEqualTypeOf<Promise<string | number> | Promise<'fallback'>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string | number>()
  })

  test('should strictly fallback as Promise for union type values. (Promise<string literal>)', async () => {
    type Type = 'foo' | 'bar'
    const target = Promise.resolve('foo') as Promise<Type> | Type
    const result = fallbackPromise<Promise<Type>>(target, Promise.resolve('bar'))
    expectTypeOf(result).toEqualTypeOf<Promise<Type>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<Type>()
  })

  test('should strictly fallback as Promise for Extended Promise type values.', async () => {
    type ExtendedPromise<T> = Promise<T> & { extra: string }
    const target = Promise.resolve('return') as ExtendedPromise<string> | string
    const result = fallbackPromise(target, Promise.resolve('fallback') as ExtendedPromise<string>)
    expectTypeOf(result).toEqualTypeOf<ExtendedPromise<string>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback as Promise for unknown type value.', async () => {
    const target = 'string' as unknown
    const result = fallbackPromise(target, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string> | Promise<unknown>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<unknown>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a Promise', () => {
    fallbackPromise<// @ts-expect-error
    string>(
      //
      'string',
      Promise.resolve('fallback'),
    )
  })

  test('should result in a TypeScript type error when the type argument not match the fallback value.', () => {
    type Type = 'foo' | 'bar'
    fallbackPromise<Promise<Type>>(
      Promise.resolve('foo'),
      // @ts-expect-error
      Promise.resolve('baz'),
    )
  })

  test('should result in a TypeScript type error when the fallback value is unknown type.', () => {
    fallbackPromise(
      Promise.resolve('return'),
      // @ts-expect-error
      'fallback' as unknown,
    )
  })

  test('should result in a TypeScript type error when the fallback value is not a Promise.', () => {
    fallbackPromise(
      Promise.resolve('return'),
      // @ts-expect-error
      'return',
    )
  })
})
