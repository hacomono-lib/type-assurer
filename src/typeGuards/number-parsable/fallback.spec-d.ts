import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, fallbackNumberParsable } from '.'

describe('fallback definite types', () => {
  test('should fallback as NumberParsable type for NumberParsable type values.', () => {
    const target = 1 as number | string
    const result = fallbackNumberParsable(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly fallback as NumberParsable type for string literal and union types.', () => {
    const target = 1 as 1 | '2' | 'a'
    const result1 = fallbackNumberParsable(target, 3)
    expectTypeOf(result1).toEqualTypeOf<1 | '2' | 3>()

    const result2 = fallbackNumberParsable(target, '3')
    expectTypeOf(result2).toEqualTypeOf<1 | '2' | '3'>()
  })

  test('should strictly fallback as NumberParsable type for Branded type.', () => {
    type Branded<T> = T & { __brand: 'branded' }
    type Four = true

    const target = '1' as Branded<'1'> | Branded<2> | Branded<'three'> | Branded<Four>
    const result = fallbackNumberParsable(target, 0 as Branded<0>)
    expectTypeOf(result).toEqualTypeOf<Branded<0 | '1' | 2>>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback as NumberParsable type for unknown type value.', () => {
    const target = '3' as unknown
    const result = fallbackNumberParsable(target, 3)
    expectTypeOf(result).toEqualTypeOf<NumberParsable>()
  })

  test('should strictly fallback as NumberParsable type when type argument is set.', () => {
    const target = '3' as unknown
    const result = fallbackNumberParsable<3>(target, 3)
    expectTypeOf(result).toEqualTypeOf<3>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not parsable string', () => {
    fallbackNumberParsable<// @ts-expect-error
    string>(
      //
      123,
      3,
    )
  })

  test('should result in a TypeScript type error when the argument is not parsable string', () => {
    fallbackNumberParsable(
      'string',
      // @ts-expect-error
      'a',
    )
  })
})
