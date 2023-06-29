/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { isString, isNotString } from '.'

describe('isString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    if (isString(targetString)) {
      assertType<string>(targetString)
    } else {
      assertType<object>(targetString)
    }
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    if (isString(targetConstString)) {
      assertType<'string'>(targetConstString)
    } else {
      assertType<object>(targetConstString)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    if (isString(targetConstString)) {
      assertType<`${number}`>(targetConstString)
    } else {
      assertType<number>(targetConstString)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isString(targetUnknown)) {
      assertType<string>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    if (isNotString(targetString)) {
      assertType<object>(targetString)
    } else {
      assertType<string>(targetString)
    }
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    if (isNotString(targetConstString)) {
      assertType<object>(targetConstString)
    } else {
      assertType<'string'>(targetConstString)
    }
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    if (isNotString(targetConstString)) {
      assertType<number>(targetConstString)
    } else {
      assertType<`${number}`>(targetConstString)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotString(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<string>(targetUnknown)
    }
  })
})
