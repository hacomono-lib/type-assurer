/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackDate, fallbackNotDate } from '.'
import type { Equals } from '../../lib/test'

describe('fallbackDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    const result = fallbackDate(target, new Date())
    assertType<Equals<Date, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackDate(target, new Date())
    assertType<Equals<Date, typeof result>>(true)
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
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackNotDate(target, 'string')
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('uncorrect fallback type', () => {
    const target = 'string' as unknown
    // @ts-expect-error
    fallbackNotDate(target, new Date())
  })
})
