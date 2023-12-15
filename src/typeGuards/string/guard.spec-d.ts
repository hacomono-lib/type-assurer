import { test, describe, expectTypeOf } from 'vitest'
import { isString } from '.'

describe('isString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    if (isString(targetString)) {
      expectTypeOf(targetString).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetString).toEqualTypeOf<object>()
    }
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    if (isString(targetConstString)) {
      expectTypeOf(targetConstString).toEqualTypeOf<'string'>()
    } else {
      expectTypeOf(targetConstString).toEqualTypeOf<object>()
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    if (isString(targetConstString)) {
      expectTypeOf(targetConstString).toEqualTypeOf<`${number}`>()
    } else {
      expectTypeOf(targetConstString).toEqualTypeOf<number>()
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isString(targetUnknown)) {
      expectTypeOf(targetUnknown).toEqualTypeOf<string>()
    } else {
      expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
    }
  })
})
