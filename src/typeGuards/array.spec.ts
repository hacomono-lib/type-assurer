import { test } from 'vitest'
import expected from 'lodash/isArray.js'
import { assertNotArray, assertArray, ensureNotArray, ensureArray, fallbackNotArray, fallbackArray, isArray } from './array'
import { testAssert, testEnsure, testFallback, testGuard } from '../lib/test'

test('isArray', () => {
  testGuard(isArray, expected)
})

test('assertArray', () => {
  testAssert(assertArray, expected)
})

test('ensureArray', () => {
  testEnsure(ensureArray, expected)
})

test('fallbackArray', () => {
  testFallback(fallbackArray, expected, { fallbackValue: ['fallback'] })
})

test('assertNotArray', () => {
  testAssert(assertNotArray, expected, { negative: true })
})

test('ensureNotArray', () => {
  testEnsure(ensureNotArray, expected, { negative: true })
})

test('fallbackNotArray', () => {
  testFallback(fallbackNotArray, expected, { negative: true, fallbackValue: 'fallback' })
})
