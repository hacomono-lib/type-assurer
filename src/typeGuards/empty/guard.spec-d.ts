import { describe, expectTypeOf, test } from 'vitest'
import { isEmpty } from '.'

// eslint-disable-next-line max-lines-per-function
describe('isEmpty type tests', () => {
  test('guard definite types', () => {
    const target = '' as string
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<''>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard definite types 2', () => {
    const target = [] as string[]
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<[]>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string[]>()
    }
  })

  test('guard definite types 3', () => {
    const target = {} as Record<string, string>
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<{}>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Record<string, string>>()
    }
  })

  test('guard definite types 4', () => {
    const target = null as null | undefined | string
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<null | undefined | ''>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('guard unknown types', () => {
    const target = 'string' as unknown
    if (isEmpty(target)) {
      expectTypeOf(target).toEqualTypeOf<'' | [] | {} | null | undefined>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})
