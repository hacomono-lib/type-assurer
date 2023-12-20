import { describe, expect, it } from 'vitest'
import {
  assertNumberParsable,
  coerceNumber,
  ensureNumberParsable,
  fallbackNumberParsable,
  fixNumber,
  isNumberParsable,
} from '.'
import { TypeAssertionError } from '../../lib'
import { ValueType, getGenerator, testAssert, testEnsure, testFallback, testGuard, testTypes } from '../../lib-test'

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
  it('should coerce number', () => {
    expect(coerceNumber(123)).toBe(123)
    expect(coerceNumber(123.456)).toBe(123.456)
    expect(coerceNumber(Infinity)).toBe(Infinity)
    expect(coerceNumber(-123)).toBe(-123)
    expect(coerceNumber(-123.456)).toBe(-123.456)
    expect(coerceNumber(-Infinity)).toBe(-Infinity)
    expect(coerceNumber(0)).toBe(0)
  })

  it('should coerce number from number-like string', () => {
    expect(coerceNumber('123')).toBe(123)
    expect(coerceNumber('123.456')).toBe(123.456)
    expect(coerceNumber('Infinity')).toBe(Infinity)
    expect(coerceNumber('-123')).toBe(-123)
    expect(coerceNumber('-123.456')).toBe(-123.456)
    expect(coerceNumber('-Infinity')).toBe(-Infinity)
  })

  const target = testTypes(expected).filter((type) => !expected.includes(type))

  it.each(target)('should throw error when argument is %s', (type) => {
    const value = getGenerator(type)()
    expect(() => coerceNumber(value)).toThrow(TypeAssertionError)
  })
})

describe('fixNumber', () => {
  it('should fix number', () => {
    expect(fixNumber(123, NaN)).toBe(123)
    expect(fixNumber(123.456, NaN)).toBe(123.456)
    expect(fixNumber(Infinity, NaN)).toBe(Infinity)
    expect(fixNumber(-123, NaN)).toBe(-123)
    expect(fixNumber(-123.456, NaN)).toBe(-123.456)
    expect(fixNumber(-Infinity, NaN)).toBe(-Infinity)
    expect(fixNumber(0, NaN)).toBe(0)
  })

  it('should fix number from number-like string', () => {
    expect(fixNumber('123', NaN)).toBe(123)
    expect(fixNumber('123.456', NaN)).toBe(123.456)
    expect(fixNumber('Infinity', NaN)).toBe(Infinity)
    expect(fixNumber('-123', NaN)).toBe(-123)
    expect(fixNumber('-123.456', NaN)).toBe(-123.456)
    expect(fixNumber('-Infinity', NaN)).toBe(-Infinity)
  })

  const target = testTypes(expected).filter((type) => !expected.includes(type))

  it.each(target)('should return fallback value when argument is %s', (type) => {
    const value = getGenerator(type)()
    expect(fixNumber(value, NaN)).toBe(NaN)
    expect(fixNumber(value, 123)).toBe(123)
  })
})
