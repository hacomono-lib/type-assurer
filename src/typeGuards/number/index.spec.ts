import { describe } from 'vitest'
import { assertNumber, ensureNumber, fallbackNumber, isNumber } from '.'
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [
  ValueType.PositiveNumber,
  ValueType.NegativeNumber,
  ValueType.Zero,
  ValueType.PositiveInfinity,
  ValueType.NegativeInfinity,
]

describe('isNumber', () => {
  testGuard(isNumber, expected)
})

describe('assertNumber', () => {
  testAssert(assertNumber, expected)
})

describe('ensureNumber', () => {
  testEnsure(ensureNumber, expected)
})

describe('fallbackNumber', () => {
  testFallback(fallbackNumber, expected, { fallbackValue: [123] })
})
