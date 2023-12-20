import { describe, expectTypeOf, test } from 'vitest'
import { assertDate, assertNotDate } from '.'

describe('assertDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    assertDate(target)
    expectTypeOf(target).toEqualTypeOf<Date>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertDate(target)
    expectTypeOf(target).toEqualTypeOf<Date>()
  })
})

describe('assertNotDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    assertNotDate(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertNotDate(target)
    expectTypeOf(target).toEqualTypeOf<unknown>()
  })
})
