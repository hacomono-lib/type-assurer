import { test, describe, assertType } from 'vitest'
import { assertJSON } from '.'
import type { JSON } from './type'
import type { Equals } from '../../lib/test/type-assert'

describe('assertJSON type tests', () => {
  test('assert definite types.', () => {
    const targetJSON = { foo: 'bar' }
    assertJSON(targetJSON)
    assertType<Equals<{ foo: string }, typeof targetJSON>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = { foo: 'bar' } as unknown
    assertJSON(targetUnknown)
    assertType<Equals<JSON, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = { foo: 'bar' } as JSON | string | number
    assertJSON(targetUnion)
    assertType<Equals<JSON, typeof targetUnion>>(true)
  })
})
