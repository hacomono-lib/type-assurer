import { test, describe, assertType } from 'vitest'
import { ensureSymbol } from '.'
import { Equals } from '../../lib/test'

describe('ensureSymbol type tests', () => {
  test('guard definite types', () => {
    const targetSymbol = Symbol() as symbol | string
    const result = ensureSymbol(targetSymbol)
    assertType<Equals<symbol, typeof result>>(true)
  })

  test('guard unique symbol union tests', () => {
    const uniqueSymbol: unique symbol = Symbol('target1')
    const uniqueSymbol2: unique symbol = Symbol('target2')
    type UniqueSymbol = typeof uniqueSymbol
    type UniqueSymbol2 = typeof uniqueSymbol2
    const targetSymbol = uniqueSymbol as UniqueSymbol | UniqueSymbol2 | string
    const result = ensureSymbol(targetSymbol)
    assertType<Equals<UniqueSymbol | UniqueSymbol2, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = Symbol() as unknown
    const result = ensureSymbol(targetUnknown)
    assertType<Equals<symbol, typeof result>>(true)
  })
})
