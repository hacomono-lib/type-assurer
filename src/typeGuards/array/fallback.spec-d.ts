/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, describe, assertType } from 'vitest'
import { fallbackArray, fallbackNotArray } from '.'
import type { Equals } from '../../lib/test'

describe('fallbackArray type tests', () => {
  test('fallback definite types.', () => {
    const targetArray = [] as string[] | string
    const result = fallbackArray(targetArray, ['default'])
    assertType<Equals<string[], typeof result>>(true)
  })

  test('fallback definite types with fallback never array', () => {
    const targetNever = [] as string[]
    const result = fallbackArray(targetNever, [])
    assertType<Equals<string[], typeof result>>(true)
  })

  test('fallback definite type with unmatched fallback array', () => {
    const targetArray = [] as string[] | string
    const result = fallbackArray(targetArray, [0])
    assertType<Equals<string[] | number[], typeof result>>(true)
  })

  test('fallback unknown types', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackArray(targetUnknown, ['default'] as unknown[])
    assertType<Equals<unknown[], typeof result>>(true)
  })

  test('fallback unknown types with fallback never array', () => {
    const targetNever = 'string' as unknown
    const result = fallbackArray(targetNever, [])
    assertType<Equals<unknown[], typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = fallbackArray(targetUnion, ['default'])
    assertType<Equals<string[] | number[], typeof result>>(true)
  })

  test('fallback union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = fallbackArray(targetUnion2, ['default'])
    assertType<Equals<Array<string | number>, typeof result>>(true)
  })

  test('fallback tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = fallbackArray(tuple, ['default'])
    assertType<Equals<[string] | [string, number], typeof result>>(true)
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
    assertType<Equals<string, typeof result>>(true)
  })

  test('fallback definite types with fallback never array', () => {
    const targetNever = [] as string[]
    const result = fallbackNotArray(targetNever, 'default')
    assertType<Equals<string, typeof result>>(true)
  })

  test('fallback definite type with unmatched fallback array', () => {
    const targetArray = [] as string[] | string
    const result = fallbackNotArray(targetArray, 0)
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('fallback unknown types with unknown fallback value', () => {
    const targetUnknown = 'string' as unknown
    const result = fallbackNotArray(targetUnknown, 'default' as unknown)
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('fallback unknown types with definite fallback value', () => {
    const targetNever = 'string' as unknown
    const result = fallbackNotArray(targetNever, 'default')
    assertType<Equals<unknown, typeof result>>(true)
  })

  test('fallback union types', () => {
    const targetUnion = [] as string[] | number[] | string
    const result = fallbackNotArray(targetUnion, 'default')
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('fallback union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    const result = fallbackNotArray(targetUnion2, 'default')
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('fallback tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    const result = fallbackNotArray(tuple, 'default')
    assertType<Equals<string | number, typeof result>>(true)
  })

  test('uncorrect fallback type', () => {
    // @ts-expect-error
    fallbackNotArray(3, [])
  })
})
