import { describe, expectTypeOf, test } from 'vitest'
import { fallbackObject } from '.'

describe('fallback definite types', () => {
  test('should fallback to default value for object type values.', () => {
    const target = {} as object | string
    const result = fallbackObject(target, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<object>()
  })

  test('should strictly fallback to default value for strict object type values.', () => {
    const target = { foo: 'bar' } as { foo?: string } | '1'
    const result = fallbackObject(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | { baz: string }>()
  })

  test('should strictly fallback to default value for union types.', () => {
    const target = { foo: 'bar' } as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
      | typeof String
    const result = fallbackObject(target, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | Date>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback to default value for unknown type value.', () => {
    const target = 'string' as unknown
    const result = fallbackObject(target, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
  })

  test('should strictly fallback to default value when type argument is set.', () => {
    const target = {} as unknown
    const result = fallbackObject<Record<string, string>>(target, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<Record<string, string>>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a object', () => {
    // FIXME: error not occured.
    // @ ts-expect-error
    fallbackObject<number>(123, 456)
  })
})
