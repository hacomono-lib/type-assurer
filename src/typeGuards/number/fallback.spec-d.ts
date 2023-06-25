/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNumber, fallbackNotNumber } from '.'

describe('fallbackNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<number>(fallbackNumber(targetNumber, 3))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertType<1 | 3>(fallbackNumber(targetConstNumber, 3))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(fallbackNumber(targetUnknown, 3))
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumber('string', "1")
  })
})

describe('fallbackNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<string>(fallbackNotNumber(targetNumber, 'string'))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertType<'1' | 'string'>(fallbackNotNumber(targetConstNumber, 'string'))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(fallbackNotNumber(targetUnknown, 'string'))
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNotNumber('string', 1)
  })
})
