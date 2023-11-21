import { describe } from 'vitest'
import expected from 'lodash/isString.js'
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
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '../../lib/test'

describe('isString', () => {
  testEquivalentGuard(isString, expected)
})

describe('assertString', () => {
  testEquivalentAssert(assertString, expected)
})

describe('ensureString', () => {
  testEquivalentEnsure(ensureString, expected)
})

describe('fallbackString', () => {
  testEquivalentFallback(fallbackString, expected, { fallbackValue: 'fallback' })
})

describe('isNotString', () => {
  testEquivalentGuard(isNotString, expected, { negative: true })
})

describe('assertNotString', () => {
  testEquivalentAssert(assertNotString, expected, { negative: true })
})

describe('ensureNotString', () => {
  testEquivalentEnsure(ensureNotString, expected, { negative: true })
})

describe('fallbackNotString', () => {
  testEquivalentFallback(fallbackNotString, expected, { negative: true, fallbackValue: 123 })
})
