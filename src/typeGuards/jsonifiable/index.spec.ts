import { describe, expect, test } from 'vitest'
import {
  assertNotJsonifiable,
  assertJsonifiable,
  ensureNotJsonifiable,
  ensureJsonifiable,
  fallbackNotJsonifiable,
  fallbackJsonifiable,
  isJsonifiable,
  isNotJsonifiable,
  coerceJsonObject,
  coerceJsonString
} from '.'
import {
  allTypes,
  getGenerator,
  testAssert,
  testEnsure,
  testFallback,
  testGuard,
  ValueType
} from '../../lib/test'

const jsonParsables = [
  ValueType.JsonParsableArray,
  ValueType.JsonParsableEmptyArray,
  ValueType.JsonParsableComplexObject,
  ValueType.JsonParsableEmptyObject,
  ValueType.JsonParsableFalse,
  ValueType.JsonParsableNull,
  ValueType.JsonParsableNumber,
  ValueType.JsonParsableString,
  ValueType.JsonParsableTrue,
  ValueType.NumberParsablePositiveInt,
  ValueType.NumberParsableNegativeInt,
  ValueType.NumberParsablePositiveFloat,
  ValueType.NumberParsableNegativeFloat,
  ValueType.BooleanParsableTrue,
  ValueType.BooleanParsableFalse
]

const jsonFormatables = [
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

const expected = [...jsonFormatables, ...jsonParsables]

const expectedNot = allTypes().filter((type) => !expected.includes(type))

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

describe('coerceJsonString', () => {
  test.each(jsonParsables)('test value type: %s, returns same value', (valueType) => {
    const value = getGenerator(valueType)()
    expect(coerceJsonString(value)).toBe(value)
  })

  test.each(jsonFormatables)('test value type: %s, coerce to JSON string', (valueType) => {
    const value = getGenerator(valueType)()
    expect(coerceJsonString(value)).toBe(JSON.stringify(value))
  })

  test.each(expectedNot)('test value type: %s, throws TypeAssertionError', (valueType) => {
    const value = getGenerator(valueType)()
    expect(() => coerceJsonString(value)).toThrow()
  })
})

describe('coerceJsonObject', () => {
  test.each(jsonFormatables)('test value type: %s, returns same value', (valueType) => {
    const value = getGenerator(valueType)()
    expect(coerceJsonObject(value)).toBe(value)
  })

  test.each(jsonParsables)('test value type: %s, coerce to JSON object', (valueType) => {
    const value = getGenerator(valueType)()
    expect(coerceJsonObject(value)).toEqual(JSON.parse(JSON.stringify(value)))
  })

  test.each(expectedNot)('test value type: %s, throws TypeAssertionError', (valueType) => {
    const value = getGenerator(valueType)()
    expect(() => coerceJsonObject(value)).toThrow()
  })
})
