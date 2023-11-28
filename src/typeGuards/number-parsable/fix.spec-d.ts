import { test, describe, assertType } from 'vitest'
import { fixNumber } from '.'

describe('fixNumber type tests', () => {
  test('fix definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertType<number>(fixNumber(targetNumberParsable))
  })

  test('fix unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(fixNumber(targetUnknown))
  })

  test('fix union types', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    assertType<1 | 2>(fixNumber(targetUnion))
    assertType<1 | 2 | 3>(fixNumber(targetUnion, 3))
  })

  test('fix number string with dot', () => {
    const targetUnion = '2.1' as '2.1' | 1 | 'a' | boolean
    assertType<1 | 2.1>(fixNumber(targetUnion))
  })
})
