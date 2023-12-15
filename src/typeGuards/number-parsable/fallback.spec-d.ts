/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { type NumberParsable, fallbackNumberParsable } from '.'

describe('fallbackNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNumberParsable(targetNumber, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result1 = fallbackNumberParsable(targetConstNumber, 3)
    expectTypeOf(result1).toEqualTypeOf<1 | '2' | 3>()

    const result2 = fallbackNumberParsable(targetConstNumber, '3')
    expectTypeOf(result2).toEqualTypeOf<1 | '2' | '3'>()
  })

  test('guard unknown types', () => {
    const targetUnknown = '3' as unknown
    const result = fallbackNumberParsable(targetUnknown, 3)
    expectTypeOf(result).toEqualTypeOf<NumberParsable>()
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumberParsable('string', 'a')
  })
})
