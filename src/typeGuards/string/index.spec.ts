import { describe } from 'vitest'
import { assertString, ensureString, fallbackString, isString } from '.'
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [ValueType.String, ValueType.EmptyString]

describe('isString', () => {
  testGuard(isString, expected)
})

describe('assertString', () => {
  testAssert(assertString, expected)
})

describe('ensureString', () => {
  testEnsure(ensureString, expected)
})

describe('fallbackString', () => {
  testFallback(fallbackString, expected, { fallbackValue: 'fallback' })
})
