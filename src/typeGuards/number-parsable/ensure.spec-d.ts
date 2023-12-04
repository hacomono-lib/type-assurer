import { test, describe, assertType } from 'vitest'
import { ensureNumberParsable, ensureNotNumberParsable } from '.'
import { Equals } from '../../lib/test'

describe('ensureNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = ensureNumberParsable(targetNumber)
    assertType<Equals<number, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result = ensureNumberParsable(targetConstNumber)
    assertType<Equals<1 | '2', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNumberParsable(targetUnknown)
    assertType<Equals<number, typeof result>>(true)
  })
})

describe('ensureNotNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = ensureNotNumberParsable(targetNumber)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result = ensureNotNumberParsable(targetConstNumber)
    assertType<Equals<'a', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotNumberParsable(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
