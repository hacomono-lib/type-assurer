import { describe, expectTypeOf, test } from 'vitest'
import { assertArray, assertNotArray } from '.'

describe('isArray type tests', () => {
  test('assert definite types.', () => {
    const target = [] as string[] | string
    assertArray(target)
    expectTypeOf(target).toEqualTypeOf<string[]>()
  })

  test('assert unknown types', () => {
    const target = 'string' as unknown
    assertArray(target)
    expectTypeOf(target).toEqualTypeOf<unknown[]>()
  })

  test('assert union types', () => {
    const target = [] as string[] | number[] | string
    assertArray(target)
    expectTypeOf(target).toEqualTypeOf<string[] | number[]>()
  })

  test('assert union types 2', () => {
    const target = [] as Array<string | number> | string | number
    assertArray(target)
    expectTypeOf(target).toEqualTypeOf<Array<string | number>>()
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertArray(tuple)
    expectTypeOf(tuple).toEqualTypeOf<[string, number]>()
  })
})

describe('isNotArray type tests', () => {
  test('assert definite types.', () => {
    const target = [] as string[] | string
    assertNotArray(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('assert unknown types', () => {
    const target = 'string' as unknown
    assertNotArray(target)
    expectTypeOf(target).toEqualTypeOf<unknown>()
  })

  test('assert union types', () => {
    const target = [] as string[] | number[] | string
    assertNotArray(target)
    expectTypeOf(target).toEqualTypeOf<string>()
  })

  test('assert union types 2', () => {
    const target = [] as Array<string | number> | string | number
    assertNotArray(target)
    expectTypeOf(target).toEqualTypeOf<string | number>()
  })

  test('assert tuple types', () => {
    const tuple = ['', 0] as [string, number] | string | number
    assertNotArray(tuple)
    expectTypeOf(tuple).toEqualTypeOf<string | number>()
  })
})
