import { describe } from 'vitest'
import expected from 'lodash/isObject.js'
import {
  assertNotObject,
  assertObject,
  ensureNotObject,
  ensureObject,
  fallbackNotObject,
  fallbackObject,
  isObject,
  isNotObject
} from '.'
import { testEquivalentAssert, testEquivalentEnsure, testEquivalentFallback, testEquivalentGuard } from '../../lib/test'

describe('isObject', () => {
  testEquivalentGuard(isObject, expected)
})

describe('assertObject', () => {
  testEquivalentAssert(assertObject, expected)
})

describe('ensureObject', () => {
  testEquivalentEnsure(ensureObject, expected)
})

describe('fallbackObject', () => {
  testEquivalentFallback(fallbackObject, expected, { fallbackValue: [{ foo: 'bar' }] })
})

describe('isNotObject', () => {
  testEquivalentGuard(isNotObject, expected, { negative: true })
})

describe('assertNotObject', () => {
  testEquivalentAssert(assertNotObject, expected, { negative: true })
})

describe('ensureNotObject', () => {
  testEquivalentEnsure(ensureNotObject, expected, { negative: true })
})

describe('fallbackNotObject', () => {
  testEquivalentFallback(fallbackNotObject, expected, { negative: true, fallbackValue: 'fallback' })
})
