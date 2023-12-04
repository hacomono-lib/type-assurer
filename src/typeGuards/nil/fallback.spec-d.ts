/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNil, fallbackNotNil } from '.'

describe('fallbackNil type tests', () => {
  test('fallbackNil is not definition', () => {
    assertType<Equals<never, typeof fallbackNil>>(true)
  })
})

describe('fallbackNotNil type tests', () => {
  test('fallbackNotNil is not definition', () => {
    assertType<Equals<never, typeof fallbackNotNil>>(true)
  })
})
