import { test, describe, assertType } from 'vitest'
import { assertObject, assertNotObject } from '.'
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
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertObject(targetConstObject)
    assertType<Equals<{ foo?: string } | Date, typeof targetConstObject>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertObject(targetUnknown)
    assertType<Equals<object, typeof targetUnknown>>(true)
  })
})

describe('assertNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertNotObject(targetObject)
    assertType<Equals<string, typeof targetObject>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertNotObject(targetConstObject)
    assertType<Equals<'1', typeof targetConstObject>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as { foo?: string } | Date | unknown[]
    assertNotObject(targetConstObject)
    assertType<Equals<unknown[], typeof targetConstObject>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotObject(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })
})
