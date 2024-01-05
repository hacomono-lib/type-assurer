import { describe, expect, test } from 'vitest'
import { TypeAssertionError } from '~/lib'
import { ValueType, getGenerator, testAssert, testEnsure, testFallback, testGuard, testTypes } from '~/lib-test'
import {
  assertNumberParsable,
  coerceNumber,
  ensureNumberParsable,
  fallbackNumberParsable,
  fixNumber,
  isNumberParsable,
} from './guards'

const expected = [
  ValueType.True,
  ValueType.False,
  ValueType.BooleanObject,
  ValueType.ObjectToPrimitiveBoolean,
  ValueType.ObjectValueOfBoolean,
  ValueType.NumberObject,
  ValueType.PositiveNumber,
  ValueType.NegativeNumber,
  ValueType.Zero,
  ValueType.PositiveInfinity,
  ValueType.NegativeInfinity,
  ValueType.NumberParsablePositiveInt,
  ValueType.NumberStringLeadingZero,
  ValueType.NumberParsablePositiveFloat,
  ValueType.NumberParsablePositiveInfinity,
  ValueType.NumberParsableNegativeInt,
  ValueType.NumberParsableNegativeFloat,
  ValueType.NumberParsableNegativeInfinity,
  ValueType.ObjectToPrimitiveNumber,
  ValueType.ObjectValueOfNumber,
  ValueType.PositiveBigInt,
  ValueType.NegativeBigInt,
  ValueType.BigIntObject,
  ValueType.ObjectToPrimitiveBigInt,
  ValueType.ObjectValueOfBigInt,
  ValueType.Null,
  ValueType.ObjectToPrimitiveNull,
  ValueType.ObjectValueOfNull,
  ValueType.EmptyString,
  ValueType.EmptyArray,
  ValueType.EmptyBuffer,
  ValueType.Date,
]

describe('isNumberParsable', () => {
  testGuard(isNumberParsable, expected, { parsableString: true })
})

describe('assertNumberParsable', () => {
  testAssert(assertNumberParsable, expected, { parsableString: true })
})

describe('ensureNumberParsable', () => {
  testEnsure(ensureNumberParsable, expected, { parsableString: true })
})

describe('fallbackNumberParsable', () => {
  testFallback(fallbackNumberParsable, expected, { parsableString: true, fallbackValue: 12345 })
})

describe('coerceNumber', () => {
  const caseNumbers = [123, 123.456, Infinity, -123, -123.456, -Infinity, 0]

  test.each(caseNumbers)('should coerce number when argument is %s', (value) => {
    expect(coerceNumber(value)).toBe(value)
  })

  const caseNumberLikeStrings = [
    { input: '123', expected: 123 },
    { input: '123.456', expected: 123.456 },
    { input: 'Infinity', expected: Infinity },
    { input: '-123', expected: -123 },
    { input: '-123.456', expected: -123.456 },
    { input: '-Infinity', expected: -Infinity },
    { input: '0', expected: 0 },
  ]

  test.each(caseNumberLikeStrings)('should coerce number when argument is $input', ({ input, expected }) => {
    expect(coerceNumber(input)).toBe(expected)
  })

  const caseThrown = testTypes(expected).filter((type) => !expected.includes(type))

  test.each(caseThrown)('should throw error when argument is %s', (type) => {
    const value = getGenerator(type)()
    expect(() => coerceNumber(value)).toThrow(TypeAssertionError)
  })
})

describe('fixNumber', () => {
  const caseNumbers = [123, 123.456, Infinity, -123, -123.456, -Infinity, 0]

  test.each(caseNumbers)('should fix number when argument is %s', (value) => {
    expect(fixNumber(value, NaN)).toBe(value)
  })

  const caseNumberLikeStrings = [
    { input: '123', expected: 123 },
    { input: '123.456', expected: 123.456 },
    { input: 'Infinity', expected: Infinity },
    { input: '-123', expected: -123 },
    { input: '-123.456', expected: -123.456 },
    { input: '-Infinity', expected: -Infinity },
    { input: '0', expected: 0 },
  ]

  test.each(caseNumberLikeStrings)('should fix number when argument is $input', ({ input, expected }) => {
    expect(fixNumber(input, NaN)).toBe(expected)
  })

  const caseThrown = testTypes(expected).filter((type) => !expected.includes(type))

  test.each(caseThrown)('should return fallback value when argument is %s', (type) => {
    const value = getGenerator(type)()
    expect(fixNumber(value, NaN)).toBe(NaN)
    expect(fixNumber(value, 123)).toBe(123)
  })
})
