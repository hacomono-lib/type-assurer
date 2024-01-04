import { describe, expectTypeOf, test } from 'vitest'
import { fallbackFunction } from '.'

describe('fallback definite types', () => {
  test('should fallback to Function for function type values.', () => {
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    const target = (() => 'foo') as Function | string
    const result = fallbackFunction(target, () => 'bar')
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(result).toEqualTypeOf<Function | (() => 'bar')>()
  })

  test('should strictly fallback to Function for strict function types.', () => {
    const target = (() => 'foo') as (() => 'foo') | '1'
    const result = fallbackFunction(target, () => 'bar')
    expectTypeOf(result).toEqualTypeOf<(() => 'foo') | (() => 'bar')>()
  })

  test('should strictly fallback to Function for class constructor', () => {
    class Target {}
    class Fallback {}

    const target = Target as typeof Target | Target
    const result = fallbackFunction(target, Fallback)
    expectTypeOf(result).toEqualTypeOf<typeof Target | typeof Fallback>()
  })
})

describe('fallback unknown types', () => {
  test('should fallback to Function for unknown type value.', () => {
    const target = 'string' as unknown
    // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
    const result = fallbackFunction(target, () => {})
    // biome-ignore lint/complexity/noBannedTypes: <explanation>
    expectTypeOf(result).toEqualTypeOf<Function>()
  })

  test('should strictly fallback to Function when type argument is set.', () => {
    const target = 'string' as unknown
    const result = fallbackFunction<typeof String>(target, String)
    expectTypeOf(result).toEqualTypeOf<typeof String>()
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is not a Function', () => {
    // @ts-expect-error
    fallbackFunction<number>(
      // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
      () => {},
      // biome-ignore lint/nursery/noEmptyBlockStatements: <explanation>
      () => {},
    )
  })

  test.skip('should result in a TypeScript type error when the argument is not a Function', () => {
    fallbackFunction(
      { foo: 'bar' },
      // // @ts-expect-error FIXME: This is a bug
      3,
    )
  })
})
