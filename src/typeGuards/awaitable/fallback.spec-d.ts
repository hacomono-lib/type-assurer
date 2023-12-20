/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackAwaitable, fallbackNotAwaitable } from '.'

describe('fallbackAwaitable type tests', () => {
  test('fallback definite types.', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackAwaitable(targetAwaitable, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string>>()
  })

  test('fallback types as union', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackAwaitable(targetAwaitable, Promise.resolve(3))
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<Promise<string | number>>(fallbackAwaitable(targetUnion, Promise.resolve('fallback')))
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
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('fallback types as union', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotAwaitable(targetAwaitable, 3)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = fallbackNotAwaitable(targetUnion, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackNotAwaitable('return', Promise.resolve('return'))
  })
})
