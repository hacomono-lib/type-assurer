/* eslint-disable max-lines-per-function */
import { test, describe, assertType } from 'vitest'
import type { Jsonifiable, JsonifiableObject, JsonifiableArray } from './type'
import { isJsonifiable, isNotJsonifiable } from '.'
import { Equals } from '../../lib/test'

describe('isJsonifiable type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isJsonifiable(targetObject)) {
      assertType<Equals<JsonifiableObject | JsonifiableArray | null | string, typeof targetObject>>(
        true
      )
    } else {
      assertType<Equals<object, typeof targetObject>>(true)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isJsonifiable(targetConstObject)) {
      assertType<Equals<{ foo?: string } | '1', typeof targetConstObject>>(true)
    } else {
      assertType<Equals<never, typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | (() => void)
      | undefined
    if (isJsonifiable(targetConstObject)) {
      assertType<
        Equals<{ foo?: string } | Date | JsonifiableArray | null, typeof targetConstObject>
      >(true)
    } else {
      assertType<Equals<undefined | (() => void) | unknown[], typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 4', () => {
    class Foo {
      bar: string = 'bar'
      baz(): string {
        return 'baz'
      }
    }
    const target = new Foo()
    if (isJsonifiable(target)) {
      assertType<Equals<never, typeof target>>(true)
    } else {
      assertType<Equals<Foo, typeof target>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isJsonifiable(targetUnknown)) {
      assertType<Equals<Jsonifiable, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    }
  })
})

describe('isNotJsonifiable type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isNotJsonifiable(targetObject)) {
      assertType<Equals<object, typeof targetObject>>(true)
    } else {
      assertType<Equals<JsonifiableArray | JsonifiableObject | string | null, typeof targetObject>>(
        true
      )
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isNotJsonifiable(targetConstObject)) {
      assertType<Equals<never, typeof targetConstObject>>(true)
    } else {
      assertType<Equals<{ foo?: string } | '1', typeof targetConstObject>>(true)
    }
  })

  test('guard definite types 3', () => {
    const targetConstObject = {} as
      | { foo?: string }
      | Date
      | unknown[]
      | null
      | (() => void)
      | undefined
    if (isNotJsonifiable(targetConstObject)) {
      assertType<Equals<undefined | (() => void) | unknown[], typeof targetConstObject>>(true)
    } else {
      assertType<
        Equals<{ foo?: string } | Date | JsonifiableArray | null, typeof targetConstObject>
      >(true)
    }
  })

  test('guard definite types 4', () => {
    class Foo {
      bar: string = 'bar'
      baz(): string {
        return 'baz'
      }
    }
    const target = new Foo()
    if (isNotJsonifiable(target)) {
      assertType<Equals<Foo, typeof target>>(true)
    } else {
      assertType<Equals<never, typeof target>>(true)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotJsonifiable(targetUnknown)) {
      assertType<Equals<unknown, typeof targetUnknown>>(true)
    } else {
      assertType<Equals<Jsonifiable, typeof targetUnknown>>(true)
    }
  })
})
