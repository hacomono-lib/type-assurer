import { describe, expectTypeOf, test } from 'vitest'
import { isNil } from '.'

describe('isNil type tests', () => {
  test('guard definite types', () => {
    const target = null as null | string
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<null>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const target = undefined as undefined | string
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<undefined>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 3', () => {
    const target = 'string' as null | 'string'
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<null>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'string'>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNil(target)) {
      expectTypeOf(target).toEqualTypeOf<null | undefined>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
