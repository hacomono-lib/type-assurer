import { test, describe, expectTypeOf } from 'vitest'
import { assertObject } from '.'

describe('assertObject type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    assertObject(targetObject)
    expectTypeOf(targetObject).toEqualTypeOf<object>()
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    assertObject(targetConstObject)
    expectTypeOf(targetConstObject).toEqualTypeOf<{ foo?: string }>()
  })

  test('guard definite types 3', () => {
    const targetConstObject = { foo: 'bar' } as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
      | typeof String
    assertObject(targetConstObject)
    expectTypeOf(targetConstObject).toEqualTypeOf<{ foo?: string } | Date>()
  })

  test('guard unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    assertObject(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<Record<string, unknown>>()
  })
})
