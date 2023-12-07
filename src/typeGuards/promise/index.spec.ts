import { describe } from 'vitest'
import { ValueType } from '../../lib/test/type'
import { testGuard, testAssert, testEnsure, testFallback } from '../../lib/test'
import { assertPromise, ensurePromise, fallbackPromise, isPromise } from '.'

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
