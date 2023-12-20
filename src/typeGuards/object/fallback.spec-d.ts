import { describe, expectTypeOf, test } from 'vitest'
import { fallbackObject } from '.'

describe('fallbackObject type tests', () => {
  test('guard definite types', () => {
    const target = {} as object | string
    const result = fallbackObject(target, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<object>()
  })

  test('guard definite types 2', () => {
    const target = { foo: 'bar' } as { foo?: string } | '1'
    const result = fallbackObject(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | { baz: string }>()
  })

  test('guard definite types 3', () => {
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

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackObject(target, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
  })

  test('uncorrect fallback value', () => {
    const result = fallbackObject('foo', 'bar')
    expectTypeOf(result).toEqualTypeOf<never>()
  })
})
