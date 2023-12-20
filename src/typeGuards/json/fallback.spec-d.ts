import { describe, expectTypeOf, test } from 'vitest'
import { fallbackJSON } from '.'
import type { JSONifiable } from './type'

describe('fallbackJSON type tests', () => {
  test('fallback definite types.', () => {
    const target = { foo: 'bar' }
    const result = fallbackJSON(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<{ foo: string } | { baz: string }>()
  })

  test('fallback unknown types', () => {
    const target = { foo: 'bar' } as unknown
    const result = fallbackJSON(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })

  test('fallback union types', () => {
    const target = { foo: 'bar' } as JSONifiable | string | number
    const result = fallbackJSON(target, { baz: 'qux' })
    expectTypeOf(result).toEqualTypeOf<JSONifiable | { baz: string }>()
  })
})
