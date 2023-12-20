import { describe, expectTypeOf, test } from 'vitest'
import { ensureJSON } from '.'
import type { JSONifiable } from './type'

describe('ensureJSON type tests', () => {
  test('ensure definite types.', () => {
    const target = { foo: 'bar' }
    const result = ensureJSON(target)
    expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
  })

  test('ensure unknown types', () => {
    const target = { foo: 'bar' } as unknown
    const result = ensureJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONifiable>()
  })

  test('ensure union types', () => {
    const target = { foo: 'bar' } as JSONifiable | string | number
    const result = ensureJSON(target)
    expectTypeOf(result).toEqualTypeOf<JSONifiable>()
  })
})
