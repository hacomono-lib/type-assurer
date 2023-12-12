import { test, describe, assertType } from 'vitest'
import { fallbackJSON } from '.'
import type { JSON } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('fallbackJSON type tests', () => {
  test('fallback definite types.', () => {
    const targetJSON = { foo: 'bar' }
    const result = fallbackJSON(targetJSON, { baz: 'qux' })
    assertType<Equals<{ foo: string } | { baz: string }, typeof result>>(true)
  })

  test('fallback unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = fallbackJSON(targetUnknown, { baz: 'qux' })
    assertType<Equals<JSON | { baz: string }, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = { foo: 'bar' } as JSON | string | number
    const result = fallbackJSON(targetUnion, { baz: 'qux' })
    assertType<Equals<JSON | { baz: string }, typeof result>>(true)
  })
})
