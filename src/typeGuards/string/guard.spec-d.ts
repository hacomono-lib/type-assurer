import { test, describe, assertType } from 'vitest'
import { isString } from '.'
import { Equals } from '../../lib/test'

describe('isString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    if (isString(targetString)) {
      assertType<Equals<string, typeof targetString>>(true)
    } else {
      assertType<Equals<object, typeof targetString>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    if (isString(targetConstString)) {
      assertType<Equals<'string', typeof targetConstString>>(true)
    } else {
      assertType<Equals<object, typeof targetConstString>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    if (isString(targetConstString)) {
      assertType<Equals<`${number}`, typeof targetConstString>>(true)
    } else {
      assertType<Equals<number, typeof targetConstString>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isString(targetUnknown)) {
      assertType<Equals<string, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})
