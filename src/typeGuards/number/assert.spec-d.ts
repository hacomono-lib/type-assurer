/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { assertNumber, assertNotNumber } from '.'

describe('assertNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertNumber(targetNumber)
    assertType<number>(targetNumber)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertNumber(targetConstNumber)
    assertType<1>(targetConstNumber)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNumber(targetUnknown)
    assertType<number>(targetUnknown)
  })
})

describe('assertNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertNotNumber(targetNumber)
    assertType<string>(targetNumber)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertNotNumber(targetConstNumber)
    assertType<'1'>(targetConstNumber)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotNumber(targetUnknown)
    assertType<unknown>(targetUnknown)
  })
})
