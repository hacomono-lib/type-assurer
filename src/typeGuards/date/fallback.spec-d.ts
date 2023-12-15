/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackDate, fallbackNotDate } from '.'

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

describe('fallbackNotDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = fallbackNotDate(target, 'string')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackNotDate(target, 'string')
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('uncorrect fallback type', () => {
    const target = 'string' as unknown
    // @ts-expect-error
    fallbackNotDate(target, new Date())
  })
})
