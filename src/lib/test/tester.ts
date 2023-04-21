import { expect } from 'vitest'
import type { InvertedTypeAssert, InvertedTypeEnsure, InvertedTypeFallback, TypeAssert, TypeEnsure, TypeFallback, TypeGuard } from '../..'
import { type TestOption, fixTypes, generators } from './value'

export function testGuard(guard: TypeGuard, opt: TestOption): void {
  const { pass, fail } = fixTypes(opt.pass)

  for (const type of pass) {
    const generate = generators[type] as () => unknown
    expect(guard(generate())).toBe(opt.negative ? false : true)
  }

  for (const type of fail) {
    const generate = generators[type] as () => unknown
    expect(guard(generate())).toBe(opt.negative ? true : false)
  }
}

export function testAssert(assert: TypeAssert | InvertedTypeAssert, opt: TestOption): void {
  const { pass, fail } = fixTypes(opt.pass)

  for (const type of pass) {
    const generate = generators[type] as () => unknown
    if (opt.negative) {
      expect(() => assert(generate())).toThrow()
    } else {
      expect(() => assert(generate())).not.toThrow()
    }
  }

  for (const type of fail) {
    const generate = generators[type] as () => unknown
    if (opt.negative) {
      expect(() => assert(generate())).not.toThrow()
    } else {
      expect(() => assert(generate())).toThrow()
    }
  }
}

export function testEnsure(ensure: TypeEnsure | InvertedTypeEnsure, opt: TestOption): void {
  const { pass, fail } = fixTypes(opt.pass)

  for (const type of pass) {
    const generate = generators[type] as () => unknown
    if (opt.negative) {
      expect(() => ensure(generate())).toThrow()
    } else {
      const value = generate()
      expect(ensure(value)).toEqual(value)
    }
  }

  for (const type of fail) {
    const generate = generators[type] as () => unknown
    if (opt.negative) {
      const value = generate()
      expect(ensure(value)).toEqual(value)
    } else {
      expect(() => ensure(generate())).toThrow()
    }
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export function testFallback(fallback: TypeFallback | InvertedTypeFallback, opt: TestOption & { fallbackValue: unknown }): void;


// TypeFallback | InvertedTypeFallback の型安全化が大変なので、 any で対応
export function testFallback(fallback: AnyFunction, opt: TestOption & { fallbackValue: unknown }): void {
  const { pass, fail } = fixTypes(opt.pass)

  for (const type of pass) {
    const generate = generators[type] as () => unknown
    const value = generate()
    expect(fallback(value, opt.fallbackValue)).toBe(opt.negative ? opt.fallbackValue : value)
  }

  for (const type of fail) {
    const generate = generators[type] as () => unknown
    const value = generate()
    expect(fallback(value, opt.fallbackValue)).toBe(opt.negative ? value : opt.fallbackValue)
  }
}
