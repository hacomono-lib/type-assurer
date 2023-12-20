/* eslint-disable max-lines-per-function */
import { test, describe, expectTypeOf } from 'vitest'
import { fixJSON } from '.'
import type { JSON } from '../../lib/types'

describe('fixJson type tests', () => {
  describe('fix json-parsable to json', () => {
    test('fix definite types', () => {
      const targetObject = `{ "foo": "bar" }` as object | string
      const result = fixJSON(targetObject, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })

    test('fix definite types 2', () => {
      const targetConstObject = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
      const result = fixJSON(targetConstObject, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSON | { baz: string }>()
    })
  })

  describe('fix json-like to json', () => {
    test('fix definite types', () => {
      const targetObject = { foo: 'bar' } as object | string
      const result = fixJSON(targetObject, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })

    test('fix definite types 2', () => {
      const targetConstObject = { foo: 'bar' } as { foo: string } | '1'
      const result = fixJSON(targetConstObject, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
    })

    test('const types', () => {
      const targetConstObject = { foo: 'bar' } as const
      const result = fixJSON(targetConstObject, { baz: 'qux' } as const)
      expectTypeOf(result).toEqualTypeOf<{ foo: 'bar' } | { baz: 'qux' }>()
    })

    test('guard definite types 3', () => {
      const targetConstObject = { foo: 'bar' } as { foo: string } | Date | unknown[] | null | (() => void) | undefined
      const result = fixJSON(targetConstObject, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string } | Date | Json[] | null>()
    })
  })

  describe('fix mixed style', () => {
    test('fix uncategorized types', () => {
      const targetConstObject = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
      const result = fixJSON(targetConstObject, { hoge: 'fuga' })
      expectTypeOf(result).toEqualTypeOf<JSON | { foo: string } | { hoge: string }>()
    })

    test('fix unknown types', () => {
      const targetUnknown = '{ "foo": "bar" }' as unknown
      const result = fixJSON(targetUnknown, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSON>()
    })
  })
})
