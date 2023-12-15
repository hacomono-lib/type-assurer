import { test, describe, expectTypeOf } from 'vitest'
import { isNumberParsable, type NumberParsable } from '.'

describe('isNumberParsable type tests', () => {
  test('guard definite types.', () => {
    const targetNumberParsable = '1' as string | number
    if (isNumberParsable(targetNumberParsable)) {
      expectTypeOf(targetNumberParsable).toEqualTypeOf<NumberParsable>()
    } else {
      expectTypeOf(targetNumberParsable).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNumberParsable(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<NumberParsable>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })

  test('guard union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    if (isNumberParsable(targetUnion)) {
      expectTypeOf(targetUnion).toEqualTypeOf<1 | '1'>()
    } else {
      expectTypeOf(targetUnion).toEqualTypeOf<boolean | 'a'>()
    }
  })
})
