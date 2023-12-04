import { test, describe, assertType } from 'vitest'
import { ensureObject, ensureNotObject } from '.'
import { Equals } from '../../lib/test'

describe('ensureObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = ensureObject(targetObject)
    assertType<Equals<object, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    const result = ensureObject(targetConstObject)
    assertType<Equals<{ foo?: string }, typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    const result = ensureObject(targetConstObject)
    assertType<Equals<{ foo?: string } | Date, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureObject(targetUnknown)
    assertType<Equals<object, typeof result>>(true)
  })
})

describe('ensureNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = ensureNotObject(targetObject)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    const result = ensureNotObject(targetConstObject)
    assertType<Equals<'1', typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    const result = ensureNotObject(targetConstObject)
    assertType<Equals<unknown[], typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotObject(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
