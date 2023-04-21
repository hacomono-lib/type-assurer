import { test } from 'vitest'
import { assertNotString, assertString, ensureNotString, ensureString, fallbackNotString, fallbackString, isString } from './string'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '../lib/test'

const pass = [ValueType.String]

test('isString', () => {
  testGuard(isString, { pass })
})

test('assertString', () => {
  testAssert(assertString, { pass })
})

test('ensureString', () => {
  testEnsure(ensureString, { pass })
})

test('fallbackString', () => {
  testFallback(fallbackString, { pass, fallbackValue: 'fallback' })
})

test('assertNotString', () => {
  testAssert(assertNotString, { pass, negative: true })
})

test('ensureNotString', () => {
  testEnsure(ensureNotString, { pass, negative: true })
})

test('fallbackNotString', () => {
  testFallback(fallbackNotString, { pass, negative: true, fallbackValue: 123 })
})
