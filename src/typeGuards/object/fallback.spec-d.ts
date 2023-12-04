/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackObject, fallbackNotObject } from '.'
import { Equals } from '../../lib/test'

describe('fallbackObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = fallbackObject(targetObject, { foo: 'bar' })
    assertType<Equals<object, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertType<{ foo?: string } | { bar: string }>(
      fallbackObject(targetConstObject, { bar: 'bar' })
    )
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    const result = fallbackObject(targetConstObject, { foo: 'bar' })
    assertType<Equals<{ foo?: string } | Date, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackObject(targetUnknown, { foo: 'bar' })
    assertType<Equals<{ foo: string }, typeof result>>(true)
  })

  test('uncorrect fallback value', () => {
    assertType<never>(fallbackObject('foo', 'bar'))
  })
})

describe('fallbackNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    const result = fallbackNotObject(targetObject, 'bar')
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    const result = fallbackNotObject(targetConstObject, 'bar')
    assertType<Equals<'1' | 'bar', typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    const result = fallbackNotObject(targetConstObject, 'bar')
    assertType<Equals<'bar' | unknown[], typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNotObject(targetUnknown, 'bar')
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('uncorrect fallback value', () => {
    assertType<never>(fallbackNotObject({}, { foo: 'bar' }))
  })
})
