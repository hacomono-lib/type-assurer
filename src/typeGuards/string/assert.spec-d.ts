import { describe, expectTypeOf, test } from 'vitest'
import { assertString } from '.'

describe('assertString type tests', () => {
  test('guard definite types', () => {
    const target = 'string' as string | object
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const target = 'string' as 'string' | object
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<'string'>()
  })

  test('guard definite types 3', () => {
    const target = '3' as `${number}` | number
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<`${number}`>()
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    assertString(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })
})
