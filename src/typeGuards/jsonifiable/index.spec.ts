import { describe } from 'vitest'
import { assertJsonifiable, ensureJsonifiable, fallbackJsonifiable, isJsonifiable } from '.'
import { testAssert, testEnsure, testFallback, testGuard, ValueType } from '../../lib/test'

const expected = [
  ValueType.JsonifiableObject,
  ValueType.JsonifiableObjectInArray,
  ValueType.True,
  ValueType.False,
  ValueType.BooleanObject,
  ValueType.StringObject,
  ValueType.PositiveNumber,
  ValueType.NegativeNumber,
  ValueType.Null,
  ValueType.Zero,
  ValueType.NumberObject,
  ValueType.Array,
  ValueType.EmptyArray,
  ValueType.ArrayLike,
  ValueType.Object,
  ValueType.EmptyObject,
  ValueType.BlankObject,
  ValueType.WellKnownSymbolObject,
  ValueType.IterableObject,
  ValueType.AsyncIterableObject,
  ValueType.Date,
  ValueType.Proxy,
  ValueType.ObjectToPrimitiveBoolean,
  ValueType.ObjectToPrimitiveNumber,
  ValueType.ObjectToPrimitiveNull,
  ValueType.ObjectToPrimitiveBigInt,
  ValueType.ObjectToPrimitiveString,
  ValueType.ObjectToPrimitiveSymbol,
  ValueType.ObjectToPrimitiveUndefined
]

describe('isJsonifiable', () => {
  testGuard(isJsonifiable, expected, { parsableString: true })
})

describe('assertJsonifiable', () => {
  testAssert(assertJsonifiable, expected, { parsableString: true })
})

describe('ensureJsonifiable', () => {
  testEnsure(ensureJsonifiable, expected, { parsableString: true })
})

describe('fallbackJsonifiable', () => {
  testFallback(fallbackJsonifiable, expected, {
    parsableString: true,
    fallbackValue: [{ foo: 'bar' }]
  })
})
