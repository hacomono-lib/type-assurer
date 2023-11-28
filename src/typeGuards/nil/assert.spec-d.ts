import { test, describe, assertType } from 'vitest'
import { assertNil, assertNotNil } from '.'

describe('assertNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    assertNil(targetNull)
    assertType<null>(targetNull)
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    assertNil(targetUndef)
    assertType<undefined>(targetUndef)
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as null | 'string'
    assertNil(targetConstString)
    assertType<null>(targetConstString)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNil(targetUnknown)
    assertType<null | undefined>(targetUnknown)
  })
})

describe('assertNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    assertNotNil(targetNull)
    assertType<string>(targetNull)
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    assertNotNil(targetUndef)
    assertType<string>(targetUndef)
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    assertNotNil(targetConstString)
    assertType<'string'>(targetConstString)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotNil(targetUnknown)
    assertType<unknown>(targetUnknown)
  })
})
