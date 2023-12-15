import { test, describe, expectTypeOf } from 'vitest'
import { assertJSON } from '.'
import type { JSONifiable } from './type'

describe('assertJSON type tests', () => {
  test('assert definite types.', () => {
    const targetJSON = { foo: 'bar' }
    assertJSON(targetJSON)
    expectTypeOf(targetJSON).toEqualTypeOf<{ foo: string }>()
  })

  test('assert unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    assertJSON(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<JSONifiable>()
  })

  test('assert union types', () => {
    const targetUnion = { foo: 'bar' } as JSONifiable | string | number
    assertJSON(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<JSONifiable>()
  })
})
