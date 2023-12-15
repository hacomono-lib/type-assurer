import { test, describe, expectTypeOf } from 'vitest'
import { isNumber } from '.'

describe('isNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    if (isNumber(targetNumber)) {
      expectTypeOf(targetNumber).toEqualTypeOf<number>()
    } else {
      expectTypeOf(targetNumber).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    if (isNumber(targetConstNumber)) {
      expectTypeOf(targetConstNumber).toEqualTypeOf<1>()
    } else {
      expectTypeOf(targetConstNumber).toEqualTypeOf<'1'>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNumber(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<number>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
