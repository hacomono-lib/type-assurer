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
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

describe('isNumber', () => {
  testGuard(isNumber, expected)
})

describe('assertNumber', () => {
  testAssert(assertNumber, expected)
})

describe('ensureNumber', () => {
  testEnsure(ensureNumber, expected)
})

describe('fallbackNumber', () => {
  testFallback(fallbackNumber, expected, { fallbackValue: [123] })
})

describe('isNotNumber', () => {
  testGuard(isNotNumber, expected, { negative: true })
})

describe('assertNotNumber', () => {
  testAssert(assertNotNumber, expected, { negative: true })
})

describe('ensureNotNumber', () => {
  testEnsure(ensureNotNumber, expected, { negative: true })
})

describe('fallbackNotNumber', () => {
  testFallback(fallbackNotNumber, expected, { negative: true, fallbackValue: 'fallback' })
})
