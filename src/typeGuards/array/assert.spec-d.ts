import { test, describe, expectTypeOf } from 'vitest'
import { assertArray, assertNotArray } from '.'

describe('isArray type tests', () => {
  test('assert definite types.', () => {
    const targetArray = [] as string[] | string
    assertArray(targetArray)
    expectTypeOf(targetArray).toEqualTypeOf<string[]>()
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertArray(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<unknown[]>()
  })

  test('assert union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertArray(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<string[] | number[]>()
  })

  test('assert union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertArray(targetUnion2)
    expectTypeOf(targetUnion2).toEqualTypeOf<Array<string | number>>()
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertArray(tuple)
    expectTypeOf(tuple).toEqualTypeOf<[string, number]>()
  })
})

describe('isNotArray type tests', () => {
  test('assert definite types.', () => {
    const targetArray = [] as string[] | string
    assertNotArray(targetArray)
    expectTypeOf(targetArray).toEqualTypeOf<string>()
  })

  test('assert unknown types', () => {
    const targetUnknown = 'string' as unknown
    assertNotArray(targetUnknown)
    expectTypeOf(targetUnknown).toEqualTypeOf<unknown>()
  })

  test('assert union types', () => {
    const targetUnion = [] as string[] | number[] | string
    assertNotArray(targetUnion)
    expectTypeOf(targetUnion).toEqualTypeOf<string>()
  })

  test('assert union types 2', () => {
    const targetUnion2 = [] as Array<string | number> | string | number
    assertNotArray(targetUnion2)
    expectTypeOf(targetUnion2).toEqualTypeOf<string | number>()
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertNotArray(tuple)
    expectTypeOf(tuple).toEqualTypeOf<string | number>()
  })
})
