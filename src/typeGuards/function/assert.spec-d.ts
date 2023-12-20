/* eslint-disable @typescript-eslint/ban-types */
import { describe, expectTypeOf, test } from 'vitest'
import { assertFunction } from '.'

describe('assertFunction type tests', () => {
  test('assert definite types', () => {
    const target = (() => {}) as Function | string
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<Function>()
  })

  test('assert definite types 2', () => {
    const target = (() => {}) as (() => void) | '1'
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<() => void>()
  })

  test('assert definite types 3', () => {
    class Target {}

    const target = Target as typeof Target | Target
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<typeof Target>()
  })

  test('assert unknown types', () => {
    const target = 'string' as unknown
    assertFunction(target)
    expectTypeOf(target).toEqualTypeOf<Function>()
  })
})
