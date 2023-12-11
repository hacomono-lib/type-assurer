import { test, describe, assertType } from 'vitest'
import { fallbackJsonifiable } from '.'
import type { Jsonifiable } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('fallbackJsonifiable type tests', () => {
  test('fallback definite types.', () => {
    const targetJsonifiable = { foo: 'bar' }
    const result = fallbackJsonifiable(targetJsonifiable, { baz: 'qux' })
    assertType<Equals<{ foo: string } | { baz: string }, typeof result>>(true)
  })

  test('fallback unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = fallbackJsonifiable(targetUnknown, { baz: 'qux' })
    assertType<Equals<Jsonifiable | { baz: string }, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = { foo: 'bar' } as Jsonifiable | string | number
    const result = fallbackJsonifiable(targetUnion, { baz: 'qux' })
    assertType<Equals<Jsonifiable | { baz: string }, typeof result>>(true)
  })
})
