import { describe, expectTypeOf, test } from 'vitest'
import { ensureSymbol } from '.'

describe('ensureSymbol type tests', () => {
  test('guard definite types', () => {
    const target = Symbol() as symbol | string
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const uniqueSymbol2: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const target = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
  })

  test('guard unknown types', () => {
    const target = Symbol() as unknown
    const result = ensureSymbol(target)
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })
})
