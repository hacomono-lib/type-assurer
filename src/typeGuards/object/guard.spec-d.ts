import { describe, expectTypeOf, test } from 'vitest'
import { isObject } from './guards'

describe('guard definite types', () => {
  test('should guard as object for object type values.', () => {
    const target = {} as object | string
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<object>()
    } else {
      // object type includes Array, null, but isObject checkes truthy object.
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as object for strict object type values.', () => {
    const target = {} as { foo?: string } | '1'
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo?: string }>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'1'>()
    }
  })

  test('should strictly guard as object for union types.', () => {
    const target = { foo: 'bar' } as
      | { foo: string }
      | Date
      | typeof String
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<{ foo: string } | Date>()
    } else {
      expectTypeOf(target).toEqualTypeOf<null | undefined | unknown[] | string | (() => void) | typeof String>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as object for unknown type value.', () => {
    const target = 'string' as unknown
    if (isObject(target)) {
      expectTypeOf(target).toEqualTypeOf<Record<string, unknown>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as object when type argument is set.', () => {
    const target = {} as unknown
    if (isObject<Record<string, string>>(target)) {
      expectTypeOf(target).toEqualTypeOf<Record<string, string>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type errors', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a object', () => {
    // FIXME: error not occured.
    // @ ts-expect-error
    isObject<3>(123)
  })
})
