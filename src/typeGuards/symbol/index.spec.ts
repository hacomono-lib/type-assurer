import { describe } from 'vitest'
import { assertSymbol, ensureSymbol, fallbackSymbol, isSymbol } from '.'
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [ValueType.Symbol]

describe('isSymbol', () => {
  testGuard(isSymbol, expected)
})

describe('assertSymbol', () => {
  testAssert(assertSymbol, expected)
})

describe('ensureSymbol', () => {
  testEnsure(ensureSymbol, expected)
})

describe('fallbackSymbol', () => {
  testFallback(fallbackSymbol, expected, { fallbackValue: 'fallback' })
})
