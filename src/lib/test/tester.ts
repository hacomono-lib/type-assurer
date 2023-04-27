import { expect } from 'vitest'
import { InvertedTypeAssert, InvertedTypeEnsure, InvertedTypeFallback, TypeAssert, TypeEnsure, TypeFallback, TypeGuard } from '../..'
import { type TestOption, allTypes, getGenerator } from './value'

type ExpectGuard = (v: unknown) => boolean

function xor(a: boolean | null | undefined, b: boolean | null | undefined): boolean {
  return (a as boolean && !b as boolean) || (!a as boolean && b as boolean)
}

/**
 * specifies TypeGuard function retuens should be same as lodash function
 *
 * @param actualGuard set TypeGuard function
 * @param expectGuard set lodash function
 * @param opt
 */
export function testGuard(actualGuard: TypeGuard, expectGuard: ExpectGuard): void {
  for (const type of allTypes()) {
    const generate = getGenerator(type)
    expect(actualGuard(generate())).toBe(expectGuard(generate()))
  }
}

/**
 * specifies TypeAssert of InvertedTypeAssert function should throw or not that same as lodash function condition
 *
 * @param actualAssert set TypeAssert function (if opt.negative is true, set InvertedTypeAssert function)
 * @param expectGuard set lodash function
 * @param opt
 */
export function testAssert(actualAssert: TypeAssert | InvertedTypeAssert, expectGuard: ExpectGuard, opt: TestOption = {}): void {
  for (const type of allTypes()) {
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
  }
}

/**
 * specifies TypeEnsure of InvertedTypeEnsure function should return or throw that same as lodash function condition
 *
 * @param ensure set TypeEnsure function (if opt.negative is true, set InvertedTypeEnsure function)
 * @param expectGuard set lodash function
 * @param opt
 */
export function testEnsure(ensure: TypeEnsure | InvertedTypeEnsure, expectGuard: ExpectGuard, opt: TestOption = {}): void {
  for (const type of allTypes()) {
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
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

/**
 * specifies TypeFallback of InvertedTypeFallback function should return that same as lodash function condition
 *
 * @param fallback set TypeFallback function (if opt.negative is true, set InvertedTypeFallback function)
 * @param expectGuard set lodash function
 * @param opt
 */
export function testFallback(fallback: TypeFallback | InvertedTypeFallback, expectGuard: ExpectGuard, opt: TestOption & { fallbackValue: unknown }): void;

// TypeFallback | InvertedTypeFallback is difficult to type safe, so use AnyFunction
export function testFallback(fallback: AnyFunction, expectGuard: ExpectGuard, opt: TestOption & { fallbackValue: unknown }): void {
  for (const type of allTypes()) {
    const generate = getGenerator(type)
    const value = generate()

    // (lodash.isString: true, negative: false) or (lodash.isString: false, negative: true)
    // fallbackString should return value that same as first argument

    // (lodash.isString: true, negative: true) or (lodash.isString: false, negative: false)
    // fallbackString should return fallback value

    const expected = xor(expectGuard(generate()), opt.negative) ? value : opt.fallbackValue
    expect(fallback(value, opt.fallbackValue)).toEqual(expected)
  }
}
