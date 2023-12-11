import { test, describe, assertType } from 'vitest'
import { isNotNil } from '.'
import type { Equals } from '../../lib/test'

describe('isNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    if (isNotNil(targetNull)) {
      assertType<Equals<string, typeof targetNull>>(true)
    } else {
      assertType<Equals<null, typeof targetNull>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    if (isNotNil(targetUndef)) {
      assertType<Equals<string, typeof targetUndef>>(true)
    } else {
      assertType<Equals<undefined, typeof targetUndef>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    if (isNotNil(targetConstString)) {
      assertType<Equals<'string', typeof targetConstString>>(true)
    } else {
      assertType<Equals<null, typeof targetConstString>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotNil(targetUnknown)) {
      assertType<Equals<{}, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})
