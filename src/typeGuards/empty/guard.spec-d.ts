import { describe, expectTypeOf, test } from 'vitest'
import { isEmpty } from './guards'
import type { Empty, EmptyArray, EmptyObject, } from './type'

describe('guard definite types', () => {
  test('should strictly guard as empty for some string.', () => {
    const target = '' as string
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<''>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as empty for some array.', () => {
    const target = [] as string[]
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<EmptyArray<string[]>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string[]>()
    }
  })

  test('should strictly guard as empty for some object.', () => {
    const target = {} as Record<string, string>
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<EmptyObject<Record<string, string>>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Record<string, string>>()
    }
  })

  test('should strictly guard as empty for some nilable value.', () => {
    const target = null as null | undefined | string
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<null | undefined | ''>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as empty for unknown type value.', () => {
    const target = 'string' as unknown
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<Empty>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
