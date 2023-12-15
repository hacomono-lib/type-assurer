import { test, describe, expectTypeOf } from 'vitest'
import { ensureArray, ensureNotArray } from '.'

describe('ensureArray type tests', () => {
  test('ensure definite types.', () => {
    const targetArray = [] as string[] | string
    const result = ensureArray(targetArray)
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureArray(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<unknown[]>()
  })

  test('ensure union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = ensureArray(targetUnion)
    expectTypeOf(result).toEqualTypeOf<string[] | number[]>()
  })

  test('ensure union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = ensureArray(targetUnion2)
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
    const targetArray = [] as string[] | string
    const result = ensureNotArray(targetArray)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('ensure unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = ensureNotArray(targetUnknown)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('ensure union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = ensureNotArray(targetUnion)
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('ensure union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = ensureNotArray(targetUnion2)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('ensure tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = ensureNotArray(tuple)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })
})
