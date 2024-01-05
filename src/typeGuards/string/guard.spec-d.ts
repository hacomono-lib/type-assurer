import { describe, expectTypeOf, test } from 'vitest'
import { isString } from './guards'

describe('guard definite types', () => {
  test('should guard as string for string type values.', () => {
    const target = 'string' as string | object
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })

  test('should strictly guard as string for string literal types.', () => {
    const target = 'string' as 'string' | object
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<'string'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })

  test('should strictly guard as string for dynamic string literal types.', () => {
    const target = '3' as `${number}` | number
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<`${number}`>()
    } else {
      expectTypeOf(target).toEqualTypeOf<number>()
    }
  })

  test('should strictly guard as string for Branded string type', () => {
    type BrandedString = string & { __brand: 'branded' }
    const target = 'string' as BrandedString | object
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<BrandedString>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as string for unknown type value.', () => {
    const target = 'string' as unknown
    if (isString(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as string when type argument is set.', () => {
    const target = 'string' as unknown
    if (isString<'string'>(target)) {
      expectTypeOf(target).toEqualTypeOf<'string'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type errors', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    isString<// @ts-expect-error
    3>('string')
  })
})
