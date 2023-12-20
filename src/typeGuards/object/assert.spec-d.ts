import { describe, expectTypeOf, test } from 'vitest'
import { assertObject } from '.'

describe('assertObject type tests', () => {
  test('guard definite types', () => {
    const target = {} as object | string
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<object>()
  })

  test('guard definite types 2', () => {
    const target = {} as { foo?: string } | '1'
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<{ foo?: string }>()
  })

  test('guard definite types 3', () => {
    const target = { foo: 'bar' } as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
      | typeof String
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<{ foo?: string } | Date>()
  })

  test('guard unknown types', () => {
    const target = { foo: 'bar' } as unknown
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<Record<string, unknown>>()
  })
})
