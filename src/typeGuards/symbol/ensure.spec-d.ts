import { test, describe, expectTypeOf } from 'vitest'
import { ensureSymbol } from '.'

describe('ensureSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    const result = ensureSymbol(targetSymbol)
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const uniqueSymbol2: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const targetSymbol = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    const result = ensureSymbol(targetSymbol)
    expectTypeOf(result).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
  })

  test('guard unknown types', () => {
    const targetUnknown = Symbol() as unknown
    const result = ensureSymbol(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<symbol>()
  })
})
