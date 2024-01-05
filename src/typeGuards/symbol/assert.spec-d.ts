import { describe, expectTypeOf, test } from 'vitest'
import { assertSymbol } from './guards'

describe('assert definite types', () => {
  test('should assert as symbol for symbol type values.', () => {
    const target = Symbol() as symbol | string
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<symbol>()
  })

  test('should strictly assert as symbol for unique symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const uniqueSymbol2: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const target = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
  })

  test('should strictly assert as symbol for extended symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type SuperSymbol = typeof uniqueSymbol & { __brand: 'superSymbol' }

    const target = uniqueSymbol as SuperSymbol | string
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<SuperSymbol>()
  })
})

describe('assert unknown types', () => {
  test('should assert as symbol for unknown type value.', () => {
    const target = Symbol() as unknown
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<symbol>()
  })

  test('should strictly assert as symbol when type argument is set.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol

    const target = Symbol() as unknown
    assertSymbol<UniqueSymbol>(target)
    expectTypeOf(target).toEqualTypeOf<UniqueSymbol>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a symbol', () => {
    assertSymbol<// @ts-expect-error
    3>(
      //
      Symbol(),
    )
  })
})
