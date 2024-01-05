import { describe, expectTypeOf, test } from 'vitest'
import { fallbackString } from './guards'

describe('fallback definite types', () => {
  test('should fallback as string for string type values.', () => {
    const target = 'string' as string | object
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should strictly fallback as string for string literal types.', () => {
    const target = 'string' as 'string' | object
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<'string' | 'fallback'>()
  })

  test('should strictly fallback as string for dynamic string literal types.', () => {
    const target = '3' as `${number}` | number
    const result = fallbackString(target, '3')
    expectTypeOf(result).toEqualTypeOf<`${number}`>()
  })

  test('should strictly fallback as string for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = 'string' as BrandedString | object
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<BrandedString | 'fallback'>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback as string for unknown type value.', () => {
    const target = 'string' as unknown
    const result = fallbackString(target, 'fallback')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should strictly fallback as string when type argument is set.', () => {
    type Type = 'foo' | 'bar'
    const target = 'string' as unknown
    const result = fallbackString<Type>(target, 'bar')
    expectTypeOf(result).toEqualTypeOf<Type>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    fallbackString<// @ts-expect-error
    3>(
      //
      'string',
      'fallback',
    )
  })

  test('should result in a TypeScript type error when the type argument not match the fallback value.', () => {
    fallbackString<'foo'>(
      'foo',
      // @ts-expect-error
      'bar',
    )
  })

  test('should result in a TypeScript type error when the fallback value is unknown type.', () => {
    fallbackString(
      'string',
      // @ts-expect-error
      'fallback' as unknown,
    )
  })

  test('should result in a TypeScript type error when the fallback value is not a string.', () => {
    fallbackString(
      'string',
      // @ts-expect-error
      3,
    )
  })
})
