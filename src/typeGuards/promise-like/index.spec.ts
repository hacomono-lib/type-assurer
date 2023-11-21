import { describe } from 'vitest'
import { ValueType } from '../../lib/test/type'
import { testGuard, testAssert, testEnsure, testFallback } from '../../lib/test'
import {
  assertNotPromiseLike,
  assertPromiseLike,
  ensureNotPromiseLike,
  ensurePromiseLike,
  fallbackNotPromiseLike,
  fallbackPromiseLike,
  isNotPromiseLike,
  isPromiseLike
} from '.'

const expectedValueTypes = [ValueType.PromiseLike, ValueType.Promise]

describe('isPromiseLike', () => {
  testGuard(isPromiseLike, expectedValueTypes)
})

describe('assertPromiseLike', () => {
  testAssert(assertPromiseLike, expectedValueTypes)
})

describe('ensurePromiseLike', () => {
  testEnsure(ensurePromiseLike, expectedValueTypes)
})

describe('fallbackPromiseLike', () => {
  testFallback(fallbackPromiseLike, expectedValueTypes, { fallbackValue: Promise.resolve() })
})

describe('isNotPromiseLike', () => {
  testGuard(isNotPromiseLike, expectedValueTypes, { negative: true })
})

describe('assertNotPromiseLike', () => {
  testAssert(assertNotPromiseLike, expectedValueTypes, { negative: true })
})

describe('ensureNotPromiseLike', () => {
  testEnsure(ensureNotPromiseLike, expectedValueTypes, { negative: true })
})

describe('fallbackNotPromiseLike', () => {
  testFallback(fallbackNotPromiseLike, expectedValueTypes, { negative: true, fallbackValue: 123 })
})
