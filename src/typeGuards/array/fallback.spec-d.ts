/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expectTypeOf, test } from 'vitest'
import { fallbackArray, fallbackNotArray } from '.'

describe('fallbackArray type tests', () => {
  test('fallback definite types.', () => {
    const target = [] as string[] | string
    const result = fallbackArray(target, ['default'])
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('fallback definite types with fallback never array', () => {
    const target = [] as string[]
    const result = fallbackArray(target, [])
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })

  test('fallback definite type with unmatched fallback array', () => {
    const target = [] as string[] | string
    const result = fallbackArray(target, [0])
    expectTypeOf(result).toEqualTypeOf<string[] | number[]>()
  })

  test('fallback unknown types', () => {
    const target = 'string' as unknown
    const result = fallbackArray(target, ['default'] as unknown[])
    expectTypeOf(result).toEqualTypeOf<unknown[]>()
  })

  test('fallback unknown types with fallback never array', () => {
    const target = 'string' as unknown
    const result = fallbackArray(target, [])
    expectTypeOf(result).toEqualTypeOf<unknown[]>()
  })

  test('fallback union types', () => {
    const target = [] as string[] | number[] | string
    const result = fallbackArray(target, ['default'])
    expectTypeOf(result).toEqualTypeOf<string[] | number[]>()
  })

  test('fallback union types 2', () => {
    const target = [] as Array<string | number> | string | number
    const result = fallbackArray(target, ['default'])
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
    const target = [] as string[] | string
    const result = fallbackNotArray(target, 'default')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('fallback definite types with fallback never array', () => {
    const target = [] as string[]
    const result = fallbackNotArray(target, 'default')
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  test('fallback definite type with unmatched fallback array', () => {
    const target = [] as string[] | string
    const result = fallbackNotArray(target, 0)
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback unknown types with unknown fallback value', () => {
    const target = 'string' as unknown
    const result = fallbackNotArray(target, 'default' as unknown)
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('fallback unknown types with definite fallback value', () => {
    const target = 'string' as unknown
    const result = fallbackNotArray(target, 'default')
    expectTypeOf(result).toEqualTypeOf<unknown>()
  })

  test('fallback union types', () => {
    const target = [] as string[] | number[] | string
    const result = fallbackNotArray(target, 'default')
    expectTypeOf(result).toEqualTypeOf<string | number>()
  })

  test('fallback union types 2', () => {
    const target = [] as Array<string | number> | string | number
    const result = fallbackNotArray(target, 'default')
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
