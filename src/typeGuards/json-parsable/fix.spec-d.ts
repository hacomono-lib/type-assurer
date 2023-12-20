import { describe, expectTypeOf, test } from 'vitest'
import { fixJSON } from '.'
import type { JSONValue } from '../../lib'

describe('fixJson type tests', () => {
  describe('fix json-parsable to json', () => {
    test('fix definite types', () => {
      const target = `{ "foo": "bar" }` as object | string
      const result = fixJSON(target, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSONValue>()
    })

    test('fix definite types 2', () => {
      const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
      const result = fixJSON(target, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSONValue | { baz: string }>()
    })
  })

  describe('fix json-like to json', () => {
    test('fix definite types', () => {
      const target = { foo: 'bar' } as object | string
      const result = fixJSON(target, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSONValue>()
    })

    test('fix definite types 2', () => {
      const target = { foo: 'bar' } as { foo: string } | '1'
      const result = fixJSON(target, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
    })

    test('const types', () => {
      const target = { foo: 'bar' } as const
      const result = fixJSON(target, { baz: 'qux' } as const)
      expectTypeOf(result).toEqualTypeOf<{ foo: 'bar' } | { baz: 'qux' }>()
    })

    test('guard definite types 3', () => {
      const target = { foo: 'bar' } as { foo: string } | Date | unknown[] | null | (() => void) | undefined
      const result = fixJSON(target, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string } | Date | Json[] | null>()
    })
  })

  describe('fix mixed style', () => {
    test('fix uncategorized types', () => {
      const target = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
      const result = fixJSON(target, { hoge: 'fuga' })
      expectTypeOf(result).toEqualTypeOf<JSONValue | { foo: string } | { hoge: string }>()
    })

    test('fix unknown types', () => {
      const target = '{ "foo": "bar" }' as unknown
      const result = fixJSON(target, { baz: 'qux' })
      expectTypeOf(result).toEqualTypeOf<JSONValue>()
    })
  })
})
