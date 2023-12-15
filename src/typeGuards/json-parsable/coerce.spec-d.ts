import { test, describe, expectTypeOf } from 'vitest'
import { coerceJSON } from '.'
import type { JSON } from '../../lib/types'

describe('coerceJSON type tests', () => {
  describe('coerce json-parsable to json', () => {
    test('coerce definite types', () => {
      const targetObject = `{ "foo": "bar" }` as object | string
      const result = coerceJSON(targetObject)
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })

    test('coerce definite types 2', () => {
      const targetConstObject = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
      const result = coerceJSON(targetConstObject)
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })
  })

  describe('coerce json-like to json', () => {
    test('coerce definite types', () => {
      const targetObject = { foo: 'bar' } as object | string
      const result = coerceJSON(targetObject)
      expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
    })

    test('coerce definite types 2', () => {
      const targetConstObject = { foo: 'bar' } as { foo: string } | '1'
      const result = coerceJSON(targetConstObject)
      expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
    })

    test('guard definite types 3', () => {
      const targetConstObject = { foo: 'bar' } as
        | { foo: string }
        | Date
        | unknown[]
        | null
        | (() => void)
        | undefined
      const result = coerceJSON(targetConstObject)
      expectTypeOf(result).toEqualTypeOf<{ foo: string } | Date | Json[] | null>()
    })
  })

  describe('coerce mixed style', () => {
    test('coerce uncategorized types', () => {
      const targetConstObject = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
      const result = coerceJSON(targetConstObject)
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })

    test('coerce unknown types', () => {
      const targetUnknown = '{ "foo": "bar" }' as unknown
      const result = coerceJSON(targetUnknown)
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })
  })
})
