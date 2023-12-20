import { describe, expectTypeOf, test } from 'vitest'
import { isDate, isNotDate } from '.'

describe('isDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    if (isDate(target)) {
      expectTypeOf(target).toEqualTypeOf<Date>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isDate(target)) {
      expectTypeOf(target).toEqualTypeOf<Date>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('isNotDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    if (isNotDate(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Date>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNotDate(target)) {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Date>()
    }
  })
})
