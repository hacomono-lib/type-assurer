import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, ensureNumberParsable } from './guards'

describe('ensure definite types', () => {
  test('should ensure as NumberParsable type for NumberParsable type values.', () => {
    const target = 1 as number | string
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly ensure as NumberParsable type for string literal types.', () => {
    const target = 1 as 1 | '2' | 'a'
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<1 | '2'>()
  })

  test('should strictly ensure as NumberParsable type for Branded type.', () => {
    type Branded<T> = T & { __brand: 'branded' }
    const target = '1' as Branded<'1'> | Branded<2> | Branded<'three'> | Branded<true>
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<Branded<'1' | 2>>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as NumberParsable type for unknown type value.', () => {
    const target = '3' as unknown
    const result = ensureNumberParsable(target)
    expectTypeOf(result).toEqualTypeOf<NumberParsable>()
  })

  test('should strictly ensure as NumberParsable type when type argument is set.', () => {
    type Type = '1' | '2' | '3'
    const target = '3' as unknown
    const result = ensureNumberParsable<Type>(target)
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not parsable string', () => {
    ensureNumberParsable<// @ts-expect-error
    string>(
      //
      123,
    )
  })
})
