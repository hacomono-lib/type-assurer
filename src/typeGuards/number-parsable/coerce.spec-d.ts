import { test, describe, assertType } from 'vitest'
import { coerceNumber } from '.'

describe('coerceNumber type tests', () => {
  test('coerce definite types.', () => {
    const targetNumberParsable = '1' as string | number
    assertType<number>(coerceNumber(targetNumberParsable))
  })

  test('coerce unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<number>(coerceNumber(targetUnknown))
  })

  test('coerce union types', () => {
    const targetUnion = '2' as '2' | 1 | 'a' | boolean
    assertType<1 | 2>(coerceNumber(targetUnion))
  })

  test('coerce number string with dot', () => {
    const targetUnion = '2.1' as '2.1' | 1 | 'a' | boolean
    assertType<1 | 2.1>(coerceNumber(targetUnion))
  })
})
