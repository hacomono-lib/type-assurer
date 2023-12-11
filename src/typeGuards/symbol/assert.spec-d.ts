import { test, describe, assertType } from 'vitest'
import { assertSymbol } from '.'
import type { Equals } from '../../lib/test'

describe('assertSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    assertSymbol(targetSymbol)
    assertType<Equals<symbol, typeof targetSymbol>>(true)
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const uniqueSymbol2: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const targetSymbol = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    assertSymbol(targetSymbol)
    assertType<Equals<UniqueSymbol | UniqueSymbol2, typeof targetSymbol>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = Symbol() as unknown
    assertSymbol(targetUnknown)
    assertType<Equals<symbol, typeof targetUnknown>>(true)
  })
})
