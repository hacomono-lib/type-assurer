import { test } from 'vitest'
import expected from 'lodash/isPlainObject.js'
import { assertNotObject, assertObject, ensureNotObject, ensureObject, fallbackNotObject, fallbackObject, isObject } from './object'
import { testAssert, testEnsure, testFallback, testGuard } from '../lib/test'

test('isObject', () => {
  testGuard(isObject, expected)
})

test('assertObject', () => {
  testAssert(assertObject, expected)
})

test('ensureObject', () => {
  testEnsure(ensureObject, expected)
})

test('fallbackObject', () => {
  testFallback(fallbackObject, expected, { fallbackValue: [{ foo: 'bar' }] })
})

test('assertNotObject', () => {
  testAssert(assertNotObject, expected, { negative: true })
})

test('ensureNotObject', () => {
  testEnsure(ensureNotObject, expected, { negative: true })
})

test('fallbackNotObject', () => {
  testFallback(fallbackNotObject, expected, { negative: true, fallbackValue: 'fallback' })
})
