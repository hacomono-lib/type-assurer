import { test, describe, expectTypeOf } from 'vitest'
import { type NumberParsable, ensureNumberParsable } from '.'

describe('ensureNumberParsable type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = ensureNumberParsable(targetNumber)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '2' | 'a'
    const result = ensureNumberParsable(targetConstNumber)
    expectTypeOf(result).toEqualTypeOf<1 | '2'>()
  })

  test('guard unknown types', () => {
    const targetUnknown = '3' as unknown
    const result = ensureNumberParsable(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<NumberParsable>()
  })
})
