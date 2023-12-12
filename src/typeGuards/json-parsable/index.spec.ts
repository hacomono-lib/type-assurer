import { describe, expect, test } from 'vitest'
import {
  assertJSONParsable,
  ensureJSONParsable,
  fallbackJSONParsable,
  isJSONParsable,
  coerceJSON,
  fixJson
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

describe('coerceJson', () => {
  test('coerces JSON', () => {
    expect(coerceJSON('{"foo":"bar"}')).toStrictEqual({ foo: 'bar' })
    expect(coerceJSON('123')).toBe(123)
    expect(coerceJSON('true')).toBe(true)
    expect(coerceJSON('false')).toBe(false)
    expect(coerceJSON('null')).toBe(null)
  })

  const notExpected = allTypes().filter((type) => !expected.includes(type))

  test.each(notExpected)('throw value for %s', (type) => {
    expect(() => coerceJSON(type)).toThrow()
  })
})

describe('fixJson', () => {
  test('fixes JSON', () => {
    expect(fixJson('{"foo":"bar"}', {})).toStrictEqual({ foo: 'bar' })
    expect(fixJson('123', {})).toBe(123)
    expect(fixJson('true', {})).toBe(true)
    expect(fixJson('false', {})).toBe(false)
    expect(fixJson('null', {})).toBe(null)
  })

  const notExpected = allTypes().filter((type) => !expected.includes(type))

  test.each(notExpected)('returns fallback value for %s', (type) => {
    expect(fixJson(type, {})).toStrictEqual({})
  })
})
