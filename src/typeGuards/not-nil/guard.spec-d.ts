import { describe, expectTypeOf, test } from 'vitest'
import { isNotNil } from '.'

describe('isNotNil type tests', () => {
  test('guard definite types', () => {
    const target = null as null | string
    if (isNotNil(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<null>()
    }
  })

  test('guard definite types 2', () => {
    const target = undefined as undefined | string
    if (isNotNil(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<undefined>()
    }
  })

  test('guard definite types 3', () => {
    const target = 'string' as null | 'string'
    if (isNotNil(target)) {
      expectTypeOf(target).toEqualTypeOf<'string'>()
    } else {
      expectTypeOf(target).toEqualTypeOf<null>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNotNil(target)) {
      expectTypeOf(target).toEqualTypeOf<{}>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
