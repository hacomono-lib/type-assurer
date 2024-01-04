import { describe, expectTypeOf, test } from 'vitest'
import { fixNumber } from '.'

describe('fix definite types', () => {
  test('should fix as number for NumberParsable type values.', () => {
    const target = '1' as string | number
    const result = fixNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly fix as number for union types.', () => {
    type One = true
    const target = '1' as 1 | '1' | 'one' | One
    const result = fixNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 3>()
  })

  test(`should return type as number when the first argument is a union type \
  and the second argument is a non-representable number like NaN`, () => {
    type One = true
    const target = '1' as 1 | '1' | 'one' | One
    const result = fixNumber(target, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test.skip('should strictly fix as number for Branded type.', () => {
    type Branded<T> = T & { __brand: 'branded' }
    const target = '1' as Branded<'1'> | Branded<1> | Branded<'one'> | Branded<true>
    const result = fixNumber(target, 3 as Branded<3>)
    // FIXME: This test should pass, but it fails.
    // @ts-ignore
    expectTypeOf(result).toEqualTypeOf<Branded<1 | 3>>()
  })
})

describe('fix number string convert to number', () => {
  test('should fix as number for number parsable string including dot', () => {
    const target = '2.1' as const
    const result = fixNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<2.1 | 3>()
  })

  test('should fix as number for number parsable string including minus', () => {
    const target = '-2' as const
    const result = fixNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<-2 | 3>()
  })
})

describe('fix unknown types', () => {
  test('should fix as number for unknown type value.', () => {
    const target = 'string' as unknown
    const result = fixNumber(target, NaN)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test.skip('should strictly fix as number when type argument is set.', () => {
    type Type = 1 | 2 | 3

    const target = '1' as unknown
    // FIXME: This test should pass, but it fails.
    // @ts-ignore
    const result = fixNumber<Type>(target, 3)
    // @ts-ignore
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})
