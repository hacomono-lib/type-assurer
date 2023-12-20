/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest'
import { hasToJSON, deepJSONEqual } from './internals'

describe('hasToJSON', () => {
  it('returns true if the value has a toJSON method', () => {
    expect(hasToJSON({ toJSON: () => 'foo' })).toBe(true)
  })

  it('returns false if the value does not have a toJSON method', () => {
    expect(hasToJSON({})).toBe(false)
  })

  it('returns false if the value is null', () => {
    expect(hasToJSON(null)).toBe(false)
  })
})

describe('deepJSONEqual', () => {
  it('returns true if the values are equal', () => {
    expect(deepJSONEqual('foo', 'foo')).toBe(true)
  })

  it('returns false if the values are not equal', () => {
    expect(deepJSONEqual('foo', 'bar')).toBe(false)
  })

  it('returns true if the values are equal objects', () => {
    expect(deepJSONEqual({ foo: 'bar' }, { foo: 'bar' })).toBe(true)
  })

  it('returns false if the values are not equal objects', () => {
    expect(deepJSONEqual({ foo: 'bar' }, { foo: 'baz' })).toBe(false)
  })

  it('returns true if the values are equal arrays', () => {
    expect(deepJSONEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('returns false if the values are not equal arrays', () => {
    expect(deepJSONEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  it('returns true if the values are equal objects with toJSON methods', () => {
    expect(deepJSONEqual({ foo: { toJSON: (k: string) => `${k} ${k}` } }, { foo: 'foo foo' })).toBe(true)

    expect(deepJSONEqual({ foo: 'foo foo' }, { foo: { toJSON: (k: string) => `${k} ${k}` } })).toBe(true)
  })

  it('returns true if the values are equal arrays with toJSON methods', () => {
    expect(deepJSONEqual([{ toJSON: (k: string) => `${k} ${k}` }], ['0 0'])).toBe(true)

    expect(deepJSONEqual(['0 0'], [{ toJSON: (k: string) => `${k} ${k}` }])).toBe(true)
  })

  describe('edge case', () => {
    it('Verify that array audits are performed correctly when an empty array is passed.', () => {
      expect(deepJSONEqual(Array(3), JSON.parse(JSON.stringify(Array(3))))).toBe(false)
    })
  })
})
