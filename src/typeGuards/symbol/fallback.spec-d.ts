import { describe, expectTypeOf, test } from 'vitest'
import { fallbackSymbol } from '.'

describe('fallbackSymbol type tests', () => {
  test('guard definite types', () => {
    const target = Symbol() as symbol | string
    const result = fallbackSymbol(target, Symbol('fallback'))
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const fallback: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type FallbackSymbol = typeof fallback
    const target = uniqueSymbol as UniqueSymbol | string
    const result = fallbackSymbol(target, fallback)
    expectTypeOf(result).toEqualTypeOf<UniqueSymbol | FallbackSymbol>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackSymbol(target, Symbol('fallback'))
    expectTypeOf(result).toEqualTypeOf<symbol>()
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
