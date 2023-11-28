/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackAwaitable, fallbackNotAwaitable } from '.'

describe('fallbackAwaitable type tests', () => {
  test('fallback definite types.', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    assertType<Promise<string>>(fallbackAwaitable(targetAwaitable, Promise.resolve('fallback')))
  })

  test('fallback types as union', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    assertType<Promise<string | number>>(fallbackAwaitable(targetAwaitable, Promise.resolve(3)))
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
    assertType<string>(fallbackNotAwaitable(targetAwaitable, 'fallback'))
  })

  test('fallback types as union', () => {
    const targetAwaitable = Promise.resolve('return') as Promise<string> | string
    assertType<string | number>(fallbackNotAwaitable(targetAwaitable, 3))
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<string | number>(fallbackNotAwaitable(targetUnion, 'fallback'))
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackNotAwaitable('return', Promise.resolve('return'))
  })
})
