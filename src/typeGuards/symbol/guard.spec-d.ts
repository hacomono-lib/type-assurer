import { test, describe, expectTypeOf } from 'vitest'
import { isSymbol } from '.'

describe('isSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    if (isSymbol(targetSymbol)) {
      expectTypeOf(targetSymbol).toEqualTypeOf<symbol>()
    } else {
      expectTypeOf(targetSymbol).toEqualTypeOf<string>()
    }
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const uniqueSymbol2: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const targetSymbol = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    if (isSymbol(targetSymbol)) {
      expectTypeOf(targetSymbol).toEqualTypeOf<UniqueSymbol | UniqueSymbol2>()
    } else {
      expectTypeOf(targetSymbol).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = Symbol() as unknown
    if (isSymbol(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<symbol>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
