import { test } from 'vitest'
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
} from './array'
import { testAssert, testEnsure, testFallback, testGuard } from '../lib/test'

test('isArray', () => {
  testGuard(isArray, expected)
})

test('isNotArray', () => {
  testGuard(isNotArray, expected, { negative: true })
})

test('assertArray', () => {
  testAssert(assertArray, expected)
})

test('assertNotArray', () => {
  testAssert(assertNotArray, expected, { negative: true })
})

test('ensureArray', () => {
  testEnsure(ensureArray, expected)
})

test('ensureNotArray', () => {
  testEnsure(ensureNotArray, expected, { negative: true })
})

test('fallbackArray', () => {
  testFallback(fallbackArray, expected, { fallbackValue: ['fallback'] })
})

test('fallbackNotArray', () => {
  testFallback(fallbackNotArray, expected, { negative: true, fallbackValue: 'fallback' })
})
