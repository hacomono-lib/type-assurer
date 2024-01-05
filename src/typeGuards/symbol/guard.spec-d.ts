import { describe, expectTypeOf, test } from 'vitest'
import { isSymbol } from './guards'

describe('guard definite types', () => {
  test('should guard as symbol for symbol type values.', () => {
    const target = Symbol() as symbol | string
    if (isSymbol(target)) {
      expectTypeOf(target).toEqualTypeOf<symbol>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as symbol for unique symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const uniqueSymbol2: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const target = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    if (isSymbol(target)) {
      expectTypeOf(target).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as symbol for extended symbol type values.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type SuperSymbol = typeof uniqueSymbol & { __brand: 'superSymbol' }

    const target = uniqueSymbol as SuperSymbol | string
    if (isSymbol(target)) {
      expectTypeOf(target).toEqualTypeOf<SuperSymbol>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as symbol for unknown type value.', () => {
    const target = Symbol() as unknown
    if (isSymbol(target)) {
      expectTypeOf(target).toEqualTypeOf<symbol>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as symbol when type argument is set.', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol

    const target = Symbol() as unknown
    if (isSymbol<UniqueSymbol>(target)) {
      expectTypeOf(target).toEqualTypeOf<UniqueSymbol>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a symbol', () => {
    isSymbol<// @ts-expect-error
    string>(
      //
      Symbol(),
    )
  })
})
