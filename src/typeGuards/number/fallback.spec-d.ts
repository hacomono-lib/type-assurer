/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNumber } from '.'
import type { Equals } from '../../lib/test'

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
