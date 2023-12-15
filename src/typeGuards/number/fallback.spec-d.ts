/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackNumber } from '.'

describe('fallbackNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNumber(targetNumber, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    const result = fallbackNumber(targetConstNumber, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 3>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNumber(targetUnknown, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumber('string', '1')
  })
})
