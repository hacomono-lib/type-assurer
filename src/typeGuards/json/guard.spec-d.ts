/* eslint-disable max-lines-per-function */
import { test, describe, assertType } from 'vitest'
import type { JSON, JSONObject, JSONArray } from './type'
import { isJSON } from '.'
import type { Equals } from '../../lib/test'

describe('isJSON type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isJSON(targetObject)) {
      assertType<Equals<JSONObject | JSONArray | string, typeof targetObject>>(true)
    } else {
      assertType<Equals<object, typeof targetObject>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isJSON(targetConstObject)) {
      assertType<Equals<{ foo?: string } | '1', typeof targetConstObject>>(true)
    } else {
      assertType<Equals<never, typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | (() => void)
      | undefined
    if (isJSON(targetConstObject)) {
      assertType<Equals<{ foo?: string } | Date | JSON[] | null, typeof targetConstObject>>(true)
    } else {
      assertType<Equals<undefined | (() => void) | unknown[], typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 4', () => {
    class Foo {
      bar: string = 'bar'
      baz(): string {
        return 'baz'
      }
    }
    const target = new Foo()
    if (isJSON(target)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore FIXME: This is a bug
      assertType<Equals<never, typeof target>>(true)
    } else {
      assertType<Equals<Foo, typeof target>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isJSON(targetUnknown)) {
      assertType<Equals<JSON, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})
