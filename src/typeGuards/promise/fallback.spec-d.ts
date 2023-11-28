/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackPromise, fallbackNotPromise } from '.'

describe('fallbackPromise type tests', () => {
  test('fallback definite types.', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    assertType<Promise<string>>(fallbackPromise(targetPromise, Promise.resolve('fallback')))
  })

  test('fallback types as union', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    assertType<Promise<string | number>>(fallbackPromise(targetPromise, Promise.resolve(3)))
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<Promise<string | number>>(fallbackPromise(targetUnion, Promise.resolve('fallback')))
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackAwaitable(Promise.resolve('return'), 'return')
  })
})

describe('fallbackNotPromise type tests', () => {
  test('fallback definite types.', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    assertType<string>(fallbackNotPromise(targetPromise, 'fallback'))
  })

  test('fallback types as union', () => {
    const targetPromise = Promise.resolve('return') as Promise<string> | string
    assertType<string | number>(fallbackNotPromise(targetPromise, 3))
  })

  test('fallback union types', () => {
    const targetUnion = Promise.resolve() as unknown as Promise<string | number> | string | number
    assertType<string | number>(fallbackNotPromise(targetUnion, 'fallback'))
  })

  test('uncorrectable types', () => {
    // @ts-expect-error
    fallbackNotAwaitable('return', Promise.resolve('return'))
  })
})
