import { test, describe, assertType } from 'vitest'
import { isNumber, isNotNumber } from '.'

describe('isNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    if (isNumber(targetNumber)) {
      assertType<Equals<number, typeof targetNumber>>(true)
    } else {
      assertType<Equals<string, typeof targetNumber>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    if (isNumber(targetConstNumber)) {
      assertType<Equals<1, typeof targetConstNumber>>(true)
    } else {
      assertType<Equals<'1', typeof targetConstNumber>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNumber(targetUnknown)) {
      assertType<Equals<number, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})

describe('isNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    if (isNotNumber(targetNumber)) {
      assertType<Equals<string, typeof targetNumber>>(true)
    } else {
      assertType<Equals<number, typeof targetNumber>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    if (isNotNumber(targetConstNumber)) {
      assertType<Equals<'1', typeof targetConstNumber>>(true)
    } else {
      assertType<Equals<1, typeof targetConstNumber>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotNumber(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<number, typeof targetUnknown>>(true)
    }
  })
})
