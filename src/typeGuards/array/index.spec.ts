import expected from 'lodash/isArray.js'
import { describe } from 'vitest'
import {
  assertArray,
  assertNotArray,
  ensureArray,
  ensureNotArray,
  fallbackArray,
  fallbackNotArray,
  isArray,
  isNotArray,
} from '.'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '../../lib-test'

describe('isArray', () => {
  testEquivalentGuard(isArray, expected)
})

describe('isNotArray', () => {
  testEquivalentGuard(isNotArray, expected, { negative: true })
})

describe('assertArray', () => {
  testEquivalentAssert(assertArray, expected)
})

describe('assertNotArray', () => {
  testEquivalentAssert(assertNotArray, expected, { negative: true })
})

describe('ensureArray', () => {
  testEquivalentEnsure(ensureArray, expected)
})

describe('ensureNotArray', () => {
  testEquivalentEnsure(ensureNotArray, expected, { negative: true })
})

describe('fallbackArray', () => {
  testEquivalentFallback(fallbackArray, expected, { fallbackValue: ['fallback'] })
})

describe('fallbackNotArray', () => {
  testEquivalentFallback(fallbackNotArray, expected, { negative: true, fallbackValue: 'fallback' })
})
