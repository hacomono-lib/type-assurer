import { describe } from 'vitest'
import { assertJSON, ensureJSON, fallbackJSON, isJSON } from '.'
import { ValueType, testAssert, testEnsure, testFallback, testGuard } from '../../lib-test'

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
  testGuard(isJSON, expected, { parsableString: true })
})

describe('assertJSON', () => {
  testAssert(assertJSON, expected, { parsableString: true })
})

describe('ensureJSON', () => {
  testEnsure(ensureJSON, expected, { parsableString: true })
})

describe('fallbackJSON', () => {
  testFallback(fallbackJSON, expected, {
    parsableString: true,
    fallbackValue: [{ foo: 'bar' }],
  })
})
