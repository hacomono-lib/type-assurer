import { test } from 'vitest'
import expected from 'lodash/isDate.js'
import { assertNotDate, assertDate, ensureNotDate, ensureDate, fallbackNotDate, fallbackDate, isDate } from './date'
import { testAssert, testEnsure, testFallback, testGuard } from '../lib/test'

test('isDate', () => {
  testGuard(isDate, expected)
})

test('assertDate', () => {
  testAssert(assertDate, expected)
})

test('ensureDate', () => {
  testEnsure(ensureDate, expected)
})

test('fallbackDate', () => {
  testFallback(fallbackDate, expected, { fallbackValue: [new Date()] })
})

test('assertNotDate', () => {
  testAssert(assertNotDate, expected, { negative: true })
})

test('ensureNotDate', () => {
  testEnsure(ensureNotDate, expected, { negative: true })
})

test('fallbackNotDate', () => {
  testFallback(fallbackNotDate, expected, { negative: true, fallbackValue: 'fallback' })
})
