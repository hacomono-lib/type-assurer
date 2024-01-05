import { describe, expectTypeOf, test } from 'vitest'
import { type JSONParsable, isJSONParsable } from './guards'

describe('guard definite types', () => {
  test('should guard as JSONParsable for JSONParsable type values.', () => {
    const target = `{ "foo": "bar" }` as object | string
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string | object>()
    }
  })

  test('should strictly guard as JSONParsable for JSON-string value.', () => {
    const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<`{ "foo": "bar" }`>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })

  test('should strictly guard as JSONParsable for dynamic JSON-string value.', () => {
    type DynamicJson = `{ "foo": "${string}" }`
    const target = `{ "foo": "bar" }` as DynamicJson | { foo: string }
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<DynamicJson>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })

  test('should strictly guard as JSONParsable for Branded JSON-string value', () => {
    type Branded<T> = T & { __brand: 'branded' }
    type BrandedJson = Branded<`{ "foo": "bar" }`>

    const target = `{ "foo": "bar" }` as BrandedJson | { foo: string }
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<BrandedJson>()
    } else {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    }
  })
})

describe('guard unknown types', () => {
  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isJSONParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as JSONParsable when type argument is set.', () => {
    type TargetJson = `{ "foo": "bar" }`
    const target = 'string' as unknown
    if (isJSONParsable<TargetJson>(target)) {
      expectTypeOf(target).toEqualTypeOf<TargetJson>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test('should result in TypeScript type error when the type argument is not match "JSONParsable"', () => {
    // @ts-expect-error
    isJSONParsable<string>('string')
  })

  test('should result in TypeScript type error when the type argument is not a "JSONParsable"', () => {
    // @ts-expect-error
    isJSONParsable<number>('string')
  })
})
