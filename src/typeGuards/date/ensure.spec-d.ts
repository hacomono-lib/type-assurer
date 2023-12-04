import { test, describe, assertType } from 'vitest'
import { ensureDate, ensureNotDate } from '.'

describe('ensureDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = ensureDate(target)
    assertType<Equals<Date, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureDate(target)
    assertType<Equals<Date, typeof result>>(true)
  })
})

describe('ensureNotDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = ensureNotDate(target)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotDate(target)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
