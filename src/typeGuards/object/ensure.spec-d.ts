
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { ensureObject, ensureNotObject } from '.'

describe('ensureObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertType<object>(ensureObject(targetObject))
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertType<{ foo?: string }>(ensureObject(targetConstObject))
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertType<{ foo?: string } | Date | unknown[]>(ensureObject(targetConstObject))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<object>(ensureObject(targetUnknown))
  })
})

describe('ensureNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertType<string>(ensureNotObject(targetObject))
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertType<'1'>(ensureNotObject(targetConstObject))
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertType<never>(ensureNotObject(targetConstObject))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotObject(targetUnknown))
  })
})
