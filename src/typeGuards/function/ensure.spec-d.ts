import { describe, expectTypeOf, test } from 'vitest'
import { ensureFunction } from './guards'

describe('ensure definite types', () => {
  test('should ensure as Function for function type values.', () => {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    const target = (() => {}) as Function | string
    const result = ensureFunction(target)
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(result).toEqualTypeOf<Function>()
  })

  test('should strictly ensure as Function for strict function types.', () => {
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    const target = (() => {}) as (() => void) | '1'
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<() => void>()
  })

  test('should strictly ensure as Function for class constructor', () => {
    class Target {}

    const target = Target as typeof Target | Target
    const result = ensureFunction(target)
    expectTypeOf(result).toEqualTypeOf<typeof Target>()
  })
})

describe('ensure unknown types', () => {
  test('should ensure as Function for unknown type value.', () => {
    const target = 'string' as unknown
    const result = ensureFunction(target)
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(result).toEqualTypeOf<Function>()
  })

  test('should strictly ensure as Function when type argument is set.', () => {
    const target = 'string' as unknown
    const result = ensureFunction<typeof String>(target)
    expectTypeOf(result).toEqualTypeOf<typeof String>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a Function', () => {
    ensureFunction<// // @ts-expect-error FIXME: This is a bug
    number>(
      // @ts-ignore FIXME: This is a bug
      // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
      () => {},
    )
  })
})
