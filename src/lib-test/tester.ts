import { expect, test } from 'vitest'
import type { Not, TypeAssert, TypeEnsure, TypeFallback, TypeGuard } from '../lib'
import { ValueType } from './type'
import { type PickTypesOption, type TestOption, allTypes, getGenerator, testTypes } from './value'

type ExpectGuard = (v: unknown) => boolean

function xor(a: boolean | null | undefined, b: boolean | null | undefined): boolean {
  return Boolean(a) !== Boolean(b)
}

/**
 * specifies TypeGuard function retuens should be same as lodash function
 *
 * @param actualGuard set TypeGuard function
 * @param expectGuard set Expected TypeGuard function (e.g. lodash)
 * @param opt
 */
export function testEquivalentGuard(
  actualGuard: TypeGuard | Not<TypeGuard>,
  expectGuard: ExpectGuard,
  opt: TestOption = {},
): void {
  const testcases = allTypes().map((type) => {
    const expected = xor(expectGuard(getGenerator(type)()), opt.negative)
    return { expected, type, case: `should return ${expected} when the value type is ${type}` }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)
    expect(actualGuard(generate())).toBe(expected)
  })
}

/**
 * specifies TypeGuard function returns should be true only specified ValueType.
 *
 * @param actualGuard set TypeGuard function
 * @param expectedValueTypes set expected ValueType array
 * @param opt
 */
export function testGuard(
  actualGuard: TypeGuard | Not<TypeGuard>,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption = {},
): void {
  const testcases = testTypes(expectedValueTypes, opt).map((type) => {
    const expected = xor(expectedValueTypes.includes(type), opt.negative)
    return { expected, type, case: `should return ${expected} when the value type is ${type}` }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)
    expect(actualGuard(generate())).toBe(expected)
  })
}

/**
 * specifies TypeAssert of InvertedTypeAssert function should throw or not that same as lodash function condition
 *
 * @param actualAssert set TypeAssert function (if opt.negative is true, set InvertedTypeAssert function)
 * @param expectGuard set Expected TypeGuard function (e.g. lodash)
 * @param opt
 */
export function testEquivalentAssert(actualAssert: TypeAssert, expectGuard: ExpectGuard, opt: TestOption = {}): void {
  const testcases = allTypes().map((type) => {
    const expected = xor(expectGuard(getGenerator(type)()), opt.negative)
    return { expected, type, case: `should ${expected ? 'NOT ' : ''}throw when the value type is ${type}` }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)

    if (expected) {
      expect(() => actualAssert(generate())).not.toThrow()
    } else {
      expect(() => actualAssert(generate())).toThrow()
    }
  })
}

/**
 *
 * @param actualAssert
 * @param expectedValueTypes
 * @param opt
 */
export function testAssert(
  actualAssert: TypeAssert,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption = {},
): void {
  const testcases = testTypes(expectedValueTypes, opt).map((type) => {
    const expected = xor(expectedValueTypes.includes(type), opt.negative)
    return { expected, type, case: `should ${expected ? 'NOT ' : ''}throw when the value type is ${type}` }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)

    if (expected) {
      expect(() => actualAssert(generate())).not.toThrow()
    } else {
      expect(() => actualAssert(generate())).toThrow()
    }
  })
}

/**
 * specifies TypeEnsure of InvertedTypeEnsure function should return or throw that same as lodash function condition
 *
 * @param ensure set TypeEnsure function (if opt.negative is true, set InvertedTypeEnsure function)
 * @param expectGuard set Expected TypeGuard function (e.g. lodash)
 * @param opt
 */
export function testEquivalentEnsure(ensure: TypeEnsure, expectGuard: ExpectGuard, opt: TestOption = {}): void {
  const testcases = allTypes().map((type) => {
    const expected = xor(expectGuard(getGenerator(type)()), opt.negative)
    return {
      expected,
      type,
      case: expected
        ? `should return the value when the value type is ${type}`
        : `should throw when the value type is ${type}`,
    }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)

    if (expected) {
      const value = generate()
      expect(ensure(value)).toEqual(value)
    } else {
      expect(() => ensure(generate())).toThrow()
    }
  })
}

/**
 * specifies TypeEnsure function should return or throw only specified ValueType.
 *
 * @param ensure set TypeEnsure function
 * @param expectedValueTypes set expected ValueType array
 * @param opt
 */
export function testEnsure(
  ensure: TypeEnsure,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption = {},
): void {
  const testcases = testTypes(expectedValueTypes, opt).map((type) => {
    const expected = xor(expectedValueTypes.includes(type), opt.negative)
    return {
      expected,
      type,
      case: expected
        ? `should return the value when the value type is ${type}`
        : `should throw when the value type is ${type}`,
    }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)

    if (expected) {
      const value = generate()
      expect(ensure(value)).toEqual(value)
    } else {
      expect(() => ensure(generate())).toThrow()
    }
  })
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type AnyFunction = (...args: any[]) => any

/**
 * specifies TypeFallback of InvertedTypeFallback function should return that same as lodash function condition
 *
 * @param fallback set TypeFallback function (if opt.negative is true, set InvertedTypeFallback function)
 * @param expectGuard set Expected TypeGuard function (e.g. lodash)
 * @param opt
 */
export function testEquivalentFallback(
  fallback: TypeFallback,
  expectGuard: ExpectGuard,
  opt: TestOption & { fallbackValue: unknown },
): void

// TypeFallback | InvertedTypeFallback is difficult to type safe, so use AnyFunction
export function testEquivalentFallback(
  fallback: AnyFunction,
  expectGuard: ExpectGuard,
  opt: TestOption & { fallbackValue: unknown },
): void {
  const testcases = allTypes().map((type) => {
    const expected = xor(expectGuard(getGenerator(type)()), opt.negative)
    return {
      expected,
      type,
      case: `should return ${expected ? 'the value' : 'fallback value'} when the value type is ${type}`,
    }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)
    const value = generate()

    expect(fallback(value, opt.fallbackValue)).toEqual(expected ? value : opt.fallbackValue)
  })
}

/**
 * specifies TypeFallback function should return only specified ValueType.
 *
 * @param fallback set TypeFallback function
 * @param expectedValueTypes set expected ValueType array
 * @param opt
 */
export function testFallback(
  fallback: TypeFallback,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption & { fallbackValue: unknown },
): void

export function testFallback(
  fallback: AnyFunction,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption & { fallbackValue: unknown },
): void {
  const testcases = testTypes(expectedValueTypes, opt).map((type) => {
    const expected = xor(expectedValueTypes.includes(type), opt.negative)
    return {
      expected,
      type,
      case: `should return ${expected ? 'the value' : 'fallback value'} when the value type is ${type}`,
    }
  })

  test.each(testcases)('$case', ({ type, expected }) => {
    const generate = getGenerator(type)
    const value = generate()
    expect(fallback(value, opt.fallbackValue)).toEqual(expected ? value : opt.fallbackValue)
  })
}
