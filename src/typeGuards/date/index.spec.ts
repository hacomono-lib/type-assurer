import { describe } from 'vitest'
import expected from 'lodash/isDate.js'
import { assertNotDate, assertDate, ensureNotDate, ensureDate, fallbackNotDate, fallbackDate, isDate, isNotDate } from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

describe('isDate', () => {
  testGuard(isDate, expected)
})

describe('assertDate', () => {
  testAssert(assertDate, expected)
})

describe('ensureDate', () => {
  testEnsure(ensureDate, expected)
})

describe('fallbackDate', () => {
  testFallback(fallbackDate, expected, { fallbackValue: [new Date()] })
})

describe('isNotDate', () => {
  testGuard(isNotDate, expected, { negative: true })
})

describe('assertNotDate', () => {
  testAssert(assertNotDate, expected, { negative: true })
})

describe('ensureNotDate', () => {
  testEnsure(ensureNotDate, expected, { negative: true })
})

describe('fallbackNotDate', () => {
  testFallback(fallbackNotDate, expected, { negative: true, fallbackValue: 'fallback' })
})
