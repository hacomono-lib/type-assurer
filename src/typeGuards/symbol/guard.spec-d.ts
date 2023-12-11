import { test, describe, assertType } from 'vitest'
import { isSymbol } from '.'
import type { Equals } from '../../lib/test'

describe('isSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    if (isSymbol(targetSymbol)) {
      assertType<Equals<symbol, typeof targetSymbol>>(true)
    } else {
      assertType<Equals<string, typeof targetSymbol>>(true)
    }
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const uniqueSymbol2: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const targetSymbol = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    if (isSymbol(targetSymbol)) {
      assertType<Equals<UniqueSymbol | UniqueSymbol2, typeof targetSymbol>>(true)
    } else {
      assertType<Equals<string, typeof targetSymbol>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = Symbol() as unknown
    if (isSymbol(targetUnknown)) {
      assertType<Equals<symbol, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})
