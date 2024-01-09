import { describe } from 'vitest'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '~/lib-test'
import { assertJson, ensureJson, fallbackJson, isJson } from './guards'

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
  ValueType.ObjectToPrimitiveUndefined,
]

describe('isJSON', () => {
  testGuard(isJson, expected, { parsableString: true })
})

describe('assertJSON', () => {
  testAssert(assertJson, expected, { parsableString: true })
})

describe('ensureJSON', () => {
  testEnsure(ensureJson, expected, { parsableString: true })
})

describe('fallbackJSON', () => {
  testFallback(fallbackJson, expected, {
    parsableString: true,
    fallbackValue: [{ foo: 'bar' }],
  })
})
