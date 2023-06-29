import { describe } from 'vitest'
import expected from 'lodash/isArray.js'
import {
  assertNotArray,
  assertArray,
  ensureNotArray,
  ensureArray,
  fallbackNotArray,
  fallbackArray,
  isArray,
  isNotArray
} from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

describe('isArray', () => {
  testGuard(isArray, expected)
})

describe('isNotArray', () => {
  testGuard(isNotArray, expected, { negative: true })
})

describe('assertArray', () => {
  testAssert(assertArray, expected)
})

describe('assertNotArray', () => {
  testAssert(assertNotArray, expected, { negative: true })
})

describe('ensureArray', () => {
  testEnsure(ensureArray, expected)
})

describe('ensureNotArray', () => {
  testEnsure(ensureNotArray, expected, { negative: true })
})

describe('fallbackArray', () => {
  testFallback(fallbackArray, expected, { fallbackValue: ['fallback'] })
})

describe('fallbackNotArray', () => {
  testFallback(fallbackNotArray, expected, { negative: true, fallbackValue: 'fallback' })
})
