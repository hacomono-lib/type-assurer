import { describe, expectTypeOf, test } from 'vitest'
import { isJSON } from '.'
import type { JSONifiable, JSONifiableArray, JSONifiableObject } from './type'

describe('isJSON type tests', () => {
  test('guard definite types', () => {
    const target = {} as object | string
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONifiableObject | JSONifiableArray | string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })

  test('guard definite types 2', () => {
    const target = {} as { foo?: string } | '1'
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo?: string } | '1'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<never>()
    }
  })

  test('guard definite types 3', () => {
    const target = {} as { foo?: string } | Date | unknown[] | null | (() => void) | undefined
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo?: string } | Date | JSONifiable[] | null>()
    } else {
      expectTypeOf(target).toEqualTypeOf<undefined | (() => void) | unknown[]>()
    }
  })

  test('guard definite types 4', () => {
    class Foo {
      bar = 'bar'
      baz(): string {
        return 'baz'
      }
    }
    const target = new Foo()
    if (isJSON(target)) {
      // @ts-ignore FIXME: This is a bug
      expectTypeOf(target).toEqualTypeOf<never>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Foo>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONifiable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
