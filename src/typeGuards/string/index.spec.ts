import { describe } from 'vitest'
import {
  assertNotString,
  assertString,
  ensureNotString,
  ensureString,
  fallbackNotString,
  fallbackString,
  isString,
  isNotString
} from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'
import { ValueType } from '../../lib/test/type'

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

describe('isNotString', () => {
  testGuard(isNotString, expected, { negative: true })
})

describe('assertNotString', () => {
  testAssert(assertNotString, expected, { negative: true })
})

describe('ensureNotString', () => {
  testEnsure(ensureNotString, expected, { negative: true })
})

describe('fallbackNotString', () => {
  testFallback(fallbackNotString, expected, { negative: true, fallbackValue: 123 })
})
