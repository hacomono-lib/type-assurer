import { describe, expectTypeOf, test } from 'vitest'
import { assertObject } from './guards'

describe('assert definite types', () => {
  test('should assert object for object type values.', () => {
    const target = {} as object | string
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<object>()
  })

  test('should strictly assert object for strict object type values.', () => {
    const target = {} as { foo?: string } | '1'
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<{ foo?: string }>()
  })

  test('should strictly assert object for union types.', () => {
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
})

describe('assert unknown types', () => {
  test('should assert object for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    assertObject(target)
    expectTypeOf(target).toEqualTypeOf<Record<string, unknown>>()
  })

  test('should strictly assert object when type argument is set.', () => {
    const target = {} as unknown
    assertObject<Record<string, string>>(target)
    expectTypeOf(target).toEqualTypeOf<Record<string, string>>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a object', () => {
    // FIXME: error not occured.
    // @ ts-expect-error
    assertObject<number>(123)
  })
})
