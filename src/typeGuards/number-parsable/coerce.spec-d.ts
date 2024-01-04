import { describe, expectTypeOf, test } from 'vitest'
import { coerceNumber } from '.'

describe('coerce definite types', () => {
  test('should coerce as number for NumberParable type values.', () => {
    const target = '1' as string | number
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly coerce as number for string literal types.', () => {
    const target = '1' as '1' | '2' | 'a'
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<1 | 2>()
  })

  test('should strictly coerce as number for string literal types with dot.', () => {
    const target = '1.1' as '1.1' | '2' | 'a'
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<1.1 | 2>()
  })

  test.skip('should strictly coerce as number for Branded type.', () => {
    type Branded<T> = T & { __brand: 'branded' }
    const target = '1' as Branded<'1'> | Branded<1> | Branded<'one'> | Branded<true>
    const result = coerceNumber(target)
    // FIXME: This should be Branded<1>
    // @ts-ignore
    expectTypeOf(result).toEqualTypeOf<Branded<1>>()
  })
})

describe('coerce unknown types', () => {
  test('should coerce as number for unknown type value.', () => {
    const target = '3' as unknown
    const result = coerceNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test.skip('should strictly coerce as number when type argument is set.', () => {
    type Type = 1 | 2 | 3
    const target = '3' as unknown
    // FIXME: argument can pass any type
    // @ts-ignore
    const result = coerceNumber<Type>(target)
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})
