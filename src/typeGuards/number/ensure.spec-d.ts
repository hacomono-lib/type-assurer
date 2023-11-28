import { test, describe, assertType } from 'vitest'
import { ensureNumber, ensureNotNumber } from '.'

describe('ensureNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<number>(ensureNumber(targetNumber))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertType<1>(ensureNumber(targetConstNumber))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(ensureNumber(targetUnknown))
  })
})

describe('ensureNotNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertType<string>(ensureNotNumber(targetNumber))
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertType<'1'>(ensureNotNumber(targetConstNumber))
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(ensureNotNumber(targetUnknown))
  })
})
