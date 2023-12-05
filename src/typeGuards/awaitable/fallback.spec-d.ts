/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackAwaitable, fallbackNotAwaitable } from '.'
import { Equals } from '../../lib/test'

describe('fallbackAwaitable type tests', () => {
  test('fallback definite types.', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackAwaitable(targetAwaitable, Promise.resolve('fallback'))
    assertType<Equals<Promise<string>, typeof result>>(true)
  })

  test('fallback types as union', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackAwaitable(targetAwaitable, Promise.resolve(3))
    assertType<Equals<Promise<string | number>, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<Promise<string | number>>(
      fallbackAwaitable(targetUnion, Promise.resolve('fallback'))
    )
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackAwaitable(Promise.resolve('return'), 'return')
  })
})

describe('fallbackNotAwaitable type tests', () => {
  test('fallback definite types.', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotAwaitable(targetAwaitable, 'fallback')
    assertType<Equals<string, typeof result>>(true)
  })

  test('fallback types as union', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotAwaitable(targetAwaitable, 3)
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = fallbackNotAwaitable(targetUnion, 'fallback')
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackNotAwaitable('return', Promise.resolve('return'))
  })
})
