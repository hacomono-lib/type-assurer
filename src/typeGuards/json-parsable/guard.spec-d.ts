import { describe, expectTypeOf, test } from 'vitest'
import { isJsonParsable } from './guards'
import type { JsonParsable } from './type'

describe('guard definite types', () => {
  test('should guard as JsonParsable for JsonParsable type values.', () => {
    const target = `{ "foo": "bar" }` as object | string
    if (isJsonParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<JsonParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string | object>()
    }
  })

  test('should strictly guard as JsonParsable for Json-string value.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    if (isJsonParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<`{ "foo": "bar" }`>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })

  test('should strictly guard as JsonParsable for dynamic Json-string value.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    if (isJsonParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<DynamicJson>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })

  test('should strictly guard as JsonParsable for Branded Json-string value', () => {
    type Branded<T> = T & { __brand: 'branded' }
    type BrandedJson = Branded<`{ "foo": "bar" }`>

    const target = `{ "foo": "bar" }` as BrandedJson | { foo: string }
    if (isJsonParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<BrandedJson>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })
})

describe('guard unknown types', () => {
  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isJsonParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<JsonParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as JsonParsable when type argument is set.', () => {
    type TargetJson = `{ "foo": "bar" }`
    const target = 'string' as unknown
    if (isJsonParsable<TargetJson>(target)) {
      expectTypeOf(target).toEqualTypeOf<TargetJson>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not match "JsonParsable"', () => {
    // @ts-expect-error
    isJsonParsable<string>('string')
  })

  test('should result in TypeScript type error when the type argument is not a "JsonParsable"', () => {
    // @ts-expect-error
    isJsonParsable<number>('string')
  })
})
