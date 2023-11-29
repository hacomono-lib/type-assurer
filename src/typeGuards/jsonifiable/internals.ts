import { isObject } from '../object'
import { isArray } from '../array'
import { isString } from '../string'
import { isNumber } from '../number'
import { isBoolean } from '../boolean'

export function hasToJSON(value: unknown): value is { toJSON: (key: string | number) => unknown } {
  return isObject(value) && typeof (value as { toJSON: unknown }).toJSON === 'function'
}

function getValueByObject(key: string | number, target: unknown): unknown {
  if (isJsonPrimitive(target) || target === undefined) {
    return target
  }

  if (hasToJSON(target)) {
    return target.toJSON(key)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ('valueof' in (target as any)) {
    return target
  }

  const value = (target as object).valueOf()
  if (target !== value) {
    return value
  }

  return target
}

// eslint-disable-next-line max-statements
export function deepJsonEqual(a: unknown, b: unknown): boolean {
  console.dir({ a: a, b: b }, { depth: null })
  if (a === b) {
    return true
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (isObject(a) && isObject(b)) {
    return objectEquals(a, b)
  }

  if (isArray(a) && isArray(b)) {
    return arrayEquals(a, b)
  }

  return false
}

function getKeys<T extends Record<string, unknown>>(a: T): Array<keyof T> {
  if (a.constructor && Object !== a.constructor) {
    return Object.getOwnPropertyNames(a.constructor.prototype)
  }

  return Object.keys(a)
}

function objectEquals(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  const aKeys = getKeys(a)
  const bKeys = getKeys(b)
  const keys = Array.from(new Set([...aKeys, ...bKeys]))

  if (keys.length !== aKeys.length || keys.length !== bKeys.length) {
    return false
  }

  let result = true
  for (const key of keys) {
    result &&= deepJsonEqual(getValueByObject(key, a[key]), getValueByObject(key, b[key]))
  }
  return result
}

function arrayEquals(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = true
  for (let index = 0; index < a.length; index++) {
    result &&= deepJsonEqual(getValueByObject(index, a[index]), getValueByObject(index, b[index]))
  }
  return result
}

export function isJsonPrimitive(target: unknown): target is number | string | boolean | null {
  return isNumber(target) || isString(target) || isBoolean(target) || target === null
}
