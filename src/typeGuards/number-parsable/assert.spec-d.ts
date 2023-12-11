import { test, describe, assertType } from 'vitest'
import { assertNumberParsable, type NumberParsable } from '.'
import type { Equals } from '../../lib/test'

describe('assertNumberParsable type tests', () => {
  test('assert definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertNumberParsable(targetNumberParsable)
    assertType<Equals<NumberParsable, typeof targetNumberParsable>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = '3' as unknown
    assertNumberParsable(targetUnknown)
    assertType<Equals<NumberParsable, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = '1' as '1' | 1 | 'a' | boolean
    assertNumberParsable(targetUnion)
    assertType<Equals<1 | '1', typeof targetUnion>>(true)
  })
})
