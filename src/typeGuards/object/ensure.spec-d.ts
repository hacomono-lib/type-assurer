import { describe, expectTypeOf, test } from 'vitest'
import { ensureObject } from '.'

describe('ensureObject type tests', () => {
  test('guard definite types', () => {
    const target = {} as object | string
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<object>()
  })

  test('guard definite types 2', () => {
    const target = {} as { foo?: string } | '1'
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<{ foo?: string }>()
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
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | Date>()
  })

  test('guard unknown types', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
  })
})
