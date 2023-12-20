import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, assertNumberParsable } from '.'

describe('assertNumberParsable type tests', () => {
  test('assert definite types.', () => {
    const target = '1' as string | number
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<NumberParsable>()
  })

  test('assert unknown types', () => {
    const target = '3' as unknown
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<NumberParsable>()
  })

  test('assert union types', () => {
    const target = '1' as '1' | 1 | 'a' | boolean
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<1 | '1'>()
  })
})
