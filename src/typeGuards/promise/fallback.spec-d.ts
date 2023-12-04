/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackPromise, fallbackNotPromise } from '.'
import { Equals } from '../../lib/test'

describe('fallbackPromise type tests', () => {
  test('fallback definite types.', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(targetPromise, Promise.resolve('fallback'))
    assertType<Equals<Promise<string>, typeof result>>(true)
  })

  test('fallback types as union', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackPromise(targetPromise, Promise.resolve(3))
    assertType<Equals<Promise<string | number>, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = fallbackPromise(targetUnion, Promise.resolve('fallback'))
    assertType<Equals<Promise<string | number>, typeof result>>(true)
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackAwaitable(Promise.resolve('return'), 'return')
  })
})

describe('fallbackNotPromise type tests', () => {
  test('fallback definite types.', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotPromise(targetPromise, 'fallback')
    assertType<Equals<string, typeof result>>(true)
  })

  test('fallback types as union', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotPromise(targetPromise, 3)
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = fallbackNotPromise(targetUnion, 'fallback')
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackNotAwaitable('return', Promise.resolve('return'))
  })
})
