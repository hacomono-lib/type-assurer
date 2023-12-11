import { test, describe, assertType } from 'vitest'
import { assertNotNil } from '.'
import type { Equals } from '../../lib/test'

describe('assertNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = 'string' as null | string
    assertNotNil(targetNull)
    assertType<Equals<string, typeof targetNull>>(true)
  })

  test('guard definite types 2', () => {
    const targetUndef = 'string' as undefined | string
    assertNotNil(targetUndef)
    assertType<Equals<string, typeof targetUndef>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    assertNotNil(targetConstString)
    assertType<Equals<'string', typeof targetConstString>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotNil(targetUnknown)
    assertType<Equals<{}, typeof targetUnknown>>(true)
  })
})
