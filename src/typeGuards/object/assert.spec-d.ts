import { test, describe, assertType } from 'vitest'
import { assertObject } from '.'
import { Equals } from '../../lib/test'

describe('assertObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertObject(targetObject)
    assertType<Equals<object, typeof targetObject>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertObject(targetConstObject)
    assertType<Equals<{ foo?: string }, typeof targetConstObject>>(true)
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
    assertObject(targetConstObject)
    assertType<Equals<{ foo?: string } | Date, typeof targetConstObject>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    assertObject(targetUnknown)
    assertType<Equals<Record<string, unknown>, typeof targetUnknown>>(true)
  })
})
