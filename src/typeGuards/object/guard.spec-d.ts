import { describe, expectTypeOf, test } from 'vitest'
import { isObject } from '.'

describe('isObject type tests', () => {
  test('guard definite types', () => {
    const target = {} as object | string
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<object>()
    } else {
      // object type includes Array, null, but isObject checkes truthy object.
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const target = {} as { foo?: string } | '1'
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo?: string }>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'1'>()
    }
  })

  test('guard definite types 3', () => {
    const target = { foo: 'bar' } as
      | { foo: string }
      | Date
      | typeof String
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo: string } | Date>()
    } else {
      expectTypeOf(target).toEqualTypeOf<null | undefined | unknown[] | string | (() => void) | typeof String>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<Record<string, unknown>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
