import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, fallbackNumberParsable } from '.'

describe('fallbackNumberParsable type tests', () => {
  test('guard definite types', () => {
    const target = 1 as number | string
    const result = fallbackNumberParsable(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('guard definite types 2', () => {
    const target = 1 as 1 | '2' | 'a'
    const result1 = fallbackNumberParsable(target, 3)
    expectTypeOf(result1).toEqualTypeOf<1 | '2' | 3>()

    const result2 = fallbackNumberParsable(target, '3')
    expectTypeOf(result2).toEqualTypeOf<1 | '2' | '3'>()
  })

  test('guard unknown types', () => {
    const target = '3' as unknown
    const result = fallbackNumberParsable(target, 3)
    expectTypeOf(result).toEqualTypeOf<NumberParsable>()
  })

  test('uncorrect fallback types', () => {
    // @ts-expect-error
    fallbackNumberParsable('string', 'a')
  })
})
