/* eslint-disable @typescript-eslint/ban-types */
import { describe, expectTypeOf, test } from 'vitest'
import { isFunction } from '.'

describe('isFunction type tests', () => {
  test('guard definite types', () => {
    const target = (() => {}) as Function | string
    if (isFunction(target)) {
      expectTypeOf(target).toEqualTypeOf<Function>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const target = (() => {}) as (() => void) | '1'
    if (isFunction(target)) {
      expectTypeOf(target).toEqualTypeOf<() => void>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'1'>()
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
    const target = 'string' as unknown
    if (isFunction(target)) {
      expectTypeOf(target).toEqualTypeOf<Function>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
