import { test, describe, expectTypeOf } from 'vitest'
import { coerceNumber } from '.'

describe('coerceNumber type tests', () => {
  test('coerce definite types.', () => {
    const targetNumberParsable = '1' as string | number
    const result = coerceNumber(targetNumberParsable)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('coerce unknown types', () => {
    const targetUnknown = '3' as unknown
    const result = coerceNumber(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('coerce union types', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    const result = coerceNumber(targetUnion)
    expectTypeOf(result).toEqualTypeOf<1 | 2>()
  })

  test('coerce number string with dot', () => {
    const targetUnion = '2.1' as '2.1' | 1 | 'a' | boolean
    const result = coerceNumber(targetUnion)
    expectTypeOf(result).toEqualTypeOf<1 | 2.1>()
  })
})
