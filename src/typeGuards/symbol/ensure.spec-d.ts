import { describe, expectTypeOf, test } from 'vitest'
import { ensureSymbol } from '.'

describe('ensure definite types', () => {
  test('should ensure as symbol for symbol type values.', () => {
    const target = Symbol() as symbol | string
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test('should strictly ensure as symbol for unique symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const uniqueSymbol2: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2

    const target = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
  })

  test('should strictly ensure as symbol for extended symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type SuperSymbol = typeof uniqueSymbol & { __brand: 'superSymbol' }

    const target = uniqueSymbol as SuperSymbol | string
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<SuperSymbol>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as symbol for unknown type value.', () => {
    const target = Symbol() as unknown
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test.skip('should strictly ensure as symbol when type argument is set.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol

    const target = Symbol() as unknown
    // TODO: result should be UniqueSymbol.
    const result = ensureSymbol<UniqueSymbol>(target)
    // @ts-ignore
    expectTypeOf(result).toEqualTypeOf<UniqueSymbol>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a symbol', () => {
    ensureSymbol<// @ts-expect-error
    3>(
      //
      Symbol(),
    )
  })
})
