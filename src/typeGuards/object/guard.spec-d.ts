import { test, describe, assertType } from 'vitest'
import { isObject } from '.'
import { Equals } from '../../lib/test'

describe('isObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isObject(targetObject)) {
      assertType<Equals<object, typeof targetObject>>(true)
    } else {
      // object type includes Array, null, but isObject checkes truthy object.
      assertType<Equals<string, typeof targetObject>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isObject(targetConstObject)) {
      assertType<Equals<{ foo?: string }, typeof targetConstObject>>(true)
    } else {
      assertType<Equals<'1', typeof targetConstObject>>(true)
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
      assertType<Equals<{ foo: string } | Date, typeof targetConstObject>>(true)
    } else {
      assertType<
        Equals<
          null | undefined | unknown[] | string | (() => void) | typeof String,
          typeof targetConstObject
        >
      >(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isObject(targetUnknown)) {
      assertType<Equals<Record<string, unknown>, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})
