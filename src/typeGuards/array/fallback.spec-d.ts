/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackArray, fallbackNotArray } from '.'

describe('fallbackArray type tests', () => {
  test('fallback definite types.', () => {
    const targetArray = [] as string[] | string
    assertType<string[]>(fallbackArray(targetArray, ['default']))
  })

  test('fallback definite types with fallback never array', () => {
    const targetNever = [] as string[]
    assertType<string[]>(fallbackArray(targetNever, []))
  })

  test('fallback definite type with unmatched fallback array', () => {
    const targetArray = [] as string[] | string
    assertType<string[] | number[]>(fallbackArray(targetArray, [0]))
  })

  test('fallback unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown[]>(fallbackArray(targetUnknown, ['default'] as unknown[]))
  })

  test('fallback unknown types with fallback never array', () => {
    const targetNever = 'string' as unknown
    assertType<unknown[]>(fallbackArray(targetNever, []))
  })

  test('fallback union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertType<string[] | number[]>(fallbackArray(targetUnion, ['default']))
  })

  test('fallback union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertType<Array<string | number>>(fallbackArray(targetUnion2, ['default']))
  })

  test('fallback tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertType<[string] | [string, number]>(fallbackArray(tuple, ['default']))
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackArray(['test'], 0)
  })
})

describe('fallbackNotArray type tests', () => {
  test('fallback definite types.', () => {
    const targetArray = [] as string[] | string
    assertType<string>(fallbackNotArray(targetArray, 'default'))
  })

  test('fallback definite types with fallback never array', () => {
    const targetNever = [] as string[]
    assertType<string>(fallbackNotArray(targetNever, 'default'))
  })

  test('fallback definite type with unmatched fallback array', () => {
    const targetArray = [] as string[] | string
    assertType<string | number>(fallbackNotArray(targetArray, 0))
  })

  test('fallback unknown types with unknown fallback value', () => {
    const targetUnknown = 'string' as unknown
    assertType<unknown>(fallbackNotArray(targetUnknown, 'default' as unknown))
  })

  test('fallback unknown types with definite fallback value', () => {
    const targetNever = 'string' as unknown
    assertType<unknown>(fallbackNotArray(targetNever, 'default'))
  })

  test('fallback union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertType<string | number>(fallbackNotArray(targetUnion, 'default'))
  })

  test('fallback union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertType<string | number>(fallbackNotArray(targetUnion2, 'default'))
  })

  test('fallback tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertType<string | number>(fallbackNotArray(tuple, 'default'))
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackNotArray(3, [])
  })
})
