import { test, describe, expectTypeOf } from 'vitest'
import { assertNumberParsable, type NumberParsable } from '.'

describe('assertNumberParsable type tests', () => {
  test('assert definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertNumberParsable(targetNumberParsable)
    expectTypeOf(targetNumberParsable).toEqualTypeOf<NumberParsable>()
  })

  test('assert unknown types', () => {
    const targetUnknown = '3' as unknown
    assertNumberParsable(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<NumberParsable>()
  })

  test('assert union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    assertNumberParsable(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<1 | '1'>()
  })
})
