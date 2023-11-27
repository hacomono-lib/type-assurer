import { describe } from 'vitest'
import {
  assertNotJsonParsable,
  assertJson,
  ensureNotJsonParsable,
  ensureJsonParsable,
  fallbackNotJsonParsable,
  fallbackJsonParsable,
  isJson,
  isNotJsonParsable
} from '.'
import { testAssert, testEnsure, testFallback, testGuard } from '../../lib/test'
import { ValueType } from '../../lib/test/type'

const expected = [
  ValueType.NumberParsablePositiveInt,
  ValueType.NumberParsableNegativeInt,
  ValueType.NumberParsablePositiveFloat,
  ValueType.NumberParsableNegativeFloat,
  ValueType.JsonParsableNumber,
  ValueType.JsonParsableTrue,
  ValueType.JsonParsableFalse,
  ValueType.JsonParsableNull,
  ValueType.JsonParsableString,
  ValueType.JsonParsableObject,
  ValueType.JsonParsableComplexObject,
  ValueType.JsonParsableEmptyObject,
  ValueType.JsonParsableArray,
  ValueType.JsonParsableEmptyArray
]

describe('isJsonParsable', () => {
  testGuard(isJson, expected, { parsableString: true })
})

describe('assertJsonParsable', () => {
  testAssert(assertJson, expected, { parsableString: true })
})

describe('ensureJsonParsable', () => {
  testEnsure(ensureJsonParsable, expected, { parsableString: true })
})

describe('fallbackJsonParsable', () => {
  testFallback(fallbackJsonParsable, expected, {
    parsableString: true,
    fallbackValue: [{ foo: 'bar' }]
  })
})

describe('isNotJsonParsable', () => {
  testGuard(isNotJsonParsable, expected, { parsableString: true, negative: true })
})

describe('assertNotJsonParsable', () => {
  testAssert(assertNotJsonParsable, expected, { parsableString: true, negative: true })
})

describe('ensureNotJsonParsable', () => {
  testEnsure(ensureNotJsonParsable, expected, { parsableString: true, negative: true })
})

describe('fallbackNotJsonParsable', () => {
  testFallback(fallbackNotJsonParsable, expected, {
    parsableString: true,
    negative: true,
    fallbackValue: 'fallback'
  })
})
