import { describe, expect, test } from 'vitest'
import {
  assertNotJsonParsable,
  assertJsonParsable,
  ensureNotJsonParsable,
  ensureJsonParsable,
  fallbackNotJsonParsable,
  fallbackJsonParsable,
  isJsonParsable,
  isNotJsonParsable,
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

describe('isJsonParsable', () => {
  testGuard(isJsonParsable, expected, { parsableString: true })
})

describe('assertJsonParsable', () => {
  testAssert(assertJsonParsable, expected, { parsableString: true })
})

describe('ensureJsonParsable', () => {
  testEnsure(ensureJsonParsable, expected, { parsableString: true })
})

describe('fallbackJsonParsable', () => {
  testFallback(fallbackJsonParsable, expected, {
    parsableString: true,
    fallbackValue: [{ foo: 'bar' }]
  })
})

describe('isNotJsonParsable', () => {
  testGuard(isNotJsonParsable, expected, { parsableString: true, negative: true })
})

describe('assertNotJsonParsable', () => {
  testAssert(assertNotJsonParsable, expected, { parsableString: true, negative: true })
})

describe('ensureNotJsonParsable', () => {
  testEnsure(ensureNotJsonParsable, expected, { parsableString: true, negative: true })
})

describe('fallbackNotJsonParsable', () => {
  testFallback(fallbackNotJsonParsable, expected, {
    parsableString: true,
    negative: true,
    fallbackValue: 'fallback'
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
