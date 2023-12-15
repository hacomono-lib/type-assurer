import { describe, expect, test } from 'vitest'
import {
  assertJSONParsable,
  ensureJSONParsable,
  fallbackJSONParsable,
  isJSONParsable,
  coerceJSON,
  fixJSON
} from '.'
import {
  allTypes,
  testAssert,
  testEnsure,
  testFallback,
  testGuard,
  ValueType
} from '../../lib/test'

const expected = [
  ValueType.JsonParsableArray,
  ValueType.JsonParsableEmptyArray,
  ValueType.JsonParsableObject,
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

const expectedCoerceType = [ValueType.True, ValueType.False, ValueType.Null]

describe('isJSONParsable', () => {
  testGuard(isJSONParsable, expected, { parsableString: true })
})

describe('assertJSONParsable', () => {
  testAssert(assertJSONParsable, expected, { parsableString: true })
})

describe('ensureJSONParsable', () => {
  testEnsure(ensureJSONParsable, expected, { parsableString: true })
})

describe('fallbackJSONParsable', () => {
  testFallback(fallbackJSONParsable, expected, {
    parsableString: true,
    fallbackValue: [{ foo: 'bar' }]
  })
})

const notExpected = allTypes().filter(
  (type) => !expected.includes(type) && !expectedCoerceType.includes(type)
)

describe('coerceJson', () => {
  test('coerces string to JSON', () => {
    expect(coerceJSON('{"foo":"bar"}')).toStrictEqual({ foo: 'bar' })
    expect(coerceJSON('123')).toBe(123)
    expect(coerceJSON('true')).toBe(true)
    expect(coerceJSON('false')).toBe(false)
    expect(coerceJSON('null')).toBe(null)
  })

  test('coerces object or primitive to JSON', () => {
    expect(coerceJSON({ foo: 'bar' })).toStrictEqual({ foo: 'bar' })
    expect(coerceJSON(123)).toBe(123)
    expect(coerceJSON(true)).toBe(true)
    expect(coerceJSON(false)).toBe(false)
    expect(coerceJSON(null)).toBe(null)
  })

  test.each(notExpected)('test value type %s: should results false', (type) => {
    expect(() => coerceJSON(type)).toThrow()
  })
})

describe('fixJson', () => {
  test('fixes JSON', () => {
    expect(fixJSON('{"foo":"bar"}', {})).toStrictEqual({ foo: 'bar' })
    expect(fixJSON('123', {})).toBe(123)
    expect(fixJSON('true', {})).toBe(true)
    expect(fixJSON('false', {})).toBe(false)
    expect(fixJSON('null', {})).toBe(null)
  })

  test('fixes object or primitive', () => {
    expect(fixJSON({ foo: 'bar' }, {})).toStrictEqual({ foo: 'bar' })
    expect(fixJSON(123, {})).toBe(123)
    expect(fixJSON(true, {})).toBe(true)
    expect(fixJSON(false, {})).toBe(false)
    expect(fixJSON(null, {})).toBe(null)
  })

  test.each(notExpected)('test value type %s: should results false', (type) => {
    expect(fixJSON(type, {})).toStrictEqual({})
  })
})
