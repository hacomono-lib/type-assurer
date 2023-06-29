/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { isNumber, isNotNumber } from '.'

describe('isNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    if (isNumber(targetNumber)) {
      assertType<number>(targetNumber)
    } else {
      assertType<string>(targetNumber)
    }
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    if (isNumber(targetConstNumber)) {
      assertType<1>(targetConstNumber)
    } else {
      assertType<'1'>(targetConstNumber)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNumber(targetUnknown)) {
      assertType<number>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    if (isNotNumber(targetNumber)) {
      assertType<string>(targetNumber)
    } else {
      assertType<number>(targetNumber)
    }
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    if (isNotNumber(targetConstNumber)) {
      assertType<'1'>(targetConstNumber)
    } else {
      assertType<1>(targetConstNumber)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotNumber(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<number>(targetUnknown)
    }
  })
})
