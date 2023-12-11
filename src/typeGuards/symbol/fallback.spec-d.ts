/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackSymbol } from '.'
import { Equals } from '../../lib/test'

describe('fallbackSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    const result = fallbackSymbol(targetSymbol, Symbol('fallback'))
    assertType<Equals<symbol, typeof result>>(true)
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const fallback: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type FallbackSymbol = typeof fallback
    const targetSymbol = uniqueSymbol as UniqueSymbol | string
    const result = fallbackSymbol(targetSymbol, fallback)
    assertType<Equals<UniqueSymbol | FallbackSymbol, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackSymbol(targetUnknown, Symbol('fallback'))
    assertType<Equals<symbol, typeof result>>(true)
  })

  test('unknown fallback type', () => {
    // @ts-expect-error
    fallbackSymbol('string', 'fallback' as unknown)
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackSymbol('string', 3)
  })
})
