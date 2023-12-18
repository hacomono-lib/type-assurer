/* eslint-disable @typescript-eslint/ban-types */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackFunction } from '.'

describe('fallbackFunction type tests', () => {
  test('fallback definite types', () => {
    const targetFunction = (() => 'foo') as Function | string
    const result = fallbackFunction(targetFunction, () => 'bar')
    expectTypeOf(result).toEqualTypeOf<Function | (() => 'bar')>()
  })

  test('fallback definite types 2', () => {
    const targetConstFunction = (() => 'foo') as (() => 'foo') | '1'
    const result = fallbackFunction(targetConstFunction, () => 'bar')
    expectTypeOf(result).toEqualTypeOf<(() => 'foo') | (() => 'bar')>()
  })

  test('fallback definite types 3', () => {
    class Target {}
    class Fallback {}

    const target = Target as typeof Target | Target
    const result = fallbackFunction(target, Fallback)
    expectTypeOf(result).toEqualTypeOf<typeof Target | typeof Fallback>()
  })

  test('fallback unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackFunction(targetUnknown, () => {})
    expectTypeOf(result).toEqualTypeOf<Function>()
  })
})
