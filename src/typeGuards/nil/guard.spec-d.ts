import { test, describe, assertType } from 'vitest'
import { isNil } from '.'
import type { Equals } from '../../lib/test'

describe('isNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    if (isNil(targetNull)) {
      assertType<Equals<null, typeof targetNull>>(true)
    } else {
      assertType<Equals<string, typeof targetNull>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    if (isNil(targetUndef)) {
      assertType<Equals<undefined, typeof targetUndef>>(true)
    } else {
      assertType<Equals<string, typeof targetUndef>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    if (isNil(targetConstString)) {
      assertType<Equals<null, typeof targetConstString>>(true)
    } else {
      assertType<Equals<'string', typeof targetConstString>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNil(targetUnknown)) {
      assertType<Equals<null | undefined, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})
