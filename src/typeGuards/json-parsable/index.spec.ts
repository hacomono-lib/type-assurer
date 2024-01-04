import { describe, expect, test } from 'vitest'
import { assertJSONParsable, coerceJSON, ensureJSONParsable, fallbackJSONParsable, fixJSON, isJSONParsable } from '.'
import { ValueType, allTypes, testAssert, testEnsure, testFallback, testGuard } from '../../lib-test'

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
  ValueType.BooleanParsableFalse,
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
    fallbackValue: [{ foo: 'bar' }],
  })
})

const caseUnparsableTypes = allTypes().filter((type) => !(expected.includes(type) || expectedCoerceType.includes(type)))

describe('coerceJson', () => {
  const caseStrings = [
    { input: '{"foo": "bar"}', expected: { foo: 'bar' } },
    { input: '123', expected: 123 },
    { input: 'true', expected: true },
    { input: 'false', expected: false },
    { input: 'null', expected: null },
  ]

  test.each(caseStrings)('should coerce to json object when the value is $input', ({ input, expected }) => {
    expect(coerceJSON(input)).toStrictEqual(expected)
  })

  const caseJsons = [{ foo: 'bar' }, 123, true, false, null]

  test.each(caseJsons)('should coerce to json object when the value is %s', (input) => {
    expect(coerceJSON(input)).toStrictEqual(input)
  })

  test.each(caseUnparsableTypes)('should throw error when the value type is %s', (type) => {
    expect(() => coerceJSON(type)).toThrow()
  })
})

describe('fixJson', () => {
  const caseStrings = [
    { input: '{"foo": "bar"}', expected: { foo: 'bar' } },
    { input: '123', expected: 123 },
    { input: 'true', expected: true },
    { input: 'false', expected: false },
    { input: 'null', expected: null },
  ]

  test.each(caseStrings)('should fix to json object when the the value is $input', ({ input, expected }) => {
    expect(fixJSON(input, {})).toStrictEqual(expected)
  })

  const caseJsons = [{ foo: 'bar' }, 123, true, false, null]

  test.each(caseJsons)('should fix to json object when the value is %s', (input) => {
    expect(fixJSON(input, {})).toStrictEqual(input)
  })

  test.each(caseUnparsableTypes)('should fix to fallback value when the value type is %s', (type) => {
    expect(fixJSON(type, {})).toStrictEqual({})
  })
})
