import { test, describe, assertType } from 'vitest'
import { assertJsonifiable } from '.'
import type { Jsonifiable } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('assertJsonifiable type tests', () => {
  test('assert definite types.', () => {
    const targetJsonifiable = { foo: 'bar' }
    assertJsonifiable(targetJsonifiable)
    assertType<Equals<{ foo: string }, typeof targetJsonifiable>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    assertJsonifiable(targetUnknown)
    assertType<Equals<Jsonifiable, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = { foo: 'bar' } as Jsonifiable | string | number
    assertJsonifiable(targetUnion)
    assertType<Equals<Jsonifiable, typeof targetUnion>>(true)
  })
})
