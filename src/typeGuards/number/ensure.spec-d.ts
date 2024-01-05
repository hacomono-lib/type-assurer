import { describe, expectTypeOf, test } from 'vitest'
import { ensureNumber } from './guards'

describe('ensure definite types', () => {
  test('should ensure as number for number type values.', () => {
    const target = 1 as number | string
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly ensure as number for number literal types.', () => {
    const target = 1 as 1 | '1'
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<1>()
  })

  test('should strictly ensure as number for Branded number type', () => {
    type BrandedNumber = number & { __brand: 'branded' }
    const target = 1 as BrandedNumber | string
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<BrandedNumber>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as number for unknown type value.', () => {
    const target = 123 as unknown
    const result = ensureNumber(target)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly ensure as number when type argument is set.', () => {
    type Type = 1 | 2 | 3
    const target = 123 as unknown
    const result = ensureNumber<Type>(target)
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not a number', () => {
    // @ts-expect-error
    ensureNumber<string>(123)
  })
})
