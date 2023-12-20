import { describe } from 'vitest'
import {
  assertBoolean,
  assertNotBoolean,
  ensureBoolean,
  ensureNotBoolean,
  fallbackBoolean,
  fallbackNotBoolean,
  isBoolean,
  isNotBoolean,
} from '.'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '../../lib-test'

const expected = [ValueType.True, ValueType.False]

describe('isBoolean', () => {
  testGuard(isBoolean, expected)
})

describe('assertBoolean', () => {
  testAssert(assertBoolean, expected)
})

describe('ensureBoolean', () => {
  testEnsure(ensureBoolean, expected)
})

describe('fallbackBoolean', () => {
  testFallback(fallbackBoolean, expected, { fallbackValue: [false] })
})

describe('isNotBoolean', () => {
  testGuard(isNotBoolean, expected, { negative: true })
})

describe('assertNotBoolean', () => {
  testAssert(assertNotBoolean, expected, { negative: true })
})

describe('ensureNotBoolean', () => {
  testEnsure(ensureNotBoolean, expected, { negative: true })
})

describe('fallbackNotBoolean', () => {
  testFallback(fallbackNotBoolean, expected, { negative: true, fallbackValue: 'fallback' })
})
