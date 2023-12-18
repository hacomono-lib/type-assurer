/* eslint-disable @typescript-eslint/ban-types */
import { test, describe, expectTypeOf } from 'vitest'
import { isFunction } from '.'

describe('isFunction type tests', () => {
  test('guard definite types', () => {
    const targetFunction = (() => {}) as Function | string
    if (isFunction(targetFunction)) {
      expectTypeOf(targetFunction).toEqualTypeOf<Function>()
    } else {
      expectTypeOf(targetFunction).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const targetConstFunction = (() => {}) as (() => void) | '1'
    if (isFunction(targetConstFunction)) {
      expectTypeOf(targetConstFunction).toEqualTypeOf<() => void>()
    } else {
      expectTypeOf(targetConstFunction).toEqualTypeOf<'1'>()
    }
  })

  test('guard definite types 3', () => {
    class Target {}

    const target = Target as typeof Target | Target
    if (isFunction(target)) {
      expectTypeOf(target).toEqualTypeOf<typeof Target>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Target>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isFunction(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<Function>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
