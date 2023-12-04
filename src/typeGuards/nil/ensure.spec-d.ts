import { test, describe, assertType } from 'vitest'
import { ensureNil, ensureNotNil } from '.'

describe('ensureNil type tests', () => {
  test('ensureNil is not definition', () => {
    assertType<Equals<never, typeof ensureNil>>(true)
  })
})

describe('ensureNotNil type tests', () => {
  test('guard definite types', () => {
    const targetNull = null as null | string
    const result = ensureNotNil(targetNull)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 2', () => {
    const targetUndef = undefined as undefined | string
    const result = ensureNotNil(targetUndef)
    assertType<Equals<string, typeof result>>(true)
  })

  test('guard definite types 3', () => {
    const targetConstString = 'string' as 'string' | null
    const result = ensureNotNil(targetConstString)
    assertType<Equals<'string', typeof result>>(true)
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotNil(targetUnknown)
    assertType<Equals<unknown, typeof result>>(true)
  })
})
