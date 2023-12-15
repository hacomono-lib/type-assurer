import { test, describe, expectTypeOf } from 'vitest'
import { fixNumber } from '.'

describe('fixNumber type tests', () => {
  test('fix definite types.', () => {
    const targetNumberParsable = '1' as string | number
    const result = fixNumber(targetNumberParsable, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('fix unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fixNumber(targetUnknown, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('fix union types', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    const result = fixNumber(targetUnion, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 2 | 3>()
  })

  test('fix union types with NaN', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    const result = fixNumber(targetUnion, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('fix number string with dot', () => {
    const targetUnion = '2.1' as '2.1' | 1 | 'a' | boolean
    const result = fixNumber(targetUnion, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 2.1 | 3>()
  })
})
