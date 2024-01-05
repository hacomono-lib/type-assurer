import { describe, expectTypeOf, test } from 'vitest'
import type { EmptyArray, EmptyObject, EmptyString } from './type'

describe('type satisfied: EmptyString', () => {
  test('should satisfies some empty string as EmptyString', () => {
    const _satisfied = '' satisfies EmptyString

    // @ts-expect-error
    const _notSatisfied = 'string' satisfies EmptyString
  })

  test('should excludes EmptyString from string as string', () => {
    function isEmptyString(target: string): target is EmptyString {
      return target === ''
    }

    const target = 'string' as string
    if (isEmptyString(target)) {
      expectTypeOf(target).toEqualTypeOf<EmptyString>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })
})

describe('type satisfied: EmptyArray', () => {
  test('should satisfies some empty array as EmptyArray', () => {
    const _satisfied = [] satisfies EmptyArray

    // @ts-expect-error
    const _notSatisfied = [1] satisfies EmptyArray
  })

  test('should excludes EmptyArray from array as array', () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    function isEmptyArray(target: any[]): target is EmptyArray {
      return target.length === 0
    }

    const target = [1] as unknown[]
    if (isEmptyArray(target)) {
      expectTypeOf(target).toEqualTypeOf<[]>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown[]>()
    }
  })
})

describe('type satisfied: EmptyObject', () => {
  test('should satisfies some empty object as EmptyObject', () => {
    const _satisfied = {} satisfies EmptyObject

    // @ts-expect-error
    const _notSatisfied = { a: 1 } satisfies EmptyObject

    // @ts-expect-error
    const _notSatisfied2 = { [Symbol()]: 1 } satisfies EmptyObject

    // @ts-expect-error
    const _notSatisfied3 = { 1: 1 } satisfies EmptyObject
  })

  test('should excludes EmptyObject from object as object', () => {
    function isEmptyObject(target: object): target is EmptyObject {
      return Object.keys(target).length === 0
    }

    const target = { a: 1 } as object
    if (isEmptyObject(target)) {
      expectTypeOf(target).toEqualTypeOf<EmptyObject>()
    } else {
      expectTypeOf(target).toEqualTypeOf<object>()
    }
  })
})
