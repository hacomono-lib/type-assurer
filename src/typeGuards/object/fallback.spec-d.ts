/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackObject } from '.'

describe('fallbackObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = fallbackObject(targetObject, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<object>()
  })

  test('guard definite types 2', () => {
    const targetConstObject = { foo: 'bar' } as { foo?: string } | '1'
    const result = fallbackObject(targetConstObject, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | { baz: string }>()
  })

  test('guard definite types 3', () => {
    const targetConstObject = { foo: 'bar' } as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
      | typeof String
    const result = fallbackObject(targetConstObject, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | Date>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackObject(targetUnknown, { foo: 'bar' })
    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
  })

  test('uncorrect fallback value', () => {
    const result = fallbackObject('foo', 'bar')
    expectTypeOf(result).toEqualTypeOf<never>()
  })
})
