import { describe } from 'vitest'
import expected from 'lodash/isBoolean.js'
import {
  assertNotBoolean,
  assertBoolean,
  ensureNotBoolean,
  ensureBoolean,
  fallbackNotBoolean,
  fallbackBoolean,
  isBoolean,
  isNotBoolean
} from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

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
