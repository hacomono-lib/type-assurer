import { describe } from 'vitest'
import expected from 'lodash/isNumber.js'
import {
  assertNotNumber,
  assertNumber,
  ensureNotNumber,
  ensureNumber,
  fallbackNotNumber,
  fallbackNumber,
  isNumber,
  isNotNumber
} from '.'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '../../lib/test'

describe('isNumber', () => {
  testEquivalentGuard(isNumber, expected)
})

describe('assertNumber', () => {
  testEquivalentAssert(assertNumber, expected)
})

describe('ensureNumber', () => {
  testEquivalentEnsure(ensureNumber, expected)
})

describe('fallbackNumber', () => {
  testEquivalentFallback(fallbackNumber, expected, { fallbackValue: [123] })
})

describe('isNotNumber', () => {
  testEquivalentGuard(isNotNumber, expected, { negative: true })
})

describe('assertNotNumber', () => {
  testEquivalentAssert(assertNotNumber, expected, { negative: true })
})

describe('ensureNotNumber', () => {
  testEquivalentEnsure(ensureNotNumber, expected, { negative: true })
})

describe('fallbackNotNumber', () => {
  testEquivalentFallback(fallbackNotNumber, expected, { negative: true, fallbackValue: 'fallback' })
})
