/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { type NumberParsable, fallbackNumberParsable } from '.'
import { type Equals } from '../../lib/test'

describe('fallbackNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNumberParsable(targetNumber, 3)
    assertType<Equals<number, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result1 = fallbackNumberParsable(targetConstNumber, 3)
    assertType<Equals<1 | '2' | 3, typeof result1>>(true)
    const result2 = fallbackNumberParsable(targetConstNumber, '3')
    assertType<Equals<1 | '2' | '3', typeof result2>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = '3' as unknown
    const result = fallbackNumberParsable(targetUnknown, 3)
    assertType<Equals<NumberParsable, typeof result>>(true)
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumberParsable('string', 'a')
  })
})
