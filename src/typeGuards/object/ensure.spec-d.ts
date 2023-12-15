import { test, describe, expectTypeOf } from 'vitest'
import { ensureObject } from '.'

describe('ensureObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = ensureObject(targetObject)
    expectTypeOf(result).toEqualTypeOf<object>()
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    const result = ensureObject(targetConstObject)
    expectTypeOf(result).toEqualTypeOf<{ foo?: string }>()
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
    const result = ensureObject(targetConstObject)
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | Date>()
  })

  test('guard unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = ensureObject(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
  })
})
