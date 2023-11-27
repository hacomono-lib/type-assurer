import { describe } from 'vitest'
import { ValueType } from '../../lib/test/type'
import { testGuard, testAssert, testEnsure, testFallback } from '../../lib/test'
import {
  assertNotPromise,
  assertPromise,
  ensureNotPromise,
  ensurePromise,
  fallbackNotPromise,
  fallbackPromise,
  isNotPromise,
  isPromise
} from '.'

const expectedValueTypes = [ValueType.Promise, ValueType.Awaited]

describe('isPromise', () => {
  testGuard(isPromise, expectedValueTypes)
})

describe('assertPromise', () => {
  testAssert(assertPromise, expectedValueTypes)
})

describe('ensurePromise', () => {
  testEnsure(ensurePromise, expectedValueTypes)
})

describe('fallbackPromise', () => {
  testFallback(fallbackPromise, expectedValueTypes, { fallbackValue: Promise.resolve() })
})

describe('isNotPromise', () => {
  testGuard(isNotPromise, expectedValueTypes, { negative: true })
})

describe('assertNotPromise', () => {
  testAssert(assertNotPromise, expectedValueTypes, { negative: true })
})

describe('ensureNotPromise', () => {
  testEnsure(ensureNotPromise, expectedValueTypes, { negative: true })
})

describe('fallbackNotPromise', () => {
  testFallback(fallbackNotPromise, expectedValueTypes, { negative: true, fallbackValue: 123 })
})
