
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { ensureNil, ensureNotNil } from '.'

describe('ensureNil type tests', () => {
  test('ensureNil is not definition', () => {
    assertType<never>(ensureNil)
  })
})

describe('ensureNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    assertType<string>(ensureNotNil(targetNull))
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    assertType<string>(ensureNotNil(targetUndef))
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    assertType<'string'>(ensureNotNil(targetConstString))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotNil(targetUnknown))
  })
})
