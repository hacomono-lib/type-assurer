import { describe, expectTypeOf, test } from 'vitest'
import { isSymbol } from '.'

describe('isSymbol type tests', () => {
  test('guard definite types', () => {
    const target = Symbol() as symbol | string
    if (isSymbol(target)) {
      expectTypeOf(target).toEqualTypeOf<symbol>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard unique symbol union tests', () => {
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

  test('guard unknown types', () => {
    const target = Symbol() as unknown
    if (isSymbol(target)) {
      expectTypeOf(target).toEqualTypeOf<symbol>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
