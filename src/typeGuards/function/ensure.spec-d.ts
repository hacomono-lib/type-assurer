/* eslint-disable @typescript-eslint/ban-types */
import { describe, expectTypeOf, test } from 'vitest'
import { ensureFunction } from '.'

describe('ensureFunction type tests', () => {
  test('ensure definite types', () => {
    const target = (() => {}) as Function | string
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<Function>()
  })

  test('ensure definite types 2', () => {
    const target = (() => {}) as (() => void) | '1'
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<() => void>()
  })

  test('ensure definite types 3', () => {
    class Target {}

    const target = Target as typeof Target | Target
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<typeof Target>()
  })

  test('ensure unknown types', () => {
    const target = 'string' as unknown
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<Function>()
  })
})
