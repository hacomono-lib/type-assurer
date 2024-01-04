import { describe, expectTypeOf, test } from 'vitest'
import { isNumber } from '.'

describe('guard definite types', () => {
  test('should guard as number for number type values.', () => {
    const target = 1 as number | string
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<number>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as number for number literal types.', () => {
    const target = 1 as 1 | '1'
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<1>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'1'>()
    }
  })

  test('should strictly guard as number for Branded number type', () => {
    type BrandedNumber = number & { __brand: 'branded' }
    const target = 1 as BrandedNumber | string
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<BrandedNumber>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as number for unknown type value.', () => {
    const target = 'string' as unknown
    if (isNumber(target)) {
      expectTypeOf(target).toEqualTypeOf<number>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as number when type argument is set.', () => {
    type Type = 1 | 2 | 3
    const target = 'string' as unknown
    if (isNumber<Type>(target)) {
      expectTypeOf(target).toEqualTypeOf<Type>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not a number', () => {
    // @ts-expect-error
    isNumber<string>('string')
  })
})
