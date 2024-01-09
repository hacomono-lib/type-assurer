import { describe, expectTypeOf, test } from 'vitest'
import { fallbackJsonParsable } from './guards'
import type { JsonParsable } from './type'

describe('fallback definite types', () => {
  test('should fallback to JsonParsable for string type values.', () => {
    const target = `{ "foo": "bar" }` as string | object
    const result = fallbackJsonParsable(target, `{ "baz": "qux" }`)
    expectTypeOf(result).toEqualTypeOf<JsonParsable>()
  })

  test('should fallback to JsonParsable for string literal types.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    const result = fallbackJsonParsable(target, `{ "baz": "qux" }`)

    expectTypeOf(result).toEqualTypeOf<`{ "foo": "bar" }` | `{ "baz": "qux" }`>()
  })

  test('should fallback to JsonParsable for dynamic string literal types.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    const result = fallbackJsonParsable(target, `{ "foo": "baz" }`)

    expectTypeOf(result).toEqualTypeOf<DynamicJson>()
  })

  test('should fallback to JsonParsable for Branded string type', () => {
    type Branded<T> = T & { __brand: 'branded' }
    type BrandedTarget = Branded<`{ "foo": "bar" }`>
    const target = `{ "foo": "bar" }` as BrandedTarget | object
    const result = fallbackJsonParsable(target, `{ "baz": "qux" }`)

    expectTypeOf(result).toEqualTypeOf<BrandedTarget | `{ "baz": "qux" }`>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback to JsonParsable for unknown type value.', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = fallbackJsonParsable(target, `{ "baz": "qux" }`)
    expectTypeOf(result).toEqualTypeOf<JsonParsable>()
  })

  test('should fallback to JsonParsable when type argument is set.', () => {
    const target = `{ "foo": "bar" }` as unknown
    const result = fallbackJsonParsable<`{ "foo": "${string}" }`>(target, `{ "foo": "baz" }`)
    expectTypeOf(result).toEqualTypeOf<`{ "foo": "${string}" }`>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a string', () => {
    // @ts-expect-error
    fallbackJsonParsable<number>(`{ "foo": "bar" }`, `{ "foo": "baz" }`)
  })
})
