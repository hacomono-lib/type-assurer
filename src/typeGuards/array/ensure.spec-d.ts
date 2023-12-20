import { describe, expectTypeOf, test } from 'vitest'
import { ensureArray, ensureNotArray } from '.'

describe('ensureArray type tests', () => {
  test('ensure definite types.', () => {
    const target = [] as string[] | string
    const result = ensureArray(target)
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('ensure unknown types', () => {
    const target = 'string' as unknown
    const result = ensureArray(target)
    expectTypeOf(result).toEqualTypeOf<unknown[]>()
  })

  test('ensure union types', () => {
    const target = [] as string[] | number[] | string
    const result = ensureArray(target)
    expectTypeOf(result).toEqualTypeOf<string[] | number[]>()
  })

  test('ensure union types 2', () => {
    const target = [] as Array<string | number> | string | number
    const result = ensureArray(target)
    expectTypeOf(result).toEqualTypeOf<Array<string | number>>()
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = ensureArray(tuple)
    expectTypeOf(result).toEqualTypeOf<[string, number]>()
  })
})

describe('ensureNotArray type tests', () => {
  test('ensure definite types.', () => {
    const target = [] as string[] | string
    const result = ensureNotArray(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('ensure unknown types', () => {
    const target = 'string' as unknown
    const result = ensureNotArray(target)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('ensure union types', () => {
    const target = [] as string[] | number[] | string
    const result = ensureNotArray(target)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('ensure union types 2', () => {
    const target = [] as Array<string | number> | string | number
    const result = ensureNotArray(target)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = ensureNotArray(tuple)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })
})
