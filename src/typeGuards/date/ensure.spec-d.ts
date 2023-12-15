import { test, describe, expectTypeOf } from 'vitest'
import { ensureDate, ensureNotDate } from '.'

describe('ensureDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = ensureDate(target)
    expectTypeOf(result).toEqualTypeOf<Date>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureDate(target)
    expectTypeOf(result).toEqualTypeOf<Date>()
  })
})

describe('ensureNotDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = ensureNotDate(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotDate(target)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })
})
