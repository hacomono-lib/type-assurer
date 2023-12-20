import { describe, expectTypeOf, test } from 'vitest'
import { ensureString } from '.'

describe('ensureString type tests', () => {
  test('guard definite types', () => {
    const target = 'string' as string | object
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const target = 'string' as 'string' | object
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<'string'>()
  })

  test('guard definite types 3', () => {
    const target = '3' as `${number}` | number
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<`${number}`>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    const result = ensureString(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('guard unknown with type args', () => {
    const target = 'string' as unknown
    const result = ensureString<'foo'>(target)
    expectTypeOf(result).toEqualTypeOf<'foo'>()
  })
})
