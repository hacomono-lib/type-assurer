/* eslint-disable @typescript-eslint/ban-types */
import { test, describe, expectTypeOf } from 'vitest'
import { ensureFunction } from '.'

describe('ensureFunction type tests', () => {
  test('ensure definite types', () => {
    const targetFunction = (() => {}) as Function | string
    const result = ensureFunction(targetFunction)
    expectTypeOf(result).toEqualTypeOf<Function>()
  })

  test('ensure definite types 2', () => {
    const targetConstFunction = (() => {}) as (() => void) | '1'
    const result = ensureFunction(targetConstFunction)
    expectTypeOf(result).toEqualTypeOf<() => void>()
  })

  test('ensure definite types 3', () => {
    class Target {}

    const target = Target as typeof Target | Target
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<typeof Target>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureFunction(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<Function>()
  })
})
