import { describe, expectTypeOf, test } from 'vitest'
import { isNumber } from '.'

describe('isNumber type tests', () => {
  test('guard definite types', () => {
    const target = 1 as number | string
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<number>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const target = 1 as 1 | '1'
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<1>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'1'>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<number>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
