import { describe, expectTypeOf, test } from 'vitest'
import { assertNumber } from './guards'

describe('assert definite types', () => {
  test('should assert as number for number type values.', () => {
    const target = 1 as number | string
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<number>()
  })

  test('should strictly assert as number for number literal types.', () => {
    const target = 1 as 1 | '1'
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<1>()
  })

  test('should strictly assert as number for Branded number type', () => {
    type BrandedNumber = number & { __brand: 'branded' }
    const target = 1 as BrandedNumber | string
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<BrandedNumber>()
  })
})

describe('assert unknown types', () => {
  test('should assert as number for unknown type value.', () => {
    const target = 123 as unknown
    assertNumber(target)
    expectTypeOf(target).toEqualTypeOf<number>()
  })

  test('should strictly assert as number when type argument is set.', () => {
    type Type = 1 | 2 | 3
    const target = 123 as unknown
    assertNumber<Type>(target)
    expectTypeOf(target).toEqualTypeOf<Type>()
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not a number', () => {
    // @ts-expect-error
    assertNumber<string>(123)
  })
})
