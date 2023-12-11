import { test, describe, assertType } from 'vitest'
import { assertArray, assertNotArray } from '.'
import type { Equals } from '../../lib/test'

describe('isArray type tests', () => {
  test('assert definite types.', () => {
    const targetArray = [] as string[] | string
    assertArray(targetArray)
    assertType<Equals<string[], typeof targetArray>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertArray(targetUnknown)
    assertType<Equals<unknown[], typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertArray(targetUnion)
    assertType<Equals<string[] | number[], typeof targetUnion>>(true)
  })

  test('assert union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertArray(targetUnion2)
    assertType<Equals<Array<string | number>, typeof targetUnion2>>(true)
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertArray(tuple)
    assertType<Equals<[string, number], typeof tuple>>(true)
  })
})

describe('isNotArray type tests', () => {
  test('assert definite types.', () => {
    const targetArray = [] as string[] | string
    assertNotArray(targetArray)
    assertType<Equals<string, typeof targetArray>>(true)
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotArray(targetUnknown)
    assertType<Equals<unknown, typeof targetUnknown>>(true)
  })

  test('assert union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertNotArray(targetUnion)
    assertType<Equals<string, typeof targetUnion>>(true)
  })

  test('assert union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertNotArray(targetUnion2)
    assertType<Equals<string | number, typeof targetUnion2>>(true)
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertNotArray(tuple)
    assertType<Equals<string | number, typeof tuple>>(true)
  })
})
