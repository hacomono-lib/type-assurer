import { describe, expectTypeOf, test } from 'vitest'
import { fallbackPromise } from '.'

describe('fallbackPromise type tests', () => {
  test('fallback definite types.', async () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(target, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string>()
  })

  test('fallback types as union', async () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(target, Promise.resolve(3))
    expectTypeOf(result).toEqualTypeOf<Promise<string> | Promise<number>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string | number>()
  })

  test('fallback union types 1', async () => {
    const target = Promise.resolve(3) as Promise<string | number> | string | number
    const result = fallbackPromise(target, Promise.resolve('fallback' as const))
    expectTypeOf(result).toEqualTypeOf<Promise<string | number> | Promise<'fallback'>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string | number>()
  })

  test('fallback union types 2', async () => {
    const target = Promise.resolve('foo') as Promise<'foo' | 'bar'> | string | number
    const result = fallbackPromise(target, Promise.resolve('baz' as const))
    expectTypeOf(result).toEqualTypeOf<Promise<'foo' | 'bar'> | Promise<'baz'>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<'foo' | 'bar' | 'baz'>()
  })

  test('unknown promise', async () => {
    const target = 'string' as unknown
    const result = fallbackPromise(target, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string> | Promise<unknown>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<unknown>()
  })

  test('unknown fallback', () => {
    // @ts-expect-error
    fallbackPromise(Promise.resolve('return'), 'fallback' as unknown)
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackPromise(Promise.resolve('return'), 'return')
  })
})
