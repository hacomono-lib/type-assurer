import { describe, expectTypeOf, test } from 'vitest'
import { fallbackNumber } from './guards'

describe('fallback definite types', () => {
  test('should fallback as number for number type values.', () => {
    const target = 1 as number | string
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly fallback as number for number literal types.', () => {
    const target = 1 as 1 | '1'
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<1 | 3>()
  })

  test('should strictly fallback as number for Branded number type', () => {
    type BrandedNumber = number & { __brand: 'branded' }
    const target = 1 as BrandedNumber | string
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<BrandedNumber | 3>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback as number for unknown type value.', () => {
    const target = 'string' as unknown
    const result = fallbackNumber(target, 3)
    expectTypeOf(result).toEqualTypeOf<number>()
  })

  test('should strictly fallback as number when type argument is set.', () => {
    type Type = 1 | 2 | 3
    const target = 'string' as unknown
    const result = fallbackNumber<Type>(target, 3)
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not a number', () => {
    // @ts-expect-error
    fallbackNumber<string>('string', '1')
  })

  test('should result in TypeScript type error when the fallback value is not a number', () => {
    // @ts-expect-error
    fallbackNumber('string', '1')
  })
})
