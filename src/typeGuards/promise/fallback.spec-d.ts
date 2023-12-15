/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackPromise } from '.'

describe('fallbackPromise type tests', () => {
  test('fallback definite types.', async () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(targetPromise, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string>()
  })

  test('fallback types as union', async () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(targetPromise, Promise.resolve(3))
    expectTypeOf(result).toEqualTypeOf<Promise<string> | Promise<number>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string | number>()
  })

  test('fallback union types 1', async () => {
    const targetUnion = Promise.resolve(3) as Promise<string | number> | string | number
    const result = fallbackPromise(targetUnion, Promise.resolve('fallback' as const))
    expectTypeOf(result).toEqualTypeOf<Promise<string | number> | Promise<'fallback'>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<string | number>()
  })

  test('fallback union types 2', async () => {
    const targetUnion = Promise.resolve('foo') as Promise<'foo' | 'bar'> | string | number
    const result = fallbackPromise(targetUnion, Promise.resolve('baz' as const))
    expectTypeOf(result).toEqualTypeOf<Promise<'foo' | 'bar'> | Promise<'baz'>>()

    const awaitedResult = await result
    expectTypeOf(awaitedResult).toEqualTypeOf<'foo' | 'bar' | 'baz'>()
  })

  test('unknown promise', async () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackPromise(targetUnknown, Promise.resolve('fallback'))
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
