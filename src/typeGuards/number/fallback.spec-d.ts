/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNumber, fallbackNotNumber } from '.'

describe('fallbackNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNumber(targetNumber, 3)
    assertType<Equals<number, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    const result = fallbackNumber(targetConstNumber, 3)
    assertType<Equals<1 | 3, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNumber(targetUnknown, 3)
    assertType<Equals<number, typeof result>>(true)
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumber('string', '1')
  })
})

describe('fallbackNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNotNumber(targetNumber, 'string')
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    const result = fallbackNotNumber(targetConstNumber, 'string')
    assertType<Equals<'1' | 'string', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNotNumber(targetUnknown, 'string')
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNotNumber('string', 1)
  })
})
