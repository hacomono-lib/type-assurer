/* eslint-disable max-lines-per-function */
import { test, describe, assertType } from 'vitest'
import type { Jsonifiable, JsonifiableObject, JsonifiableArray } from './type'
import { isJsonifiable, isNotJsonifiable } from '.'

describe('isJsonifiable type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isJsonifiable(targetObject)) {
      assertType<JsonifiableObject | JsonifiableArray | null | string>(targetObject)
    } else {
      assertType<object>(targetObject)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isJsonifiable(targetConstObject)) {
      assertType<{ foo?: string } | '1'>(targetConstObject)
    } else {
      assertType<never>(targetConstObject)
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
      assertType<{ foo?: string } | Date | JsonifiableArray | null>(targetConstObject)
    } else {
      assertType<undefined | (() => void) | unknown[]>(targetConstObject)
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
      assertType<never>(target)
    } else {
      assertType<Foo>(target)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isJsonifiable(targetUnknown)) {
      assertType<Jsonifiable>(targetUnknown)
    } else {
      assertType<unknown>(targetUnknown)
    }
  })
})

describe('isNotJsonifiable type tests', () => {
  test('guard definite types', () => {
    const targetObject = {} as object | string
    if (isNotJsonifiable(targetObject)) {
      assertType<object>(targetObject)
    } else {
      assertType<JsonifiableArray | JsonifiableObject | string | null>(targetObject)
    }
  })

  test('guard definite types 2', () => {
    const targetConstObject = {} as { foo?: string } | '1'
    if (isNotJsonifiable(targetConstObject)) {
      assertType<never>(targetConstObject)
    } else {
      assertType<{ foo?: string } | '1'>(targetConstObject)
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
      assertType<undefined | (() => void) | unknown[]>(targetConstObject)
    } else {
      assertType<{ foo?: string } | Date | JsonifiableArray | null>(targetConstObject)
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
      assertType<Foo>(target)
    } else {
      assertType<never>(target)
    }
  })

  test('guard unknown types', () => {
    const targetUnknown = 'string' as unknown
    if (isNotJsonifiable(targetUnknown)) {
      assertType<unknown>(targetUnknown)
    } else {
      assertType<Jsonifiable>(targetUnknown)
    }
  })
})
