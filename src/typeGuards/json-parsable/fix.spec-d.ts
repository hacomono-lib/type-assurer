import { describe, expectTypeOf, test } from 'vitest'
import type { JsonValue } from '~/lib'
import { fixJson } from './guards'

describe('fix definite types', () => {
  test('should fix as json-object for some json-object parsable string value.', () => {
    const target = `{ "foo": "bar" }` as object | string
    const result = fixJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test('should strictly fix as json-object for some json-object parsable string literal value.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = fixJson(target, { baz: 'qux' })
    // TODO: type safe string literal type
    expectTypeOf(result).toEqualTypeOf<JsonValue | { foo: string } | { baz: string }>()
  })

  test('should fix as json-object for some json-object.', () => {
    const target = { foo: 'bar' } as object | string
    const result = fixJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test('should strictly fix as json-object for some strict json-object', () => {
    const target = { foo: 'bar' } as { foo: string } | '1'
    const result = fixJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
  })

  test('should strictly fix as json-object for some strict json-object using "as const"', () => {
    const target = { foo: 'bar' } as const
    const result = fixJson(target, { baz: 'qux' } as const)
    expectTypeOf(result).toEqualTypeOf<{ readonly foo: 'bar' } | { readonly baz: 'qux' }>()
  })

  test('should strictly fix as json-object for union type', () => {
    const target = { foo: 'bar' } as { foo: string } | Date | unknown[] | null | (() => void) | undefined
    const result = fixJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string } | Date | Json[] | null>()
  })

  test('should strictly fix as json-object for mixed values (json-object, json-object parsable string)', () => {
    const target = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
    const result = fixJson(target, { hoge: 'fuga' })
    expectTypeOf(result).toEqualTypeOf<JsonValue | { foo: string } | { hoge: string }>()
  })
})

describe('fix unknown types', () => {
  test('should fix as json-object for unknown type value.', () => {
    const target = '{ "foo": "bar" }' as unknown
    const result = fixJson(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })

  test.skip('should strictly fix as json-object when type argument is set.', () => {
    const target = '{ "foo": "bar" }' as unknown
    // FIXME: This test should pass, but it fails.
    // @ts-ignore
    const result = fixJson<{ foo: string } | { bar: string }>(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JsonValue>()
  })
})
