import { test, describe, expectTypeOf } from 'vitest'
import { isObject } from '.'

describe('isObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isObject(targetObject)) {
      expectTypeOf(targetObject).toEqualTypeOf<object>()
    } else {
      // object type includes Array, null, but isObject checkes truthy object.
      expectTypeOf(targetObject).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isObject(targetConstObject)) {
      expectTypeOf(targetConstObject).toEqualTypeOf<{ foo?: string }>()
    } else {
      expectTypeOf(targetConstObject).toEqualTypeOf<'1'>()
    }
  })

  test('guard definite types 3', () => {
    const targetConstObject = { foo: 'bar' } as
      | { foo: string }
      | Date
      | typeof String
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
    if (isObject(targetConstObject)) {
      expectTypeOf(targetConstObject).toEqualTypeOf<{ foo: string } | Date>()
    } else {
      expectTypeOf(targetConstObject).toEqualTypeOf<
        null | undefined | unknown[] | string | (() => void) | typeof String
      >()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isObject(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<Record<string, unknown>>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
