import { test, describe, assertType } from 'vitest'
import { assertNumber } from '.'
import type { Equals } from '../../lib/test'

describe('assertNumber type tests', () => {
  test('guard definite types', () => {
    const targetNumber = 1 as number | string
    assertNumber(targetNumber)
    assertType<Equals<number, typeof targetNumber>>(true)
  })

  test('guard definite types 2', () => {
    const targetConstNumber = 1 as 1 | '1'
    assertNumber(targetConstNumber)
    assertType<Equals<1, typeof targetConstNumber>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 123 as unknown
    assertNumber(targetUnknown)
    assertType<Equals<number, typeof targetUnknown>>(true)
  })
})
