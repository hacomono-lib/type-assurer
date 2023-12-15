import { test, describe, expectTypeOf } from 'vitest'
import { isBoolean, isNotBoolean } from '.'

describe('isBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    if (isBoolean(targetBoolean)) {
      expectTypeOf(targetBoolean).toEqualTypeOf<boolean>()
    } else {
      expectTypeOf(targetBoolean).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isBoolean(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<boolean>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})

describe('isNotBoolean type tests', () => {
  test('guard definite types.', () => {
    const targetBoolean = true as boolean | string
    if (isNotBoolean(targetBoolean)) {
      expectTypeOf(targetBoolean).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetBoolean).toEqualTypeOf<boolean>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotBoolean(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<boolean>()
    }
  })
})
