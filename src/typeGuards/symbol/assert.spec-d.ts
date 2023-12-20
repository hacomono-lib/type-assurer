import { describe, expectTypeOf, test } from 'vitest'
import { assertSymbol } from '.'

describe('assertSymbol type tests', () => {
  test('guard definite types', () => {
    const target = Symbol() as symbol | string
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<symbol>()
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target')
    const uniqueSymbol2: unique symbol = Symbol('target')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const target = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
  })

  test('guard unknown types', () => {
    const target = Symbol() as unknown
    assertSymbol(target)
    expectTypeOf(target).toEqualTypeOf<symbol>()
  })
})
