/* eslint-disable @typescript-eslint/ban-types */
import { test, describe, expectTypeOf } from 'vitest'
import { assertFunction } from '.'

describe('assertFunction type tests', () => {
  test('assert definite types', () => {
    const targetFunction = (() => {}) as Function | string
    assertFunction(targetFunction)
    expectTypeOf(targetFunction).toEqualTypeOf<Function>()
  })

  test('assert definite types 2', () => {
    const targetConstFunction = (() => {}) as (() => void) | '1'
    assertFunction(targetConstFunction)
    expectTypeOf(targetConstFunction).toEqualTypeOf<() => void>()
  })

  test('assert definite types 3', () => {
    class Target {}

    const target = Target as typeof Target | Target
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<typeof Target>()
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertFunction(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<Function>()
  })
})
