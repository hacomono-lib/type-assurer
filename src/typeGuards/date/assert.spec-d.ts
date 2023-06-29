/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { assertDate, assertNotDate } from '.'

describe('assertDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    assertDate(targetDate)
    assertType<Date>(targetDate)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertDate(targetUnknown)
    assertType<Date>(targetUnknown)
  })
})

describe('assertNotDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    assertNotDate(targetDate)
    assertType<string>(targetDate)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotDate(targetUnknown)
    assertType<unknown>(targetUnknown)
  })
})
