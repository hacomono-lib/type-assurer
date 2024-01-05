import { describe, expectTypeOf, test } from 'vitest'
import { ensureNotNil } from './guards'

describe('ensure definite types', () => {
  test('should ensure as not nil for some values with null.', () => {
    const target = 'string' as null | string
    const result = ensureNotNil(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('should ensure as not nil for some values wiht undefined.', () => {
    const target = 'string' as undefined | string
    const result = ensureNotNil(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as not nil for unknown type value.', () => {
    const target = 'string' as unknown
    const result = ensureNotNil(target)
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(result).toEqualTypeOf<{}>()
  })

  test.skip('should strictly ensure as not nil when type argument is set.', () => {
    const target = 'string' as unknown
    // FIXME: ensureNotNil argument type should not inferred.
    // @ts-ignore
    const result = ensureNotNil<string>(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })
})

describe('type error', () => {
  test.skip('should result in TypeScript type error when the type argument is not a "non-nil"', () => {
    // FIXME: should type error
    ensureNotNil<null>('string')
    // FIXME: should type error
    ensureNotNil<undefined>('string')
  })
})
