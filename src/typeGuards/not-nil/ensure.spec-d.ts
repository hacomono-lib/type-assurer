import { test, describe, assertType } from 'vitest'
import { ensureNotNil } from '.'
import type { Equals } from '../../lib/test'

describe('ensureNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = 'string' as null | string
    const result = ensureNotNil(targetNull)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetUndef = 'string' as undefined | string
    const result = ensureNotNil(targetUndef)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    const result = ensureNotNil(targetConstString)
    assertType<Equals<'string', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotNil(targetUnknown)
    assertType<Equals<{}, typeof result>>(true)
  })
})
