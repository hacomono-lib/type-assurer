import { describe, expectTypeOf, test } from 'vitest'
import { type NumberParsable, isNumberParsable } from './guards'

describe('guard definite types', () => {
  test('should guard as NumberParsable type for NumberParsable type values.', () => {
    const target = '1' as string | number
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<NumberParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<string>()
    }
  })

  test('should strictly guard as NumberParsable type for string literal types.', () => {
    type Four = true
    const target = '1' as '1' | 2 | 'three' | Four
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<'1' | 2>()
    } else {
      expectTypeOf(target).toEqualTypeOf<'three' | Four>()
    }
  })

  test('should strictly guard as NumberParsable type for Branded type.', () => {
    type Branded<T> = T & { __brand: 'branded' }
    const target = '1' as Branded<'1'> | Branded<1> | Branded<'one'> | Branded<true>
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<Branded<1> | Branded<'1'>>()
    } else {
      expectTypeOf(target).toEqualTypeOf<Branded<'one'> | Branded<true>>()
    }
  })
})

describe('guard unknown types', () => {
  test('should guard as NumberParsable type for unknown type value.', () => {
    const target = 'string' as unknown
    if (isNumberParsable(target)) {
      expectTypeOf(target).toEqualTypeOf<NumberParsable>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })

  test('should strictly guard as NumberParsable type when type argument is set.', () => {
    const target = '1' as unknown
    if (isNumberParsable<1>(target)) {
      expectTypeOf(target).toEqualTypeOf<1>()
    } else {
      expectTypeOf(target).toEqualTypeOf<unknown>()
    }
  })
})

describe('type error', () => {
  test('should result in a TypeScript type error when the type argument is "string"', () => {
    isNumberParsable<// @ts-expect-error
    string>(
      //
      123,
    )
  })

  test('should result in a TypeScript type error when the type argument is not a NumberParsable', () => {
    isNumberParsable<// @ts-expect-error
    boolean>(
      //
      '123',
    )
  })
})
