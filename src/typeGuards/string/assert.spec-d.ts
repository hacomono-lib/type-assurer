import { test, describe, expectTypeOf } from 'vitest'
import { assertString } from '.'

describe('assertString type tests', () => {
  test('guard definite types', () => {
    const targetString = 'string' as string | object
    assertString(targetString)
    expectTypeOf(targetString).toEqualTypeOf<string>()
  })

  test('guard definite types 2', () => {
    const targetConstString = 'string' as 'string' | object
    assertString(targetConstString)
    expectTypeOf(targetConstString).toEqualTypeOf<'string'>()
  })

  test('guard definite types 3', () => {
    const targetConstString = '3' as `${number}` | number
    assertString(targetConstString)
    expectTypeOf(targetConstString).toEqualTypeOf<`${number}`>()
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertString(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<string>()
  })
})
