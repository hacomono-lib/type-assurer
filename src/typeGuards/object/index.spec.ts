import { describe } from 'vitest'
import { assertObject, ensureObject, fallbackObject, isObject } from '.'
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [
  ValueType.BooleanObject,
  ValueType.ObjectToPrimitiveBoolean,
  ValueType.ObjectValueOfBoolean,
  ValueType.ObjectToPrimitiveBigInt,
  ValueType.ObjectValueOfBigInt,
  ValueType.NumberObject,
  ValueType.ObjectToPrimitiveNumber,
  ValueType.ObjectValueOfNumber,
  ValueType.StringObject,
  ValueType.ObjectToPrimitiveString,
  ValueType.ObjectValueOfString,
  ValueType.ObjectToString,
  ValueType.ObjectValueOfNull,
  ValueType.ObjectToPrimitiveNull,
  ValueType.ObjectToPrimitiveUndefined,
  ValueType.ObjectValueOfUndefined,
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
  ValueType.EmptyWeakSet,
  ValueType.ObjectToPrimitiveSymbol,
  ValueType.ObjectValueOfSymbol
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
