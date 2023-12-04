import { test, describe, assertType } from 'vitest'
import { assertJsonifiable, assertNotJsonifiable } from '.'
import type { Jsonifiable } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('isJsonifiable type tests', () => {
  test('assert definite types.', () => {
    const targetJsonifiable = {} as unknown
    assertJsonifiable(targetJsonifiable)
    assertType<Equals<Jsonifiable, typeof targetJsonifiable>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertJsonifiable(targetUnknown)
    assertType<Equals<Jsonifiable, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = {} as unknown as Jsonifiable | string | number
    assertJsonifiable(targetUnion)
    assertType<Equals<Jsonifiable, typeof targetUnion>>(true)
  })
})

describe('isNotJsonifiable type tests', () => {
  test('assert definite types.', () => {
    const targetJsonifiable = {} as unknown
    assertNotJsonifiable(targetJsonifiable)
    assertType<Equals<unknown, typeof targetJsonifiable>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotJsonifiable(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = {} as unknown as Jsonifiable | undefined
    assertNotJsonifiable(targetUnion)
    assertType<Equals<undefined, typeof targetUnion>>(true)
  })
})
