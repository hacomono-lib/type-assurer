/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expectTypeOf, test } from 'vitest'
import { fallbackAwaitable, fallbackNotAwaitable } from '.'

describe('fallbackAwaitable type tests', () => {
  test('fallback definite types.', () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackAwaitable(target, Promise.resolve('fallback'))
    expectTypeOf(result).toEqualTypeOf<Promise<string>>()
  })

  test('fallback types as union', () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackAwaitable(target, Promise.resolve(3))
    expectTypeOf(result).toEqualTypeOf<Promise<string | number>>()
  })

  test('fallback union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<Promise<string | number>>(fallbackAwaitable(target, Promise.resolve('fallback')))
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackAwaitable(Promise.resolve('return'), 'return')
  })
})

describe('fallbackNotAwaitable type tests', () => {
  test('fallback definite types.', () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotAwaitable(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('fallback types as union', () => {
    const target = Promise.resolve('return') as Promise<string> | string
    const result = fallbackNotAwaitable(target, 3)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback union types', () => {
    const target = Promise.resolve() as unknown as Promise<string | number> | string | number
    const result = fallbackNotAwaitable(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackNotAwaitable('return', Promise.resolve('return'))
  })
})
