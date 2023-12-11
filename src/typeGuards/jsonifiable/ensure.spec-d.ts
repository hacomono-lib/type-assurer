import { test, describe, assertType } from 'vitest'
import { ensureJsonifiable } from '.'
import type { Jsonifiable } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('ensureJsonifiable type tests', () => {
  test('ensure definite types.', () => {
    const targetJsonifiable = { foo: 'bar' }
    const result = ensureJsonifiable(targetJsonifiable)
    assertType<Equals<{ foo: string }, typeof result>>(true)
  })

  test('ensure unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    const result = ensureJsonifiable(targetUnknown)
    assertType<Equals<Jsonifiable, typeof result>>(true)
  })

  test('ensure union types', () => {
    const targetUnion = { foo: 'bar' } as Jsonifiable | string | number
    const result = ensureJsonifiable(targetUnion)
    assertType<Equals<Jsonifiable, typeof result>>(true)
  })
})
