import { test, describe, assertType } from 'vitest'
import { isDate, isNotDate } from '.'

describe('isDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    if (isDate(targetDate)) {
      assertType<Date>(targetDate)
    } else {
      assertType<string>(targetDate)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isDate(targetUnknown)) {
      assertType<Date>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    if (isNotDate(targetDate)) {
      assertType<string>(targetDate)
    } else {
      assertType<Date>(targetDate)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotDate(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<Date>(targetUnknown)
    }
  })
})
