/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNumberParsable, fallbackNotNumberParsable } from '.'

describe('fallbackNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<number>(fallbackNumberParsable(targetNumber, 3))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    assertType<1 | '2' | 3>(fallbackNumberParsable(targetConstNumber, 3))
    assertType<1 | '2' | '3'>(fallbackNumberParsable(targetConstNumber, '3'))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(fallbackNumberParsable(targetUnknown, 3))
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumberParsable('string', 'a')
  })
})

describe('fallbackNotNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<string>(fallbackNotNumberParsable(targetNumber, 'string'))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    assertType<'a' | 'string'>(fallbackNotNumberParsable(targetConstNumber, 'string'))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(fallbackNotNumberParsable(targetUnknown, 'string'))
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNotNumberParsable('string', 1)
  })
})
