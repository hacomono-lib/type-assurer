import { test, describe, expectTypeOf } from 'vitest'
import { assertSymbol } from '.'

describe('assertSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    assertSymbol(targetSymbol)
    expectTypeOf(targetSymbol).toEqualTypeOf<symbol>()
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const uniqueSymbol2: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const targetSymbol = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    assertSymbol(targetSymbol)
    expectTypeOf(targetSymbol).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
  })

  test('guard unknown types', () => {
    const targetUnknown = Symbol() as unknown
    assertSymbol(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<symbol>()
  })
})
