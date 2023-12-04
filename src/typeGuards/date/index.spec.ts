import { describe } from 'vitest'
import expected from 'lodash/isDate.js'
import {
  assertNotDate,
  assertDate,
  ensureNotDate,
  ensureDate,
  fallbackNotDate,
  fallbackDate,
  isDate,
  isNotDate
} from '.'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '../../lib/test'

describe('isDate', () => {
  testEquivalentGuard(isDate, expected)
})

describe('assertDate', () => {
  testEquivalentAssert(assertDate, expected)
})

describe('ensureDate', () => {
  testEquivalentEnsure(ensureDate, expected)
})

describe('fallbackDate', () => {
  testEquivalentFallback(fallbackDate, expected, { fallbackValue: [new Date()] })
})

describe('isNotDate', () => {
  testEquivalentGuard(isNotDate, expected, { negative: true })
})

describe('assertNotDate', () => {
  testEquivalentAssert(assertNotDate, expected, { negative: true })
})

describe('ensureNotDate', () => {
  testEquivalentEnsure(ensureNotDate, expected, { negative: true })
})

describe('fallbackNotDate', () => {
  testEquivalentFallback(fallbackNotDate, expected, { negative: true, fallbackValue: 'fallback' })
})
