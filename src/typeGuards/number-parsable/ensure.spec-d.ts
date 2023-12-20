import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, ensureNumberParsable } from '.'

describe('ensureNumberParsable type tests', () => {
  test('guard definite types', () => {
    const target = 1 as number | string
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const target = 1 as 1 | '2' | 'a'
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<1 | '2'>()
  })

  test('guard unknown types', () => {
    const target = '3' as unknown
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<NumberParsable>()
  })
})
