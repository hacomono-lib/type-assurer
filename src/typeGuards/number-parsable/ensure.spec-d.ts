import { test, describe, assertType } from 'vitest'
import { type NumberParsable, ensureNumberParsable } from '.'
import { type Equals } from '../../lib/test'

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
    const targetUnknown = '3' as unknown
    const result = ensureNumberParsable(targetUnknown)
    assertType<Equals<NumberParsable, typeof result>>(true)
  })
})
