import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, assertNumberParsable } from './guards'

describe('assert definite types', () => {
  test('should assert as NumberParsable type for NumberParsable type values.', () => {
    const target = '1' as string | number
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<NumberParsable>()
  })

  test('should strictly assert as NumberParsable type for string literal types.', () => {
    const target = '1' as '1' | 1 | 'a' | boolean
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<1 | '1'>()
  })

  test('should strictly assert as NumberParsable type for Branded type.', () => {
    type Branded<T> = T & { __brand: 'branded' }
    const target = '1' as Branded<'1'> | Branded<1> | Branded<'one'> | Branded<true>
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<Branded<1 | '1'>>()
  })
})

describe('assert unknown types', () => {
  test('should assert as NumberParsable type for unknown type value.', () => {
    const target = '3' as unknown
    assertNumberParsable(target)
    expectTypeOf(target).toEqualTypeOf<NumberParsable>()
  })

  test('should strictly assert as NumberParsable type when type argument is set.', () => {
    const target = '3' as unknown
    assertNumberParsable<3>(target)
    expectTypeOf(target).toEqualTypeOf<3>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not parsable string', () => {
    assertNumberParsable<// @ts-expect-error
    string>(
      //
      123,
    )
  })
})
