import { describe, expectTypeOf, test } from 'vitest'
import type { Empty, EmptyObject } from '../type'
import { isNotEmpty } from './guards'

describe('guard definite types', () => {
  test('should guard as not-empty for some string.', () => {
    const target = '' as string
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      // FIXME: should be `''`
      // @ts-ignore
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as not-empty for some string.', () => {
    const target = '' as 'foo' | 'bar' | ''
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<'foo' | 'bar'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<''>()
    }
  })

  test('should guard as not-empty for some array.', () => {
    const target = [] as string[]
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<string[]>()
    } else {
      // FIXME: should be `[]`
      // @ts-ignore
      expectTypeOf(target).toEqualTypeOf<string[]>()
    }
  })

  test('should strictly guard as not-empty for some array.', () => {
    const target = [] as string[] | []
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<string[]>()
    } else {
      expectTypeOf(target).toEqualTypeOf<[]>()
    }
  })

  test('should strictly guard as not-empty for some object.', () => {
    const target = {} as Record<string, string>
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<Record<string, string>>()
    } else {
      // FIXME: should be `{}`
      // @ts-ignore
      expectTypeOf(target).toEqualTypeOf<EmptyObject<Record<string, string>>>()
    }
  })

  test('should guard as not-empty for some nilable value.', () => {
    const target = null as null | undefined | string
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<null | undefined>()
    }
  })

  test('should strictly guard as not-empty for some nilable value.', () => {
    const target = null as null | undefined | 'foo' | 'bar' | ''
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<'foo' | 'bar'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'' | null | undefined>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as not-empty for unknown type value.', () => {
    const target = 'string' as unknown
    if (isNotEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    } else {
      // FIXME: should be `Empty`
      // @ts-ignore
      expectTypeOf(target).toEqualTypeOf<Empty>()
    }
  })
})
