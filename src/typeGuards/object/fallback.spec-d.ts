/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackObject, fallbackNotObject } from '.'

describe('fallbackObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertType<object>(fallbackObject(targetObject, { foo: 'bar' }))
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertType<{ foo?: string } | { bar: string }>(
      fallbackObject(targetConstObject, { bar: 'bar' })
    )
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertType<{ foo?: string } | Date>(fallbackObject(targetConstObject, { foo: 'bar' }))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<{ foo: string }>(fallbackObject(targetUnknown, { foo: 'bar' }))
  })

  test('uncorrect fallback value', () => {
    assertType<never>(fallbackObject('foo', 'bar'))
  })
})

describe('fallbackNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertType<string>(fallbackNotObject(targetObject, 'bar'))
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertType<'1' | 'bar'>(fallbackNotObject(targetConstObject, 'bar'))
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertType<'bar' | unknown[]>(fallbackNotObject(targetConstObject, 'bar'))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(fallbackNotObject(targetUnknown, 'bar'))
  })

  test('uncorrect fallback value', () => {
    assertType<never>(fallbackNotObject({}, { foo: 'bar' }))
  })
})
