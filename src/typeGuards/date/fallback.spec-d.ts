/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expectTypeOf, test } from 'vitest'
import { fallbackDate } from './guards'

describe('fallbackDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = fallbackDate(target, new Date())
    expectTypeOf(result).toEqualTypeOf<Date>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackDate(target, new Date())
    expectTypeOf(result).toEqualTypeOf<Date>()
  })

  test('uncorrect fallback type', () => {
    const target = 'string' as unknown
    // @ts-expect-error
    fallbackDate(target, 'string')
  })
})

