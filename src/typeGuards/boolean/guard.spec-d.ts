import { describe, expectTypeOf, test } from 'vitest'
import { isBoolean, isNotBoolean } from '.'

describe('isBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    if (isBoolean(target)) {
      expectTypeOf(target).toEqualTypeOf<boolean>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isBoolean(target)) {
      expectTypeOf(target).toEqualTypeOf<boolean>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('isNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const target = true as boolean | string
    if (isNotBoolean(target)) {
      expectTypeOf(target).toEqualTypeOf<string>()
    } else {
      expectTypeOf(target).toEqualTypeOf<boolean>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isNotBoolean(target)) {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(target).toEqualTypeOf<boolean>()
    }
  })
})
