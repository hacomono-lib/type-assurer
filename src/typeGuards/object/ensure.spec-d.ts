import { describe, expectTypeOf, test } from 'vitest'
import { ensureObject } from './guards'

describe('ensure definite types', () => {
  test('should ensure object for object type values.', () => {
    const target = {} as object | string
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<object>()
  })

  test('should strictly ensure object for strict object type values.', () => {
    const target = {} as { foo?: string } | '1'
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<{ foo?: string }>()
  })

  test('should strictly ensure object for union types.', () => {
    const target = { foo: 'bar' } as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | string
      | (() => void)
      | undefined
      | typeof String
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<{ foo?: string } | Date>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure object for unknown type value.', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureObject(target)
    expectTypeOf(result).toEqualTypeOf<Record<string, unknown>>()
  })

  test('should strictly ensure object when type argument is set.', () => {
    const target = {} as unknown
    const result = ensureObject<Record<string, string>>(target)
    expectTypeOf(result).toEqualTypeOf<Record<string, string>>()
  })
})

describe('type error', () => {
  test.skip('should result in a TypeScript type error when the type argument is not a object', () => {
    // FIXME: error not occured.
    // @ ts-expect-error
    ensureObject<number>(123)
  })
})
