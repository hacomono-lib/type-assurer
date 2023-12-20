import { describe, expectTypeOf, test } from 'vitest'
import { assertJSON } from '.'
import type { JSONifiable } from './type'

describe('assertJSON type tests', () => {
  test('assert definite types.', () => {
    const target = { foo: 'bar' }
    assertJSON(target)
    expectTypeOf(target).toEqualTypeOf<{ foo: string }>()
  })

  test('assert unknown types', () => {
    const target = { foo: 'bar' } as unknown
    assertJSON(target)
    expectTypeOf(target).toEqualTypeOf<JSONifiable>()
  })

  test('assert union types', () => {
    const target = { foo: 'bar' } as JSONifiable | string | number
    assertJSON(target)
    expectTypeOf(target).toEqualTypeOf<JSONifiable>()
  })
})
