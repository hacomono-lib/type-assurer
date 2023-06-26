import { describe } from 'vitest'
import expected from 'lodash/isObject.js'
import { assertNotObject, assertObject, ensureNotObject, ensureObject, fallbackNotObject, fallbackObject, isObject, isNotObject } from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'

describe('isObject', () => {
  testGuard(isObject, expected)
})

describe('assertObject', () => {
  testAssert(assertObject, expected)
})

describe('ensureObject', () => {
  testEnsure(ensureObject, expected)
})

describe('fallbackObject', () => {
  testFallback(fallbackObject, expected, { fallbackValue: [{ foo: 'bar' }] })
})

describe('isNotObject', () => {
  testGuard(isNotObject, expected, { negative: true })
})

describe('assertNotObject', () => {
  testAssert(assertNotObject, expected, { negative: true })
})

describe('ensureNotObject', () => {
  testEnsure(ensureNotObject, expected, { negative: true })
})

describe('fallbackNotObject', () => {
  testFallback(fallbackNotObject, expected, { negative: true, fallbackValue: 'fallback' })
})
