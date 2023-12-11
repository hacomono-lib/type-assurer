/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackObject } from '.'
import { Equals } from '../../lib/test'

describe('fallbackObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = fallbackObject(targetObject, { foo: 'bar' })
    assertType<Equals<object, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = { foo: 'bar' } as { foo?: string } | '1'
    assertType<{ foo?: string } | { bar: string }>(
      fallbackObject(targetConstObject, { bar: 'bar' })
    )
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
    const result = fallbackObject(targetConstObject, { foo: 'bar' })
    assertType<Equals<{ foo?: string } | Date, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackObject(targetUnknown, { foo: 'bar' })
    assertType<Equals<Record<string, unknown>, typeof result>>(true)
  })

  test('uncorrect fallback value', () => {
    const result = fallbackObject('foo', 'bar')
    assertType<Equals<never, typeof result>>(true)
  })
})
