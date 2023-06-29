/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackDate, fallbackNotDate } from '.'

describe('fallbackDate type tests', () => {
  test('guard definite types.', () => {
    const target = new Date() as Date | string
    assertType<Date>(fallbackDate(target, new Date()))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<Date>(fallbackDate(target, new Date()))
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
    assertType<string>(fallbackNotDate(target, 'string'))
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertType<unknown>(fallbackNotDate(target, 'string'))
  })

  test('uncorrect fallback type', () => {
    const target = 'string' as unknown
    // @ts-expect-error
    fallbackNotDate(target, new Date())
  })
})
