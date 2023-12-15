import { test, describe, expectTypeOf } from 'vitest'
import { fallbackJSON } from '.'
import type { JSONifiable } from './type'

describe('fallbackJSON type tests', () => {
  test('fallback definite types.', () => {
    const targetJSON = { foo: 'bar' }
    const result = fallbackJSON(targetJSON, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
  })

  test('fallback unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = fallbackJSON(targetUnknown, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })

  test('fallback union types', () => {
    const targetUnion = { foo: 'bar' } as JSONifiable | string | number
    const result = fallbackJSON(targetUnion, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })
})
