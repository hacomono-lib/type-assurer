import { describe, expectTypeOf, test } from 'vitest'
import { fixNumber } from '.'

describe('fixNumber type tests', () => {
  test('fix definite types.', () => {
    const target = '1' as string | number
    const result = fixNumber(target, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('fix unknown types', () => {
    const target = 'string' as unknown
    const result = fixNumber(target, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('fix union types', () => {
    const target = '2' as '2' | 1 | 'a' | boolean
    const result = fixNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 2 | 3>()
  })

  test('fix union types with NaN', () => {
    const target = '2' as '2' | 1 | 'a' | boolean
    const result = fixNumber(target, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('fix number string with dot', () => {
    const target = '2.1' as '2.1' | 1 | 'a' | boolean
    const result = fixNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 2.1 | 3>()
  })
})
