import { test } from 'vitest'
import expected from 'lodash/isString.js'
import { assertNotString, assertString, ensureNotString, ensureString, fallbackNotString, fallbackString, isString, isNotString } from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

test('isString', () => {
  testGuard(isString, expected)
})

test('assertString', () => {
  testAssert(assertString, expected)
})

test('ensureString', () => {
  testEnsure(ensureString, expected)
})

test('fallbackString', () => {
  testFallback(fallbackString, expected, { fallbackValue: 'fallback' })
})

test('isNotString', () => {
  testGuard(isNotString, expected, { negative: true })
})

test('assertNotString', () => {
  testAssert(assertNotString, expected, { negative: true })
})

test('ensureNotString', () => {
  testEnsure(ensureNotString, expected, { negative: true })
})

test('fallbackNotString', () => {
  testFallback(fallbackNotString, expected, { negative: true, fallbackValue: 123 })
})
