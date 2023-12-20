/* eslint-disable @typescript-eslint/ban-types */
import { describe, expectTypeOf, test } from 'vitest'
import { fallbackFunction } from '.'

describe('fallbackFunction type tests', () => {
  test('fallback definite types', () => {
    const target = (() => 'foo') as Function | string
    const result = fallbackFunction(target, () => 'bar')
    expectTypeOf(result).toEqualTypeOf<Function | (() => 'bar')>()
  })

  test('fallback definite types 2', () => {
    const target = (() => 'foo') as (() => 'foo') | '1'
    const result = fallbackFunction(target, () => 'bar')
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
    const target = 'string' as unknown
    const result = fallbackFunction(target, () => {})
    expectTypeOf(result).toEqualTypeOf<Function>()
  })
})
