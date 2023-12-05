import { test, describe, assertType } from 'vitest'
import { ensureNumber, ensureNotNumber } from '.'
import { Equals } from '../../lib/test'

describe('ensureNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = ensureNumber(targetNumber)
    assertType<Equals<number, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    const result = ensureNumber(targetConstNumber)
    assertType<Equals<1, typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNumber(targetUnknown)
    assertType<Equals<number, typeof result>>(true)
  })
})

describe('ensureNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    const result = ensureNotNumber(targetNumber)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    const result = ensureNotNumber(targetConstNumber)
    assertType<Equals<'1', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotNumber(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
