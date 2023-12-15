import { test, describe, expectTypeOf } from 'vitest'
import { ensureJSON } from '.'
import type { JSONifiable } from './type'

describe('ensureJSON type tests', () => {
  test('ensure definite types.', () => {
    const targetJSON = { foo: 'bar' }
    const result = ensureJSON(targetJSON)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = ensureJSON(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<JSONifiable>()
  })

  test('ensure union types', () => {
    const targetUnion = { foo: 'bar' } as JSONifiable | string | number
    const result = ensureJSON(targetUnion)
    expectTypeOf(result).toEqualTypeOf<JSONifiable>()
  })
})
