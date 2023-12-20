import { describe, expectTypeOf, test } from 'vitest'
import { coerceNumber } from '.'

describe('coerceNumber type tests', () => {
  test('coerce definite types.', () => {
    const target = '1' as string | number
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('coerce unknown types', () => {
    const target = '3' as unknown
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('coerce union types', () => {
    const target = '2' as '2' | 1 | 'a' | boolean
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<1 | 2>()
  })

  test('coerce number string with dot', () => {
    const target = '2.1' as '2.1' | 1 | 'a' | boolean
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<1 | 2.1>()
  })
})
