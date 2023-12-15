/* eslint-disable max-lines */
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
} from '../types'
import { ValueType } from './type'
import { type TestOption, type PickTypesOption, allTypes, getGenerator, testTypes } from './value'

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
  opt: TestOption = {}
): void {
  const testcases = allTypes().map(
    (t) => [t, xor(expectGuard(getGenerator(t)()), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should return %s', (type, expected) => {
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
  opt: TestOption & PickTypesOption = {}
): void {
  const testcases = testTypes(expectedValueTypes, opt).map(
    (t) => [t, xor(expectedValueTypes.includes(t), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should return %s', (type, expected) => {
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
export function testEquivalentAssert(
  actualAssert: TypeAssert | InvertedTypeAssert,
  expectGuard: ExpectGuard,
  opt: TestOption = {}
): void {
  const testcases = allTypes().map(
    (t) => [t, xor(expectGuard(getGenerator(t)()), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should results %s', (type, expected) => {
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
  actualAssert: TypeAssert | InvertedTypeAssert,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption = {}
): void {
  const testcases = testTypes(expectedValueTypes, opt).map(
    (t) => [t, xor(expectedValueTypes.includes(t), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should results %s', (type, expected) => {
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
export function testEquivalentEnsure(
  ensure: TypeEnsure | InvertedTypeEnsure,
  expectGuard: ExpectGuard,
  opt: TestOption = {}
): void {
  const testcases = allTypes().map(
    (t) => [t, xor(expectGuard(getGenerator(t)()), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should results %s', (type, expected) => {
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
  ensure: TypeEnsure | InvertedTypeEnsure,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption = {}
): void {
  const testcases = testTypes(expectedValueTypes, opt).map(
    (t) => [t, xor(expectedValueTypes.includes(t), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should results %s', (type, expected) => {
    const generate = getGenerator(type)

    if (expected) {
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
  const testcases = allTypes().map(
    (t) => [t, xor(expectGuard(getGenerator(t)()), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should results %s', (type, expected) => {
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
  fallback: TypeFallback | InvertedTypeFallback,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption & { fallbackValue: unknown }
): void

export function testFallback(
  fallback: AnyFunction,
  expectedValueTypes: ValueType[],
  opt: TestOption & PickTypesOption & { fallbackValue: unknown }
): void {
  const testcases = testTypes(expectedValueTypes, opt).map(
    (t) => [t, xor(expectedValueTypes.includes(t), opt.negative)] as const
  )

  test.each(testcases)('test value type: %s, should results %s', (type, expected) => {
    const generate = getGenerator(type)
    const value = generate()
    expect(fallback(value, opt.fallbackValue)).toEqual(expected ? value : opt.fallbackValue)
  })
}
