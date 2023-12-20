import { describe } from 'vitest'
import { testGuard, testAssert, testEnsure, testFallback, ValueType } from '../../lib/test'
import {
  assertNotAwaitable,
  assertAwaitable,
  ensureNotAwaitable,
  ensureAwaitable,
  fallbackNotAwaitable,
  fallbackAwaitable,
  isNotAwaitable,
  isAwaitable,
} from '.'

const expectedValueTypes = [
  ValueType.Promise,
  ValueType.ThenableFunction,
  ValueType.ThenableInstance,
  ValueType.ThenableObject,
  ValueType.Awaited,
]

describe('isAwaitable', () => {
  testGuard(isAwaitable, expectedValueTypes)
})

describe('assertAwaitable', () => {
  testAssert(assertAwaitable, expectedValueTypes)
})

describe('ensureAwaitable', () => {
  testEnsure(ensureAwaitable, expectedValueTypes)
})

describe('fallbackAwaitable', () => {
  testFallback(fallbackAwaitable, expectedValueTypes, { fallbackValue: Promise.resolve() })
})

describe('isNotAwaitable', () => {
  testGuard(isNotAwaitable, expectedValueTypes, { negative: true })
})

describe('assertNotAwaitable', () => {
  testAssert(assertNotAwaitable, expectedValueTypes, { negative: true })
})

describe('ensureNotAwaitable', () => {
  testEnsure(ensureNotAwaitable, expectedValueTypes, { negative: true })
})

describe('fallbackNotAwaitable', () => {
  testFallback(fallbackNotAwaitable, expectedValueTypes, { negative: true, fallbackValue: 123 })
})
