import { describe, expect, test } from 'vitest'
import { deepJSONEqual, hasToJSON } from './internals'

describe('hasToJSON', () => {
  test('should returns true if the value has a toJSON method', () => {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    expect(hasToJSON({ toJSON: () => 'foo' })).toBe(true)
  })

  test('should returns false if the value does not have a toJSON method', () => {
    expect(hasToJSON({})).toBe(false)
  })

  test('should returns false if the value is null', () => {
    expect(hasToJSON(null)).toBe(false)
  })
})

describe('deepJSONEqual', () => {
  test('should returns true if the values are equal', () => {
    expect(deepJSONEqual('foo', 'foo')).toBe(true)
  })

  test('should returns false if the values are not equal', () => {
    expect(deepJSONEqual('foo', 'bar')).toBe(false)
  })

  test('should returns true if the values are equal objects', () => {
    expect(deepJSONEqual({ foo: 'bar' }, { foo: 'bar' })).toBe(true)
  })

  test('should returns false if the values are not equal objects', () => {
    expect(deepJSONEqual({ foo: 'bar' }, { foo: 'baz' })).toBe(false)
  })

  test('should returns true if the values are equal arrays', () => {
    expect(deepJSONEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  test('should returns false if the values are not equal arrays', () => {
    expect(deepJSONEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  test('should returns true if the values are equal objects with toJSON methods', () => {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    expect(deepJSONEqual({ foo: { toJSON: (k: string) => `${k} ${k}` } }, { foo: 'foo foo' })).toBe(true)

    // biome-ignore lint/style/useNamingConvention: <explanation>
    expect(deepJSONEqual({ foo: 'foo foo' }, { foo: { toJSON: (k: string) => `${k} ${k}` } })).toBe(true)
  })

  test('should returns true if the values are equal arrays with toJSON methods', () => {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    expect(deepJSONEqual([{ toJSON: (k: string) => `${k} ${k}` }], ['0 0'])).toBe(true)

    // biome-ignore lint/style/useNamingConvention: <explanation>
    expect(deepJSONEqual(['0 0'], [{ toJSON: (k: string) => `${k} ${k}` }])).toBe(true)
  })

  describe('edge case', () => {
    test('should verify that array audits are performed correctly when an empty array is passed.', () => {
      expect(deepJSONEqual(Array(3), JSON.parse(JSON.stringify(Array(3))))).toBe(false)
    })
  })
})
