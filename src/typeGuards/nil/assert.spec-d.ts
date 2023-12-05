import { test, describe, assertType } from 'vitest'
import { assertNil, assertNotNil } from '.'
import { Equals } from '../../lib/test'

describe('assertNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    assertNil(targetNull)
    assertType<Equals<null, typeof targetNull>>(true)
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    assertNil(targetUndef)
    assertType<Equals<undefined, typeof targetUndef>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    assertNil(targetConstString)
    assertType<Equals<null, typeof targetConstString>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNil(targetUnknown)
    assertType<Equals<null | undefined, typeof targetUnknown>>(true)
  })
})

describe('assertNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    assertNotNil(targetNull)
    assertType<Equals<string, typeof targetNull>>(true)
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
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
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })
})
