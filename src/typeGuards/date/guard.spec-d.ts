import { test, describe, assertType } from 'vitest'
import { isDate, isNotDate } from '.'
import type { Equals } from '../../lib/test'

describe('isDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    if (isDate(targetDate)) {
      assertType<Equals<Date, typeof targetDate>>(true)
    } else {
      assertType<Equals<string, typeof targetDate>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isDate(targetUnknown)) {
      assertType<Equals<Date, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})

describe('isNotDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    if (isNotDate(targetDate)) {
      assertType<Equals<string, typeof targetDate>>(true)
    } else {
      assertType<Equals<Date, typeof targetDate>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotDate(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<Date, typeof targetUnknown>>(true)
    }
  })
})
