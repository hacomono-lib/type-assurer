import { describe, expectTypeOf, test } from 'vitest'
import { assertString } from '.'

describe('assert definite types', () => {
  test('should assert as string for string type values.', () => {
    const target = 'string' as string | object
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('should strictly assert as string for string literal types.', () => {
    const target = 'string' as 'string' | object
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<'string'>()
  })

  test('should strictly assert as string for dynamic string literal types.', () => {
    const target = '3' as `${number}` | number
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<`${number}`>()
  })

  test('should strictly assert as string for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = 'string' as BrandedString | object
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<BrandedString>()
  })
})

describe('assert unknown types', () => {
  test('should assert as string for unknown type value.', () => {
    const target = 'string' as unknown
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('should strictly assert as string when type argument is set.', () => {
    const target = 'string' as unknown
    assertString<'string'>(target)
    expectTypeOf(target).toEqualTypeOf<'string'>()
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    assertString<// @ts-expect-error
    3>(
      //
      'string',
    )
  })
})
