import { test, describe, assertType } from 'vitest'
import { ensureObject } from '.'
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
    const targetConstObject = { foo: 'bar' } as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
      | typeof String
    const result = ensureObject(targetConstObject)
    assertType<Equals<{ foo?: string } | Date, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = ensureObject(targetUnknown)
    assertType<Equals<Record<string, unknown>, typeof result>>(true)
  })
})
