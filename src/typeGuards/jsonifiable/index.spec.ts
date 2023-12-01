import { describe } from 'vitest'
import {
  assertNotJsonifiable,
  assertJsonifiable,
  ensureNotJsonifiable,
  ensureJsonifiable,
  fallbackNotJsonifiable,
  fallbackJsonifiable,
  isJsonifiable,
  isNotJsonifiable
} from '.'
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
  ValueType.Proxy
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

describe('isNotJsonifiable', () => {
  testGuard(isNotJsonifiable, expected, { parsableString: true, negative: true })
})

describe('assertNotJsonifiable', () => {
  testAssert(assertNotJsonifiable, expected, { parsableString: true, negative: true })
})

describe('ensureNotJsonifiable', () => {
  testEnsure(ensureNotJsonifiable, expected, { parsableString: true, negative: true })
})

describe('fallbackNotJsonifiable', () => {
  testFallback(fallbackNotJsonifiable, expected, {
    parsableString: true,
    negative: true,
    fallbackValue: 'fallback'
  })
})
