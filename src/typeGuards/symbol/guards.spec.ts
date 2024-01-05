import { describe } from 'vitest'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '~/lib-test'
import { assertSymbol, ensureSymbol, fallbackSymbol, isSymbol } from './guards'

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
