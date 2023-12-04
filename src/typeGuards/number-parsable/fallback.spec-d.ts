/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNumberParsable, fallbackNotNumberParsable } from '.'

describe('fallbackNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNumberParsable(targetNumber, 3)
    assertType<Equals<number, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result = fallbackNumberParsable(targetConstNumber, 3)
    assertType<Equals<1 | '2' | 3, typeof result>>(true)
    const result = fallbackNumberParsable(targetConstNumber, '3')
    assertType<Equals<1 | '2' | '3', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNumberParsable(targetUnknown, 3)
    assertType<Equals<number, typeof result>>(true)
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumberParsable('string', 'a')
  })
})

describe('fallbackNotNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = fallbackNotNumberParsable(targetNumber, 'string')
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result = fallbackNotNumberParsable(targetConstNumber, 'string')
    assertType<Equals<'a' | 'string', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNotNumberParsable(targetUnknown, 'string')
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNotNumberParsable('string', 1)
  })
})
