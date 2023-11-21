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
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '../../lib/test'

describe('isBoolean', () => {
  testEquivalentGuard(isBoolean, expected)
})

describe('assertBoolean', () => {
  testEquivalentAssert(assertBoolean, expected)
})

describe('ensureBoolean', () => {
  testEquivalentEnsure(ensureBoolean, expected)
})

describe('fallbackBoolean', () => {
  testEquivalentFallback(fallbackBoolean, expected, { fallbackValue: [false] })
})

describe('isNotBoolean', () => {
  testEquivalentGuard(isNotBoolean, expected, { negative: true })
})

describe('assertNotBoolean', () => {
  testEquivalentAssert(assertNotBoolean, expected, { negative: true })
})

describe('ensureNotBoolean', () => {
  testEquivalentEnsure(ensureNotBoolean, expected, { negative: true })
})

describe('fallbackNotBoolean', () => {
  testEquivalentFallback(fallbackNotBoolean, expected, { negative: true, fallbackValue: 'fallback' })
})
