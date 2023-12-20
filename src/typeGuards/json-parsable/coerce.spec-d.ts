import { describe, expectTypeOf, test } from 'vitest'
import { coerceJSON } from '.'
import type { JSONValue } from '../../lib'

// eslint-disable-next-line max-lines-per-function
describe('coerceJSON type tests', () => {
  // eslint-disable-next-line max-lines-per-function
  describe('coerce json-parsable to json', () => {
    test('coerce definite types', () => {
      const target = `{ "foo": "bar" }` as object | string
      const result = coerceJSON(target)
      expectTypeOf(result).toEqualTypeOf<JSONValue>()
    })

    test('coerce definite types 2', () => {
      const target = `{ "foo": "bar" }` as `{ "foo": "bar" }` | { foo: string }
      const result = coerceJSON(target)
      expectTypeOf(result).toEqualTypeOf<JSONValue>()
    })

    test('coerce definite types 3', () => {
      const target = 'null' as const
      const result = coerceJSON(target)
      expectTypeOf(result).toEqualTypeOf<null>()
    })

    describe('coerce json-like to json', () => {
      test('coerce definite types', () => {
        const target = { foo: 'bar' } as object | string
        const result = coerceJSON(target)
        expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
      })

      test('coerce definite types 2', () => {
        const target = { foo: 'bar' } as { foo: string } | '1'
        const result = coerceJSON(target)
        expectTypeOf(result).toEqualTypeOf<{ foo: string }>()
      })

      test('guard definite types 3', () => {
        const target = { foo: 'bar' } as { foo: string } | Date | unknown[] | null | (() => void) | undefined
        const result = coerceJSON(target)
        expectTypeOf(result).toEqualTypeOf<{ foo: string } | Date | Json[] | null>()
      })
    })

    describe('coerce mixed style', () => {
      test('coerce uncategorized types', () => {
        const target = { foo: 'bar' } as { foo: string } | `{ "baz": "qux" }`
        const result = coerceJSON(target)
        expectTypeOf(result).toEqualTypeOf<JSONValue>()
      })

      test('coerce unknown types', () => {
        const target = '{ "foo": "bar" }' as unknown
        const result = coerceJSON(target)
        expectTypeOf(result).toEqualTypeOf<JSONValue>()
      })
    })
  })
})
