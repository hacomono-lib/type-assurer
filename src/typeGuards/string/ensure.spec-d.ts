import { test, describe, expectTypeOf } from 'vitest'
import { ensureString } from '.'

describe('ensureString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    const result = ensureString(targetString)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    const result = ensureString(targetConstString)
    expectTypeOf(result).toEqualTypeOf<'string'>()
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    const result = ensureString(targetConstString)
    expectTypeOf(result).toEqualTypeOf<`${number}`>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureString(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard unknown with type args', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureString<'foo'>(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<'foo'>()
  })
})
