import { test } from 'vitest'
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

test('isBoolean', () => {
  testGuard(isBoolean, expected)
})

test('assertBoolean', () => {
  testAssert(assertBoolean, expected)
})

test('ensureBoolean', () => {
  testEnsure(ensureBoolean, expected)
})

test('fallbackBoolean', () => {
  testFallback(fallbackBoolean, expected, { fallbackValue: [false] })
})

test('isNotBoolean', () => {
  testGuard(isNotBoolean, expected, { negative: true })
})

test('assertNotBoolean', () => {
  testAssert(assertNotBoolean, expected, { negative: true })
})

test('ensureNotBoolean', () => {
  testEnsure(ensureNotBoolean, expected, { negative: true })
})

test('fallbackNotBoolean', () => {
  testFallback(fallbackNotBoolean, expected, { negative: true, fallbackValue: 'fallback' })
})
