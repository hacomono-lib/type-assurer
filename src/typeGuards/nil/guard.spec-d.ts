import { test, describe, expectTypeOf } from 'vitest'
import { isNil } from '.'

describe('isNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    if (isNil(targetNull)) {
      expectTypeOf(targetNull).toEqualTypeOf<null>()
    } else {
      expectTypeOf(targetNull).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    if (isNil(targetUndef)) {
      expectTypeOf(targetUndef).toEqualTypeOf<undefined>()
    } else {
      expectTypeOf(targetUndef).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    if (isNil(targetConstString)) {
      expectTypeOf(targetConstString).toEqualTypeOf<null>()
    } else {
      expectTypeOf(targetConstString).toEqualTypeOf<'string'>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNil(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<null | undefined>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
