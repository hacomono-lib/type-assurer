/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackNil, fallbackNotNil } from '.'

describe('fallbackNil type tests', () => {
  test('fallbackNil is not definition', () => {
    assertType<never>(fallbackNil)
  })
})

describe('fallbackNotNil type tests', () => {
  test('fallbackNotNil is not definition', () => {
    assertType<never>(fallbackNotNil)
  })
})
