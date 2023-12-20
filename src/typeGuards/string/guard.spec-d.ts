import { describe, expectTypeOf, test } from 'vitest'
import { isString } from '.'

describe('isString type tests', () => {
  test('guard definite types', () => {
    const target = 'string' as string | object
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })

  test('guard definite types 2', () => {
    const target = 'string' as 'string' | object
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<'string'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })

  test('guard definite types 3', () => {
    const target = '3' as `${number}` | number
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<`${number}`>()
    } else {
      expectTypeOf(target).toEqualTypeOf<number>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
