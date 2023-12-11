/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackPromise } from '.'
import type { Equals } from '../../lib/test'

describe('fallbackPromise type tests', () => {
  test('fallback definite types.', async () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(targetPromise, Promise.resolve('fallback'))
    assertType<Equals<Promise<string>, typeof result>>(true)

    const awaitedResult = await result
    assertType<Equals<string, typeof awaitedResult>>(true)
  })

  test('fallback types as union', async () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(targetPromise, Promise.resolve(3))
    assertType<Equals<Promise<string> | Promise<number>, typeof result>>(true)

    const awaitedResult = await result
    assertType<Equals<string | number, typeof awaitedResult>>(true)
  })

  test('fallback union types 1', async () => {
    const targetUnion = Promise.resolve(3) as Promise<string | number> | string | number
    const result = fallbackPromise(targetUnion, Promise.resolve('fallback' as const))
    assertType<Equals<Promise<string | number> | Promise<'fallback'>, typeof result>>(true)

    const awaitedResult = await result
    assertType<Equals<string | number, typeof awaitedResult>>(true)
  })

  test('fallback union types 2', async () => {
    const targetUnion = Promise.resolve('foo') as Promise<'foo' | 'bar'> | string | number
    const result = fallbackPromise(targetUnion, Promise.resolve('baz' as const))
    assertType<Equals<Promise<'foo' | 'bar'> | Promise<'baz'>, typeof result>>(true)

    const awaitedResult = await result
    assertType<Equals<'foo' | 'bar' | 'baz', typeof awaitedResult>>(true)
  })

  test('unknown promise', async () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackPromise(targetUnknown, Promise.resolve('fallback'))
    assertType<Equals<Promise<string> | Promise<unknown>, typeof result>>(true)

    const awaitedResult = await result
    assertType<Equals<unknown, typeof awaitedResult>>(true)
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
