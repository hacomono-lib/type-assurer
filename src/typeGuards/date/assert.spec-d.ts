import { test, describe, expectTypeOf } from 'vitest'
import { assertDate, assertNotDate } from '.'

describe('assertDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    assertDate(targetDate)
    expectTypeOf(targetDate).toEqualTypeOf<Date>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertDate(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<Date>()
  })
})

describe('assertNotDate type tests', () => {
  test('guard definite types.', () => {
    const targetDate = new Date() as Date | string
    assertNotDate(targetDate)
    expectTypeOf(targetDate).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotDate(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
  })
})
