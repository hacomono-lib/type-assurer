/* eslint-disable max-lines-per-function */
import { test, describe, expectTypeOf } from 'vitest'
import type { JSONifiable, JSONifiableObject, JSONifiableArray } from './type'
import { isJSON } from '.'

describe('isJSON type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isJSON(targetObject)) {
      expectTypeOf(targetObject).toEqualTypeOf<JSONifiableObject | JSONifiableArray | string>()
    } else {
      expectTypeOf(targetObject).toEqualTypeOf<object>()
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isJSON(targetConstObject)) {
      expectTypeOf(targetConstObject).toEqualTypeOf<{ foo?: string } | '1'>()
    } else {
      expectTypeOf(targetConstObject).toEqualTypeOf<never>()
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
      expectTypeOf(targetConstObject).toEqualTypeOf<
        { foo?: string } | Date | JSONifiable[] | null
      >()
    } else {
      expectTypeOf(targetConstObject).toEqualTypeOf<undefined | (() => void) | unknown[]>()
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
      expectTypeOf(target).toEqualTypeOf<never>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Foo>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isJSON(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<JSONifiable>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
