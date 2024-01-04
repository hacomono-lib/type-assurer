import { describe, expectTypeOf, test } from 'vitest'
import { ensureString } from '.'

describe('ensure definite types', () => {
  test('should ensure as string for string type values.', () => {
    const target = 'string' as string | object
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should strictly ensure as string for string literal types.', () => {
    const target = 'string' as 'string' | object
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<'string'>()
  })

  test('should strictly ensure as string for dynamic string literal types.', () => {
    const target = '3' as `${number}` | number
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<`${number}`>()
  })

  test('should strictly ensure as string for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = 'string' as BrandedString | object
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<BrandedString>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as string for unknown type value.', () => {
    const target = 'string' as unknown
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should strictly ensure as string when type argument is set.', () => {
    const target = 'string' as unknown
    const result = ensureString<'foo'>(target)
    expectTypeOf(result).toEqualTypeOf<'foo'>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    ensureString<// @ts-expect-error
    3>(
      //
      'string',
    )
  })
})
