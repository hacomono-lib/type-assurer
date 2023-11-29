import { describe } from 'vitest'
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
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [
  ValueType.BooleanObject,
  ValueType.NumberObject,
  ValueType.StringObject,
  ValueType.ArrayLike,
  ValueType.ArrayBuffer,
  ValueType.SharedArrayBuffer,
  ValueType.DataView,
  ValueType.EmptyDataView,
  ValueType.Buffer,
  ValueType.EmptyBuffer,
  ValueType.Object,
  ValueType.EmptyObject,
  ValueType.BlankObject,
  ValueType.RecursiveObject,
  ValueType.WellKnownSymbolObject,
  ValueType.IterableObject,
  ValueType.AsyncIterableObject,
  ValueType.RegExp,
  ValueType.Proxy,
  ValueType.Promise,
  ValueType.ThenableObject,
  ValueType.ThenableInstance,
  ValueType.Awaited,
  ValueType.Date,
  ValueType.Error,
  ValueType.ClassInstance,
  ValueType.Map,
  ValueType.EmptyMap,
  ValueType.WeakMap,
  ValueType.EmptyWeakMap,
  ValueType.Set,
  ValueType.EmptySet,
  ValueType.WeakSet,
  ValueType.EmptyWeakSet
]

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
