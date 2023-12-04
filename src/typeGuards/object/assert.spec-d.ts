import { test, describe, assertType } from 'vitest'
import { assertObject, assertNotObject } from '.'

describe('assertObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertObject(targetObject)
    assertType<object>(targetObject)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertObject(targetConstObject)
    assertType<{ foo?: string }>(targetConstObject)
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertObject(targetConstObject)
    assertType<{ foo?: string } | Date>(targetConstObject)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertObject(targetUnknown)
    assertType<object>(targetUnknown)
  })
})

describe('assertNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertNotObject(targetObject)
    assertType<string>(targetObject)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertNotObject(targetConstObject)
    assertType<'1'>(targetConstObject)
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertNotObject(targetConstObject)
    assertType<unknown[]>(targetConstObject)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotObject(targetUnknown)
    assertType<unknown>(targetUnknown)
  })
})
