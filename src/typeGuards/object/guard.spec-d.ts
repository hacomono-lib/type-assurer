/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { isObject, isNotObject } from '.'

describe('isObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isObject(targetObject)) {
      assertType<object>(targetObject)
    } else {
      assertType<string>(targetObject)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isObject(targetConstObject)) {
      assertType<{ foo?: string }>(targetConstObject)
    } else {
      assertType<'1'>(targetConstObject)
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
      assertType<{ foo?: string } | Date | unknown[] | (() => void)>(targetConstObject)
    } else {
      assertType<null | undefined>(targetConstObject)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isObject(targetUnknown)) {
      assertType<object>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isNotObject(targetObject)) {
      assertType<string>(targetObject)
    } else {
      assertType<object>(targetObject)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isNotObject(targetConstObject)) {
      assertType<'1'>(targetConstObject)
    } else {
      assertType<{ foo?: string }>(targetConstObject)
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
      assertType<null | undefined>(targetConstObject)
    } else {
      assertType<{ foo?: string } | Date | unknown[] | (() => void)>(targetConstObject)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotObject(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<object>(targetUnknown)
    }
  })
})
