import { expect, test } from 'vitest'
import type {
  InvertedTypeAssert,
  InvertedTypeEnsure,
  InvertedTypeFallback,
  TypeAssert,
  TypeEnsure,
  TypeFallback,
  TypeGuard,
  Not
} from '../..'
import { ValueType } from './type'
import { type TestOption, allTypes, getGenerator, testTypes } from './value'

type ExpectGuard = (v: unknown) => boolean

function xor(a: boolean | null | undefined, b: boolean | null | undefined): boolean {
  return ((a as boolean) && (!b as boolean)) || ((!a as boolean) && (b as boolean))
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
  opt: TestOption = {}
): void {
  test.each(allTypes())('test value type: %s', (type) => {
    const generate = getGenerator(type)
    if (opt.negative) {
      expect(actualGuard(generate())).not.toBe(expectGuard(generate()))
    } else {
      expect(actualGuard(generate())).toBe(expectGuard(generate()))
    }
  })
}

/**
 * specifies TypeGuard function returns should be true only specified ValueType.
 *
 * @param actualGuard set TypeGuard function
 * @param expectedValueTypes set expected ValueType array
 * @param opt
 */
export function testGuard(actualGuard: TypeGuard | Not<TypeGuard>, expectedValueTypes: ValueType[], opt: TestOption = {}): void {
  test.each(testTypes(expectedValueTypes))('test value type: %s', (type) => {
    const generate = getGenerator(type)
    const expected = expectedValueTypes.includes(type)
    if (opt.negative) {
      expect(actualGuard(generate())).not.toBe(expected)
    } else {
      expect(actualGuard(generate())).toBe(expected)
    }
  })
}

/**
 * specifies TypeAssert of InvertedTypeAssert function should throw or not that same as lodash function condition
 *
 * @param actualAssert set TypeAssert function (if opt.negative is true, set InvertedTypeAssert function)
 * @param expectGuard set Expected TypeGuard function (e.g. lodash)
 * @param opt
 */
export function testEquivalentAssert(
  actualAssert: TypeAssert | InvertedTypeAssert,
  expectGuard: ExpectGuard,
  opt: TestOption = {}
): void {
  test.each(allTypes())('test value type: %s', (type) => {
    const generate = getGenerator(type)

    if (xor(expectGuard(generate()), opt.negative)) {
      // (lodash.isString: true, negative: false) or (lodash.isString: false, negative: true)
      // assertString should not throw

      expect(() => actualAssert(generate())).not.toThrow()
    } else {
      // (lodash.isString: true, negative: true) or (lodash.isString: false, negative: false)
      // assertString should throw

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
  actualAssert: TypeAssert | InvertedTypeAssert,
  expectedValueTypes: ValueType[],
  opt: TestOption = {}
): void {
  test.each(testTypes(expectedValueTypes))('test value type: %s', (type) => {
    const generate = getGenerator(type)
    const expected = expectedValueTypes.includes(type)

    if (xor(expected, opt.negative)) {
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
export function testEquivalentEnsure(
  ensure: TypeEnsure | InvertedTypeEnsure,
  expectGuard: ExpectGuard,
  opt: TestOption = {}
): void {
  test.each(allTypes())('test value type: %s', (type) => {
    const generate = getGenerator(type)

    if (xor(expectGuard(generate()), opt.negative)) {
      // (lodash.isString: true, negative: false) or (lodash.isString: false, negative: true)
      // ensureString should not throw and return value that same as argument

      const value = generate()
      expect(ensure(value)).toEqual(value)
    } else {
      // (lodash.isString: true, negative: true) or (lodash.isString: false, negative: false)
      // ensureString should throw

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
  ensure: TypeEnsure | InvertedTypeEnsure,
  expectedValueTypes: ValueType[],
  opt: TestOption = {}
): void {
  test.each(testTypes(expectedValueTypes))('test value type: %s', (type) => {
    const generate = getGenerator(type)
    const expected = expectedValueTypes.includes(type)

    if (xor(expected, opt.negative)) {
      const value = generate()
      expect(ensure(value)).toEqual(value)
    } else {
      expect(() => ensure(generate())).toThrow()
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

/**
 * specifies TypeFallback of InvertedTypeFallback function should return that same as lodash function condition
 *
 * @param fallback set TypeFallback function (if opt.negative is true, set InvertedTypeFallback function)
 * @param expectGuard set Expected TypeGuard function (e.g. lodash)
 * @param opt
 */
export function testEquivalentFallback(
  fallback: TypeFallback | InvertedTypeFallback,
  expectGuard: ExpectGuard,
  opt: TestOption & { fallbackValue: unknown }
): void

// TypeFallback | InvertedTypeFallback is difficult to type safe, so use AnyFunction
export function testEquivalentFallback(
  fallback: AnyFunction,
  expectGuard: ExpectGuard,
  opt: TestOption & { fallbackValue: unknown }
): void {
  test.each(allTypes())('test value type: %s', (type) => {
    const generate = getGenerator(type)
    const value = generate()

    // (lodash.isString: true, negative: false) or (lodash.isString: false, negative: true)
    // fallbackString should return value that same as first argument

    // (lodash.isString: true, negative: true) or (lodash.isString: false, negative: false)
    // fallbackString should return fallback value

    const expected = xor(expectGuard(generate()), opt.negative) ? value : opt.fallbackValue
    expect(fallback(value, opt.fallbackValue)).toEqual(expected)
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
  fallback: TypeFallback | InvertedTypeFallback,
  expectedValueTypes: ValueType[],
  opt: TestOption & { fallbackValue: unknown }
): void

export function testFallback(
  fallback: AnyFunction,
  expectedValueTypes: ValueType[],
  opt: TestOption & { fallbackValue: unknown }
): void {
  test.each(testTypes(expectedValueTypes))('test value type: %s', (type) => {
    const generate = getGenerator(type)
    const value = generate()
    const expected = xor(expectedValueTypes.includes(type), opt.negative) ? value : opt.fallbackValue
    expect(fallback(value, opt.fallbackValue)).toEqual(expected)
  })
}
