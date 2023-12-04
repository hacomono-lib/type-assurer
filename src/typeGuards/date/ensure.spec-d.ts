import { test, describe, assertType } from 'vitest'
import { ensureDate, ensureNotDate } from '.'

describe('ensureDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    assertType<Date>(ensureDate(target))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<Date>(ensureDate(target))
  })
})

describe('ensureNotDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    assertType<string>(ensureNotDate(target))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<unknown>(ensureNotDate(target))
  })
})
