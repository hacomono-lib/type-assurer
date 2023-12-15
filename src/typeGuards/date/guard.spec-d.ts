import { test, describe, expectTypeOf } from 'vitest'
import { isDate, isNotDate } from '.'

describe('isDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    if (isDate(targetDate)) {
      expectTypeOf(targetDate).toEqualTypeOf<Date>()
    } else {
      expectTypeOf(targetDate).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isDate(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<Date>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})

describe('isNotDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    if (isNotDate(targetDate)) {
      expectTypeOf(targetDate).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetDate).toEqualTypeOf<Date>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotDate(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<Date>()
    }
  })
})
