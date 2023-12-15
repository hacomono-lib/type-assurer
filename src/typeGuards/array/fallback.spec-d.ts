/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, expectTypeOf } from 'vitest'
import { fallbackArray, fallbackNotArray } from '.'

describe('fallbackArray type tests', () => {
  test('fallback definite types.', () => {
    const targetArray = [] as string[] | string
    const result = fallbackArray(targetArray, ['default'])
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('fallback definite types with fallback never array', () => {
    const targetNever = [] as string[]
    const result = fallbackArray(targetNever, [])
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('fallback definite type with unmatched fallback array', () => {
    const targetArray = [] as string[] | string
    const result = fallbackArray(targetArray, [0])
    expectTypeOf(result).toEqualTypeOf<string[] | number[]>()
  })

  test('fallback unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackArray(targetUnknown, ['default'] as unknown[])
    expectTypeOf(result).toEqualTypeOf<unknown[]>()
  })

  test('fallback unknown types with fallback never array', () => {
    const targetNever = 'string' as unknown
    const result = fallbackArray(targetNever, [])
    expectTypeOf(result).toEqualTypeOf<unknown[]>()
  })

  test('fallback union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = fallbackArray(targetUnion, ['default'])
    expectTypeOf(result).toEqualTypeOf<string[] | number[]>()
  })

  test('fallback union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = fallbackArray(targetUnion2, ['default'])
    expectTypeOf(result).toEqualTypeOf<Array<string | number>>()
  })

  test('fallback tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = fallbackArray(tuple, ['default'])
    expectTypeOf(result).toEqualTypeOf<[string] | [string, number]>()
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackArray(['test'], 0)
  })
})

describe('fallbackNotArray type tests', () => {
  test('fallback definite types.', () => {
    const targetArray = [] as string[] | string
    const result = fallbackNotArray(targetArray, 'default')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('fallback definite types with fallback never array', () => {
    const targetNever = [] as string[]
    const result = fallbackNotArray(targetNever, 'default')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('fallback definite type with unmatched fallback array', () => {
    const targetArray = [] as string[] | string
    const result = fallbackNotArray(targetArray, 0)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback unknown types with unknown fallback value', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNotArray(targetUnknown, 'default' as unknown)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('fallback unknown types with definite fallback value', () => {
    const targetNever = 'string' as unknown
    const result = fallbackNotArray(targetNever, 'default')
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('fallback union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = fallbackNotArray(targetUnion, 'default')
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = fallbackNotArray(targetUnion2, 'default')
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = fallbackNotArray(tuple, 'default')
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackNotArray(3, [])
  })
})
