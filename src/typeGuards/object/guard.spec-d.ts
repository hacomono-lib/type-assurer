import { test, describe, assertType } from 'vitest'
import { isObject, isNotObject } from '.'
import { Equals } from '../../lib/test'

describe('isObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isObject(targetObject)) {
      assertType<Equals<object, typeof targetObject>>(true)
    } else {
      // object type includes Array, null, but isObject checkes truthy object.
      assertType<Equals<object | string, typeof targetObject>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isObject(targetConstObject)) {
      assertType<Equals<{ foo?: string }, typeof targetConstObject>>(true)
    } else {
      assertType<Equals<'1', typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | (() => void)
      | undefined
    if (isObject(targetConstObject)) {
      assertType<Equals<{ foo?: string } | Date, typeof targetConstObject>>(true)
    } else {
      assertType<Equals<null | undefined | unknown[] | (() => void), typeof targetConstObject>>(
        true
      )
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isObject(targetUnknown)) {
      assertType<Equals<object, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})

describe('isNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isNotObject(targetObject)) {
      assertType<Equals<string | object, typeof targetObject>>(true)
    } else {
      assertType<Equals<object, typeof targetObject>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isNotObject(targetConstObject)) {
      assertType<Equals<'1', typeof targetConstObject>>(true)
    } else {
      assertType<Equals<{ foo?: string }, typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | (() => void)
      | undefined
    if (isNotObject(targetConstObject)) {
      assertType<Equals<null | undefined | unknown[] | (() => void), typeof targetConstObject>>(
        true
      )
    } else {
      assertType<Equals<{ foo?: string } | Date, typeof targetConstObject>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotObject(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<object, typeof targetUnknown>>(true)
    }
  })
})
