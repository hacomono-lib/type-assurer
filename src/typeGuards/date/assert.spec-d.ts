import { test, describe, assertType } from 'vitest'
import { assertDate, assertNotDate } from '.'
import type { Equals } from '../../lib/test'

describe('assertDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    assertDate(targetDate)
    assertType<Equals<Date, typeof targetDate>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertDate(targetUnknown)
    assertType<Equals<Date, typeof targetUnknown>>(true)
  })
})

describe('assertNotDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    assertNotDate(targetDate)
    assertType<Equals<string, typeof targetDate>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotDate(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })
})
