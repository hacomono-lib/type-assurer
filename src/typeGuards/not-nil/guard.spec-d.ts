import { test, describe, expectTypeOf } from 'vitest'
import { isNotNil } from '.'

describe('isNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    if (isNotNil(targetNull)) {
      expectTypeOf(targetNull).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetNull).toEqualTypeOf<null>()
    }
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    if (isNotNil(targetUndef)) {
      expectTypeOf(targetUndef).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetUndef).toEqualTypeOf<undefined>()
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    if (isNotNil(targetConstString)) {
      expectTypeOf(targetConstString).toEqualTypeOf<'string'>()
    } else {
      expectTypeOf(targetConstString).toEqualTypeOf<null>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotNil(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<{}>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
