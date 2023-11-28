/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest'
import { hasToJSON, deepJsonEqual } from './internals'

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

describe('deepJsonEqual', () => {
  it('returns true if the values are equal', () => {
    expect(deepJsonEqual('foo', 'foo')).toBe(true)
  })

  it('returns false if the values are not equal', () => {
    expect(deepJsonEqual('foo', 'bar')).toBe(false)
  })

  it('returns true if the values are equal objects', () => {
    expect(deepJsonEqual({ foo: 'bar' }, { foo: 'bar' })).toBe(true)
  })

  it('returns false if the values are not equal objects', () => {
    expect(deepJsonEqual({ foo: 'bar' }, { foo: 'baz' })).toBe(false)
  })

  it('returns true if the values are equal arrays', () => {
    expect(deepJsonEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('returns false if the values are not equal arrays', () => {
    expect(deepJsonEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  it('returns true if the values are equal objects with toJSON methods', () => {
    expect(deepJsonEqual({ foo: { toJSON: (k: string) => `${k} ${k}` } }, { foo: 'foo foo' })).toBe(
      true
    )

    expect(deepJsonEqual({ foo: 'foo foo' }, { foo: { toJSON: (k: string) => `${k} ${k}` } })).toBe(
      true
    )
  })

  it('returns true if the values are equal arrays with toJSON methods', () => {
    expect(deepJsonEqual([{ toJSON: (k: string) => `${k} ${k}` }], ['0 0'])).toBe(true)

    expect(deepJsonEqual(['0 0'], [{ toJSON: (k: string) => `${k} ${k}` }])).toBe(true)
  })
})
