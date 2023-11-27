import { describe } from 'vitest'
import { ValueType } from '../../lib/test/type'
import { testGuard, testAssert, testEnsure, testFallback } from '../../lib/test'
import {
  assertNotAwaitable,
  assertAwaitable,
  ensureNotAwaitable,
  ensureAwaitable,
  fallbackNotAwaitable,
  fallbackAwaitable,
  isNotAwaitable,
  isAwaitable
} from '.'

const expectedValueTypes = [
  ValueType.Promise,
  ValueType.ThenableFunction,
  ValueType.ThenableInstance,
  ValueType.ThenableObject,
  ValueType.Awaited
]

describe('isPromiseLike', () => {
  testGuard(isAwaitable, expectedValueTypes)
})

describe('assertPromiseLike', () => {
  testAssert(assertAwaitable, expectedValueTypes)
})

describe('ensurePromiseLike', () => {
  testEnsure(ensureAwaitable, expectedValueTypes)
})

describe('fallbackPromiseLike', () => {
  testFallback(fallbackAwaitable, expectedValueTypes, { fallbackValue: Promise.resolve() })
})

describe('isNotPromiseLike', () => {
  testGuard(isNotAwaitable, expectedValueTypes, { negative: true })
})

describe('assertNotPromiseLike', () => {
  testAssert(assertNotAwaitable, expectedValueTypes, { negative: true })
})

describe('ensureNotPromiseLike', () => {
  testEnsure(ensureNotAwaitable, expectedValueTypes, { negative: true })
})

describe('fallbackNotPromiseLike', () => {
  testFallback(fallbackNotAwaitable, expectedValueTypes, { negative: true, fallbackValue: 123 })
})
