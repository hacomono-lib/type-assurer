import { describe, expectTypeOf, test } from 'vitest'
import { fallbackSymbol } from '.'

describe('fallback definite types', () => {
  test('should fallback as symbol for symbol type values.', () => {
    const target = Symbol() as symbol | string
    const result = fallbackSymbol(target, Symbol('fallback'))
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test('should strictly fallback as symbol for unique symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const fallback: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type FallbackSymbol = typeof fallback
    const target = uniqueSymbol as UniqueSymbol | string
    const result = fallbackSymbol(target, fallback)
    expectTypeOf(result).toEqualTypeOf<UniqueSymbol | FallbackSymbol>()
  })

  test('should strictly fallback as symbol for extended symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type SuperSymbol = typeof uniqueSymbol & { __brand: 'superSymbol' }

    const target = uniqueSymbol as SuperSymbol | string
    const result = fallbackSymbol(target, Symbol('fallback'))
    expectTypeOf(result).toEqualTypeOf<SuperSymbol | symbol>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback as symbol for unknown type value.', () => {
    const target = 'string' as unknown
    const result = fallbackSymbol(target, Symbol('fallback'))
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test('should strictly fallback as symbol when type argument is set.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const fallback: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type FallbackSymbol = typeof fallback
    type Type = UniqueSymbol | FallbackSymbol

    const target = 'string' as unknown
    const result = fallbackSymbol<Type>(target, fallback)
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a symbol', () => {
    fallbackSymbol<// @ts-expect-error
    3>(
      //
      'string',
      Symbol('fallback'),
    )
  })

  test('should result in a TypeScript type error when the type argument is unknown.', () => {
    fallbackSymbol(
      'string',
      // @ts-expect-error
      'fallback' as unknown,
    )
  })

  test('should result in a TypeScript type error when the type argument not match the fallback value.', () => {
    fallbackSymbol(
      'string',
      // @ts-expect-error
      3,
    )
  })
})
