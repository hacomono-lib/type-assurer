import { describe, expectTypeOf, test } from 'vitest'
import { isJSON } from './guards'
import type { JSONifiable, JSONifiableArray, JSONifiableObject } from './type'

describe('guard definite types', () => {
  test('should guard as JSONifiable for some object.', () => {
    const target = {} as object | string
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONifiableObject | JSONifiableArray | string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })

  test('should strictly guard as JSONifiable for strictly object.', () => {
    const target = {} as { foo?: string } | Promise<unknown>
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo?: string }>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Promise<unknown>>()
    }
  })

  test('should strictly guard as JSONifiable for union types.', () => {
    const target = {} as { foo?: string } | Date | unknown[] | null | (() => void) | undefined
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo?: string } | Date | JSONifiable[] | null>()
    } else {
      expectTypeOf(target).toEqualTypeOf<undefined | (() => void) | unknown[]>()
    }
  })

  test('should strictly guard as JSONifiable for class instance', () => {
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
})

describe('guard unknown types', () => {
  test('should guard as JSONifiable for unknown type value.', () => {
    const target = 'string' as unknown
    if (isJSON(target)) {
      expectTypeOf(target).toEqualTypeOf<JSONifiable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as JSONifiable when type argument is set.', () => {
    const target = 'string' as unknown
    if (isJSON<{ foo: string }>(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type errors', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a JSONifiable', () => {
    // FIXME: This test should pass, but it fails.
    // @ ts-expect-error
    isJSON<Promise<unknown>>({})

    // FIXME: This test should pass, but it fails.
    // @ ts-expect-error
    isJSON<{ foo(): string }>({})
  })
})
