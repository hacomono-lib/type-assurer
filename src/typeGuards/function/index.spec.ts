import { describe } from 'vitest'
import { assertFunction, ensureFunction, fallbackFunction, isFunction } from '.'
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [
  ValueType.Function,
  ValueType.AsyncFunction,
  ValueType.GeneratorFunction,
  ValueType.AsyncGeneratorFunction,
  ValueType.Class,
  ValueType.ThenableFunction
]

describe('isFunction', () => {
  testGuard(isFunction, expected)
})

describe('assertFunction', () => {
  testAssert(assertFunction, expected)
})

describe('ensureFunction', () => {
  testEnsure(ensureFunction, expected)
})

describe('fallbackFunction', () => {
  testFallback(fallbackFunction, expected, { fallbackValue: () => {} })
})
