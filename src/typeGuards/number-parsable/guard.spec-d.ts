import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, isNumberParsable } from '.'

describe('isNumberParsable type tests', () => {
  test('guard definite types.', () => {
    const target = '1' as string | number
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<NumberParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<NumberParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const target = '1' as '1' | 1 | 'a' | boolean
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<1 | '1'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<boolean | 'a'>()
    }
  })
})
