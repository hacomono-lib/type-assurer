import { test, describe, assertType } from 'vitest'
import { ensureJSON } from '.'
import type { JSON } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('ensureJSON type tests', () => {
  test('ensure definite types.', () => {
    const targetJSON = { foo: 'bar' }
    const result = ensureJSON(targetJSON)
    assertType<Equals<{ foo: string }, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = ensureJSON(targetUnknown)
    assertType<Equals<JSON, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = { foo: 'bar' } as JSON | string | number
    const result = ensureJSON(targetUnion)
    assertType<Equals<JSON, typeof result>>(true)
  })
})
