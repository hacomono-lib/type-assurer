import { test } from 'vitest'
import expected from 'lodash/isNumber.js'
import { assertNotNumber, assertNumber, ensureNotNumber, ensureNumber, fallbackNotNumber, fallbackNumber, isNumber, isNotNumber } from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

test('isNumber', () => {
  testGuard(isNumber, expected)
})

test('assertNumber', () => {
  testAssert(assertNumber, expected)
})

test('ensureNumber', () => {
  testEnsure(ensureNumber, expected)
})

test('fallbackNumber', () => {
  testFallback(fallbackNumber, expected, { fallbackValue: [123] })
})

test('isNotNumber', () => {
  testGuard(isNotNumber, expected, { negative: true })
})

test('assertNotNumber', () => {
  testAssert(assertNotNumber, expected, { negative: true })
})

test('ensureNotNumber', () => {
  testEnsure(ensureNotNumber, expected, { negative: true })
})

test('fallbackNotNumber', () => {
  testFallback(fallbackNotNumber, expected, { negative: true, fallbackValue: 'fallback' })
})
