import { describe, it, expect } from 'vitest'
import {
  assertNotNumberParsable,
  assertNumberParsable,
  ensureNotNumberParsable,
  ensureNumberParsable,
  fallbackNotNumberParsable,
  fallbackNumberParsable,
  isNumberParsable,
  isNotNumberParsable,
  coerceNumber
} from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'
import { ValueType } from '../../lib/test/type'
import { getGenerator } from '../../lib/test/value'
import { TypeAssertionError } from '../../lib/error/error'
import { testTypes } from '../../lib/test/value'

const expected = [
  ValueType.PositiveNumber,
  ValueType.NegativeNumber,
  ValueType.Zero,
  ValueType.PositiveInfinity,
  ValueType.NegativeInfinity,
  ValueType.NaN,
  ValueType.NumberParsablePositiveInt,
  ValueType.NumberParsablePositiveFloat,
  ValueType.NumberParsablePositiveInfinity,
  ValueType.NumberParsableNegativeInt,
  ValueType.NumberParsableNegativeFloat,
  ValueType.NumberParsableNegativeInfinity
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
  testFallback(fallbackNumberParsable, expected, { parsableString: true, fallbackValue: [123] })
})

describe('isNotNumberParsable', () => {
  testGuard(isNotNumberParsable, expected, { parsableString: true, negative: true })
})

describe('assertNotNumberParsable', () => {
  testAssert(assertNotNumberParsable, expected, { parsableString: true, negative: true })
})

describe('ensureNotNumberParsable', () => {
  testEnsure(ensureNotNumberParsable, expected, { parsableString: true, negative: true })
})

describe('fallbackNotNumberParsable', () => {
  testFallback(fallbackNotNumberParsable, expected, {
    parsableString: true,
    negative: true,
    fallbackValue: 'fallback'
  })
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

  const targetValues = testTypes(expected).filter((type) => !expected.includes(type))

  it.each(targetValues)('should throw error when argument is %s', (type) => {
    const value = getGenerator(type)()
    expect(() => coerceNumber(value)).toThrow(TypeAssertionError)
  })
})
